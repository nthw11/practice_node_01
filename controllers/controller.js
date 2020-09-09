const Blog = require('../models/blog');


exports.getBlogs = (req, res, next) => {
  Blog.fetchAll((blogs) => {
    res.render('blogs-list'), {
      blogs: blogs,
      pageTitle: 'all blogs',
      path: '/all-blogs'
    }
  });
};



