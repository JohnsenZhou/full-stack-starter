const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');

// 环境变量
const env = process.env.NODE.ENV || 'development';
const isProd = env === 'production' ? true : false;

// APP 配置
const config = isProd ? require('../config.prod')
                      : require('../config');
const { port, db } = config;

// 连接数据库
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${db.name}:${db.port}/test`)
    .then(() => { console.log('🌈 successfully connect to database'); })
    .catch((err) => { console.log(err); })

const routes = require('./routes');
const app = express();

// 设置 HTTP 头
app.use(helmet());

// 开启 Gzip 压缩
app.use(compression());

// 静态资源
app.use(express.static(path.join(__dirname, '../client', 'dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/api', routes)

app.listen(8000, () => {
    console.log(`Server is running on port 3000`);
})
