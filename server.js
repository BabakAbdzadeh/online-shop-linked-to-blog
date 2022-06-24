const express = require('express');
const server = express();








server
.use('/', require('./service/grocery.js'))
.use('/blog', require('./service/blog.js'))
.listen(3000);
