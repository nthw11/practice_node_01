const Blog = require('../models/blog');

exports.getIndex = (req, res, next) => {
  res.render('index', {
    path: '/',
    pageTitle: 'index',
  });
};

exports.getBlogPost = (req,res, next) => {
  const blogId = req.params.blogId;
  Blog.findByPk(blogId)
    .then((blog) => {
      res.render('blog-page', {
        blog: blog,
        pageTitle: blog.title,
        path: 'blog-entry',
      });
    })
    .catch(err => console.log(err));
};

exports.getBlogs = (req, res, next) => {
  Blog.findAll({
    limit: 10,
    order: [
      ['id', 'DESC']
    ]
  }).then(blogs => {
    res.render('blogs-list', {
      blogEntries: blogs,
      pageTitle: 'recent blogs',
      path: '/recent-blogs'
    });
  }).catch(err => {console.log(err)});
};

exports.getAllBlogs = (req, res, next) => {
  Blog.findAll({
    order: [
      ['id', 'DESC']
    ]
  }).then(blogs => {
    res.render('blogs-list', {
      blogEntries: blogs,
      pageTitle: 'recent blogs',
      path: '/recent-blogs'
    });
  }).catch(err => {console.log(err)});
};

exports.getAddBlog = (req, res, next) => {
  res.render('new-blog', {
    pageTitle: 'new blog entry',
    path: 'new-blog'
  });
};

exports.postAddBlog = (req, res, next) => {
    const id = req.body.id;
    const title = req.body.title;
    const item1 = req.body.item1;
    const item2 = req.body.item2;
    const item3 = req.body.item3;
    const tags = req.body.tags;
    Blog.create({
      id: id,
      title: title,
      item1: item1,
      item2: item2,
      item3: item3,
      tags: tags
    }).then(result => {
      // console.log(result);
    }).catch(err => {
      console.log(err);
    });
  res.redirect('/recent-blogs');
};

exports.getEditBlog = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/recent-blogs');
  }
  const blogId = req.params.blogId;
  Blog.findByPk(blogId)
    .then((blogs) => {

      res.render('edit-blog', {
        pageTitle: 'edit blog',
        path: 'edit-blog',
        editing: editMode,
        blog: blogs,
      });
      
    })
    .catch((err) => {
      console.log(err)
    });
};

exports.postEditBlog = (req, res, next) => {
  const blogId = req.body.blogId;
  const updatedTitle = req.body.title;
  const updatedItem1 = req.body.item1;
  const updatedItem2 = req.body.item2;
  const updatedItem3 = req.body.item3;
  const updatedTags = req.body.tags;
  Blog.findByPk(blogId)
    .then(blog => {
      blog.id = blogId;
      blog.title = updatedTitle;
      blog.item1 = updatedItem1;
      blog.item2 = updatedItem2;
      blog.item3 = updatedItem3;
      blog.tags = updatedTags;
      return blog.save();
    })
    .then(result => {
      res.redirect('/recent-blogs');
    })
    .catch(err => {
      console.log(err);
    });
}

exports.postDeleteBlog = (req, res, next) => {
  const blogId = req.body.blogId;
  Blog.findByPk(blogId)
    .then(blog => {
      return blog.destroy();
    })
    .then(result => {
  
      res.redirect('/recent-blogs');
    })
    .catch(err => console.log(err));
};

exports.searchBlogs = (req, res, next) => {
  const searchTag = req.body.searchTag;
  Blog.findAll({
    where: {
      tags: searchTag 
    },
    order: [
      ['id', 'DESC']
    ]
  }).then(blogs => {
    res.render('blogs-list', {
      blogEntries: blogs,
      pageTitle: 'recent blogs',
      path: '/recent-blogs'
    });
  }).catch(err => {console.log(err)});
};
