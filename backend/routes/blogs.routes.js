const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');

router.get('/', blogController.getBlogs);

router.use(authenticateToken);

router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Blog title is required'),
    body('content').notEmpty().withMessage('Blog content is required'),
    validateRequest
  ],
  blogController.createBlog
);

router.post('/:id/like', blogController.toggleLike);

router.post(
  '/:id/comments',
  [
    body('comment').notEmpty().withMessage('Comment text required'),
    validateRequest
  ],
  blogController.addComment
);

module.exports = router;
