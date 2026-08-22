const { sequelize } = require('../config/database');
const User = require('./User');
const Trip = require('./Trip');
const TripMember = require('./TripMember');
const City = require('./City');
const Stop = require('./Stop');
const Activity = require('./Activity');
const StopActivity = require('./StopActivity');
const Booking = require('./Booking');
const CostBreakdown = require('./CostBreakdown');
const Expense = require('./Expense');
const ExpenseShare = require('./ExpenseShare');
const Blog = require('./Blog');
const BlogComment = require('./BlogComment');
const BlogLike = require('./BlogLike');
const Notification = require('./Notification');
const Festival = require('./Festival');

// Flexible associations compatible with custom or existing MySQL table structures
User.hasMany(Trip, { foreignKey: 'owner_id', as: 'ownedTrips', constraints: false });
Trip.belongsTo(User, { foreignKey: 'owner_id', as: 'owner', constraints: false });

User.belongsToMany(Trip, { through: TripMember, foreignKey: 'user_id', otherKey: 'trip_id', as: 'memberTrips', constraints: false });
Trip.belongsToMany(User, { through: TripMember, foreignKey: 'trip_id', otherKey: 'user_id', as: 'members', constraints: false });

Trip.hasMany(TripMember, { foreignKey: 'trip_id', as: 'tripMembers', constraints: false });
TripMember.belongsTo(Trip, { foreignKey: 'trip_id', constraints: false });
TripMember.belongsTo(User, { foreignKey: 'user_id', as: 'user', constraints: false });

Trip.hasMany(Stop, { foreignKey: 'trip_id', as: 'stops', constraints: false });
Stop.belongsTo(Trip, { foreignKey: 'trip_id', constraints: false });
City.hasMany(Stop, { foreignKey: 'city_id', as: 'stops', constraints: false });
Stop.belongsTo(City, { foreignKey: 'city_id', as: 'city', constraints: false });

City.hasMany(Activity, { foreignKey: 'city_id', as: 'activities', constraints: false });
Activity.belongsTo(City, { foreignKey: 'city_id', as: 'city', constraints: false });

Stop.hasMany(StopActivity, { foreignKey: 'stop_id', as: 'scheduledActivities', constraints: false });
StopActivity.belongsTo(Stop, { foreignKey: 'stop_id', constraints: false });
Activity.hasMany(StopActivity, { foreignKey: 'activity_id', constraints: false });
StopActivity.belongsTo(Activity, { foreignKey: 'activity_id', as: 'activity', constraints: false });

Trip.hasMany(Booking, { foreignKey: 'trip_id', as: 'bookings', constraints: false });
Booking.belongsTo(Trip, { foreignKey: 'trip_id', constraints: false });

Trip.hasMany(CostBreakdown, { foreignKey: 'trip_id', as: 'costBreakdowns', constraints: false });
CostBreakdown.belongsTo(Trip, { foreignKey: 'trip_id', constraints: false });

Trip.hasMany(Expense, { foreignKey: 'trip_id', as: 'expenses', constraints: false });
Expense.belongsTo(Trip, { foreignKey: 'trip_id', constraints: false });
User.hasMany(Expense, { foreignKey: 'paid_by', as: 'paidExpenses', constraints: false });
Expense.belongsTo(User, { foreignKey: 'paid_by', as: 'payer', constraints: false });

Expense.hasMany(ExpenseShare, { foreignKey: 'expense_id', as: 'shares', constraints: false });
ExpenseShare.belongsTo(Expense, { foreignKey: 'expense_id', constraints: false });
User.hasMany(ExpenseShare, { foreignKey: 'user_id', as: 'owedShares', constraints: false });
ExpenseShare.belongsTo(User, { foreignKey: 'user_id', as: 'user', constraints: false });

User.hasMany(Blog, { foreignKey: 'user_id', as: 'blogs', constraints: false });
Blog.belongsTo(User, { foreignKey: 'user_id', as: 'author', constraints: false });
Trip.hasMany(Blog, { foreignKey: 'trip_id', as: 'blogs', constraints: false });
Blog.belongsTo(Trip, { foreignKey: 'trip_id', as: 'trip', constraints: false });

Blog.hasMany(BlogComment, { foreignKey: 'blog_id', as: 'comments', constraints: false });
BlogComment.belongsTo(Blog, { foreignKey: 'blog_id', constraints: false });
User.hasMany(BlogComment, { foreignKey: 'user_id', as: 'comments', constraints: false });
BlogComment.belongsTo(User, { foreignKey: 'user_id', as: 'author', constraints: false });

Blog.hasMany(BlogLike, { foreignKey: 'blog_id', as: 'likes', constraints: false });
User.hasMany(BlogLike, { foreignKey: 'user_id', as: 'blogLikes', constraints: false });

User.hasMany(Notification, { foreignKey: 'user_id', as: 'notifications', constraints: false });
Notification.belongsTo(User, { foreignKey: 'user_id', constraints: false });

module.exports = {
  sequelize,
  User,
  Trip,
  TripMember,
  City,
  Stop,
  Activity,
  StopActivity,
  Booking,
  CostBreakdown,
  Expense,
  ExpenseShare,
  Blog,
  BlogComment,
  BlogLike,
  Notification,
  Festival
};
