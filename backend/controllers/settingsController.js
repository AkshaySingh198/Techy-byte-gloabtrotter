const { User, Trip } = require('../models');

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, phone, city, state, gender, age } = req.body;
    const user = req.user;

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (city !== undefined) user.city = city;
    if (state !== undefined) user.state = state;
    if (gender) user.gender = gender;
    if (age !== undefined) user.age = age;

    await user.save();

    res.json({
      success: true,
      message: 'Profile settings updated successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteAccount = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await User.destroy({ where: { id: userId } });

    res.json({
      success: true,
      message: 'Account and associated data deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};
