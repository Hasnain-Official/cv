require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const {xss} = require('express-xss-sanitizer');
const {rateLimit} = require('express-rate-limit');
const helmet = require('helmet');
const { connect_db } = require("./config/db.config");
const { transform } = require('./src/middlewares/interceptors/request.interceptor');
const router = require('./src/routes/route');

const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    message : 'Too many requests from this IP, please try again later',
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
});

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(xss());
app.use(limiter);
app.use(transform);
app.use(router);

connect_db(app);

app.use("*", (req, res) => {
    return res.status(404).json({
        status : false,
        message : "The page you are looking for does not exists."
    })
});

app.on('ready', () => {
    app.listen(PORT, () => {
        console.log("---------------------------------");
        console.log(`  🚀 App is listening on ${PORT} 🚀`);
        console.log("---------------------------------");
    });
});