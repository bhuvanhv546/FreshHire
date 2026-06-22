const Analytics = require('../models/Analytics.model');

exports.trackEvent = async (metric, value, filters = {}) => {
  const entry = new Analytics({
    date: new Date(),
    metric,
    value,
    filters
  });

  await entry.save();
};
