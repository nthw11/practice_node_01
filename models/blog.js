const fs = require('fs');
const path = require('path');

const p = path.join(module.exports = path.dirname(process.mainModule.filename), 'data', 'blogs.json');

const getBlogsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
}

const blogs = [];

module.exports = class Blog {
  constructor(title, body, tags) {
    this.title = title;
    this.body = body;
    this.tags = tags;
  }

  save() {
    getBlogsFromFile(blogs => {blogs.push(this);
      fs.writeFile(p, JSON.stringify(blogs), (err) => {
        console.log(err);
      });

    });
  }
  static fetchAll(cb) {
    getBlogsFromFile(cb);
  }
}