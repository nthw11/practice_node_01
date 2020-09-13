const path = require('path');
const express = require('express');
const controller = require('../controllers/controller');
const router = express.Router();

router.get('/', controller.getIndex);

router.get('/recent-blogs', controller.getBlogs);

router.get('/all-blogs', controller.getAllBlogs);

router.get('/new-blog', controller.getAddBlog);

router.post('/new-blog', controller.postAddBlog);

router.get('/blogs/:blogId', controller.getBlogPost);

router.get('/edit-blog/:blogId', controller.getEditBlog);

router.post('/edit-blog', controller.postEditBlog);

router.post('/delete-blog', controller.postDeleteBlog);

router.post('/search-tags', controller.searchBlogs);

module.exports = router;