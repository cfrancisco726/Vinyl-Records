var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/recordshop',{ useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB = connection error:'));
app.use(
	session({
		secret: 'mySecretString',
		saveUninitialized: false,
		resave: false,
		cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 },
		store: new MongoStore({ mongooseConnection: db, ttl: 2 * 24 * 60 * 60 })
	})
);
app.post('/cart', function(req, res) {
	var cart = req.body;
	req.session.cart = cart;
	req.session.save(function(err) {
		if (err) {
			throw err;
		}
		res.json(req.session.cart);
	});
	app.get('/cart', function(req, res) {
		if (typeof req.session.cart !== 'undefined') {
			res.json(req.session.cart);
		}
	});
});

var Records = require('./models/records.js');

app.post('/records', function(req, res) {
	var record = req.body;

	Records.create(record, function(err, records) {
		if (err) {
			throw err;
		}
		res.json(records);
	});
});

app.get('/records', function(req, res) {
	Records.find(function(err, records) {
		if (err) {
			throw err;
		}
		res.json(records);
	});
});

app.delete('/records/:_id', function(req, res) {
	var query = { _id: req.params._id };

	Records.remove(query, function(err, records) {
		if (err) {
			console.log('# API DELETE RECORDS: ', err);
		}
		res.json(records);
	});
});

app.put('/records/:_id', function(req, res) {
	var record = req.body;
	var query = { _id: req.params._id };
	var update = {
		$set: {
			title: record.title,
			description: record.description,
			image: record.image,
			price: record.price
		}
	};
	// When true returns the updated document
	var options = { new: true };

	Records.findOneAndUpdate(query, update, options, function(err, records) {
		if (err) {
			throw err;
		}
		res.json(records);
	});
});

app.get('/images', function(req, res) {
	const imgFolder = __dirname + '/public/images/';
	// require file system
	const fs = require('fs');
	// read all files in the directory
	fs.readdir(imgFolder, function(err, files) {
		if (err) {
			return console.error(err);
		}
		const filesArr = [];

		files.forEach(function(file) {
			filesArr.push({ name: file });
		});
		res.json(filesArr);
	});
});

app.listen(3001, function(err) {
	if (err) {
		return console.log(err);
	}
	console.log('API Server is listening on HTTP://localhost:3001');
});
