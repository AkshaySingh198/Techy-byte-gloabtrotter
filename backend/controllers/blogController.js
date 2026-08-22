const { Blog, BlogComment, BlogLike, User } = require('../models');

exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      include: [
        { model: User, as: 'author', attributes: ['id', 'name', 'city'] },
        { model: BlogComment, as: 'comments', include: [{ model: User, as: 'author', attributes: ['id', 'name'] }] }
      ],
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      data: blogs
    });
  } catch (error) {
    next(error);
  }
};

exports.createBlog = async (req, res, next) => {
  try {
    const { title, content, images, trip_id } = req.body;

    const blog = await Blog.create({
      user_id: req.user.id,
      trip_id: trip_id || null,
      title,
      content,
      images: images || []
    });

    const blogWithAuthor = await Blog.findByPk(blog.id, {
      include: [{ model: User, as: 'author', attributes: ['id', 'name', 'city'] }]
    });

    // Emit Socket.io notification if socket server is attached
    if (req.app.get('io')) {
      req.app.get('io').emit('new_blog_post', {
        message: `${req.user.name} just posted a new travel blog: "${title}"`,
        blog: blogWithAuthor
      });
    }

    res.status(201).json({
      success: true,
      message: 'Blog published successfully',
      data: blogWithAuthor
    });
  } catch (error) {
    next(error);
  }
};

exports.toggleLike = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const blog = await Blog.findByPk(id);
    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found.' });
    }

    const existingLike = await BlogLike.findOne({
      where: { blog_id: id, user_id: userId }
    });

    if (existingLike) {
      await existingLike.destroy();
      blog.likes_count = Math.max(0, blog.likes_count - 1);
      await blog.save();
      return res.json({ success: true, liked: false, likes_count: blog.likes_count });
    } else {
      await BlogLike.create({ blog_id: id, user_id: userId });
      blog.likes_count += 1;
      await blog.save();
      return res.json({ success: true, liked: true, likes_count: blog.likes_count });
    }
  } catch (error) {
    next(error);
  }
};

exports.addComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    const newComment = await BlogComment.create({
      blog_id: id,
      user_id: req.user.id,
      comment
    });

    const commentWithAuthor = await BlogComment.findByPk(newComment.id, {
      include: [{ model: User, as: 'author', attributes: ['id', 'name'] }]
    });

    res.status(201).json({
      success: true,
      data: commentWithAuthor
    });
  } catch (error) {
    next(error);
  }
};
