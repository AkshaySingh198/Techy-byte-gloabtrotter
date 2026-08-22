const { Expense, ExpenseShare, User, TripMember, Trip } = require('../models');

exports.addExpense = async (req, res, next) => {
  try {
    const { trip_id, amount, description, split_type, member_shares } = req.body;
    // member_shares: [{ user_id: 1, amount_owed: 500 }, { user_id: 2, amount_owed: 500 }]

    const trip = await Trip.findByPk(trip_id);
    if (!trip) {
      return res.status(404).json({ success: false, error: 'Trip not found.' });
    }

    const expense = await Expense.create({
      trip_id,
      paid_by: req.user.id,
      amount,
      description,
      split_type: split_type || 'equal'
    });

    // If specific shares not passed, split equally among active trip members
    let sharesToCreate = member_shares;
    if (!sharesToCreate || sharesToCreate.length === 0) {
      const members = await TripMember.findAll({ where: { trip_id, status: 'accepted' } });
      const splitAmount = (parseFloat(amount) / members.length).toFixed(2);

      sharesToCreate = members.map(m => ({
        user_id: m.user_id,
        amount_owed: splitAmount
      }));
    }

    for (const share of sharesToCreate) {
      await ExpenseShare.create({
        expense_id: expense.id,
        user_id: share.user_id,
        amount_owed: share.amount_owed,
        settled: share.user_id === req.user.id // Paid by user is settled for themselves
      });
    }

    const createdExpense = await Expense.findByPk(expense.id, {
      include: [
        { model: User, as: 'payer', attributes: ['id', 'name', 'email'] },
        { model: ExpenseShare, as: 'shares', include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }] }
      ]
    });

    res.status(201).json({
      success: true,
      message: 'Expense recorded successfully',
      data: createdExpense
    });
  } catch (error) {
    next(error);
  }
};

exports.getTripBalances = async (req, res, next) => {
  try {
    const { tripId } = req.params;

    const expenses = await Expense.findAll({
      where: { trip_id: tripId },
      include: [
        { model: User, as: 'payer', attributes: ['id', 'name'] },
        { model: ExpenseShare, as: 'shares', include: [{ model: User, as: 'user', attributes: ['id', 'name'] }] }
      ]
    });

    const balances = {}; // { userId: { name, netBalance } }

    expenses.forEach(exp => {
      const payerId = exp.paid_by;
      const payerName = exp.payer ? exp.payer.name : `User ${payerId}`;

      if (!balances[payerId]) balances[payerId] = { user_id: payerId, name: payerName, net_balance: 0 };

      exp.shares.forEach(share => {
        const debtorId = share.user_id;
        const debtorName = share.user ? share.user.name : `User ${debtorId}`;

        if (!balances[debtorId]) balances[debtorId] = { user_id: debtorId, name: debtorName, net_balance: 0 };

        if (!share.settled && debtorId !== payerId) {
          const owed = parseFloat(share.amount_owed);
          balances[payerId].net_balance += owed;
          balances[debtorId].net_balance -= owed;
        }
      });
    });

    res.json({
      success: true,
      data: {
        trip_id: tripId,
        currency: '₹',
        balances: Object.values(balances)
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.settleShare = async (req, res, next) => {
  try {
    const { shareId } = req.params;
    const share = await ExpenseShare.findByPk(shareId);

    if (!share) {
      return res.status(404).json({ success: false, error: 'Expense share record not found.' });
    }

    share.settled = true;
    await share.save();

    res.json({
      success: true,
      message: 'Share marked as settled via UPI',
      data: share
    });
  } catch (error) {
    next(error);
  }
};
