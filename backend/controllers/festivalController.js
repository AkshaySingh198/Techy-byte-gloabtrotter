const { Festival, City } = require('../models');
const { Op } = require('sequelize');

exports.checkFestivalAndSeasonOverlap = async (req, res, next) => {
  try {
    const { start_date, end_date, city_id } = req.query;

    if (!start_date || !end_date) {
      return res.status(400).json({ success: false, error: 'start_date and end_date query parameters are required.' });
    }

    // Check festival overlaps
    const overlappingFestivals = await Festival.findAll({
      where: {
        [Op.or]: [
          { start_date: { [Op.between]: [start_date, end_date] } },
          { end_date: { [Op.between]: [start_date, end_date] } },
          {
            start_date: { [Op.lte]: start_date },
            end_date: { [Op.gte]: end_date }
          }
        ]
      }
    });

    let seasonWarnings = [];
    if (city_id) {
      const city = await City.findByPk(city_id);
      if (city && city.best_season) {
        seasonWarnings.push({
          city: city.name,
          best_season: city.best_season
        });
      }
    }

    res.json({
      success: true,
      data: {
        overlapping_festivals: overlappingFestivals,
        seasonal_guidelines: seasonWarnings
      }
    });
  } catch (error) {
    next(error);
  }
};
