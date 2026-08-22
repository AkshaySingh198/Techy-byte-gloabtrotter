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

// User <-> Trip Ownership
User.hasMany(Trip, { foreignKey: 'owner_id', as: 'ownedTrips' });
Trip.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });

// User <-> Trip Members (Group collaboration)
User.belongsToMany(Trip, { through: TripMember, foreignKey: 'user_id', otherKey: 'trip_id', as: 'memberTrips' });
Trip.belongsToMany(User, { through: TripMember, foreignKey: 'trip_id', otherKey: 'user_id', as: 'members' });

Trip.hasMany(TripMember, { foreignKey: 'trip_id', as: 'tripMembers', onDelete: 'CASCADE' });
TripMember.belongsTo(Trip, { foreignKey: 'trip_id' });
TripMember.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Trip <-> Stop <-> City
Trip.hasMany(Stop, { foreignKey: 'trip_id', as: 'stops', onDelete: 'CASCADE' });
Stop.belongsTo(Trip, { foreignKey: 'trip_id' });
City.hasMany(Stop, { foreignKey: 'city_id', as: 'stops' });
Stop.belongsTo(City, { foreignKey: 'city_id', as: 'city' });

// City <-> Activity
City.hasMany(Activity, { foreignKey: 'city_id', as: 'activities' });
Activity.belongsTo(City, { foreignKey: 'city_id', as: 'city' });

// Stop <-> Activity (StopActivity join)
Stop.hasMany(StopActivity, { foreignKey: 'stop_id', as: 'scheduledActivities', onDelete: 'CASCADE' });
StopActivity.belongsTo(Stop, { foreignKey: 'stop_id' });
Activity.hasMany(StopActivity, { foreignKey: 'activity_id' });
StopActivity.belongsTo(Activity, { foreignKey: 'activity_id', as: 'activity' });

// Trip <-> Booking
Trip.hasMany(Booking, { foreignKey: 'trip_id', as: 'bookings', onDelete: 'CASCADE' });
Booking.belongsTo(Trip, { foreignKey: 'trip_id' });

// Trip <-> CostBreakdown
Trip.hasMany(CostBreakdown, { foreignKey: 'trip_id', as: 'costBreakdowns', onDelete: 'CASCADE' });
CostBreakdown.belongsTo(Trip, { foreignKey: 'trip_id' });

// Trip & User <-> Expense & ExpenseShare
Trip.hasMany(Expense, { foreignKey: 'trip_id', as: 'expenses', onDelete: 'CASCADE' });
Expense.belongsTo(Trip, { foreignKey: 'trip_id' });
User.hasMany(Expense, { foreignKey: 'paid_by', as: 'paidExpenses' });
Expense.belongsTo(User, { foreignKey: 'paid_by', as: 'payer' });

Expense.hasMany(ExpenseShare, { foreignKey: 'expense_id', as: 'shares', onDelete: 'CASCADE' });
ExpenseShare.belongsTo(Expense, { foreignKey: 'expense_id' });
User.hasMany(ExpenseShare, { foreignKey: 'user_id', as: 'owedShares' });
ExpenseShare.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Blog system
User.hasMany(Blog, { foreignKey: 'user_id', as: 'blogs' });
Blog.belongsTo(User, { foreignKey: 'user_id', as: 'author' });
Trip.hasMany(Blog, { foreignKey: 'trip_id', as: 'blogs' });
Blog.belongsTo(Trip, { foreignKey: 'trip_id', as: 'trip' });

Blog.hasMany(BlogComment, { foreignKey: 'blog_id', as: 'comments', onDelete: 'CASCADE' });
BlogComment.belongsTo(Blog, { foreignKey: 'blog_id' });
User.hasMany(BlogComment, { foreignKey: 'user_id', as: 'comments' });
BlogComment.belongsTo(User, { foreignKey: 'user_id', as: 'author' });

Blog.hasMany(BlogLike, { foreignKey: 'blog_id', as: 'likes', onDelete: 'CASCADE' });
User.hasMany(BlogLike, { foreignKey: 'user_id', as: 'blogLikes' });

// Notifications
User.hasMany(Notification, { foreignKey: 'user_id', as: 'notifications', onDelete: 'CASCADE' });
Notification.belongsTo(User, { foreignKey: 'user_id' });

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
