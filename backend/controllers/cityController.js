const { City, Activity } = require('../models');

exports.getCities = async (req, res, next) => {
  try {
    const cities = await City.findAll({
      order: [['popularity_score', 'DESC']]
    });

    res.json({
      success: true,
      data: cities
    });
  } catch (error) {
    next(error);
  }
};

exports.getCityActivities = async (req, res, next) => {
  try {
    const { id } = req.params;
    const activities = await Activity.findAll({
      where: { city_id: id }
    });

    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    next(error);
  }
};
