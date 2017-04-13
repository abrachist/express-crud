var express = require('express');
var bodyParser = require('body-parser');
var Sequelize = require('sequelize');

var app = express();
var PORT = process.env.PORT || 3000;

// INIT CONNECTION TO MYSQL DB
var sequelize = new Sequelize('mysql://root:root@localhost:3306/express');

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });


// DEFINE A MODEL OF A TABLE ON DATABASE
var Products = sequelize.define('products', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
    	notEmpty: true,
    }  
  }
});

// force drop if exist and then create table
Products.sync({force: true}).then(function () {
  return Products.create({
    name: 'motorcycle'
  });
});


// MIDDLEWARE : SET STATIC DIRECTORY ON SERVER AND BODY PARSER FOR REQUEST
app.use(express.static(__dirname));
app.use(bodyParser.json());


// ROUTES FOR API
app.get('/products', function(req, res) {
	Products.findAll().then(function(products) {
	  res.send({status: "OK", message: "Gets data success", data: products });
	}).catch(function(err) {
	       res.send({status: err.message, message: err.name });
	});
});

app.post('/products', function(req, res) {
	var productName = req.body.name;

	Products.create({ name: productName })
	  .then(function() {
	  	   res.send({status: "OK", message: "Create data success" });
	  }).catch(function(err) {
	       res.send({status: err.message, message: err.name });
	  });
});

app.put('/products/:id', function(req, res) {
	var id = req.params.id;
	var newName = req.body.newName;

	Products.update({
      name: newName,
    }, {
      where: {
        id: Number(id)
      }
    }).then(function() {
	  		res.send({status: "OK", message: "Update data success" });
	}).catch(function(err) {
	       res.send({status: err.message, message: err.name });
	});
});

app.delete('/products/:id', function(req, res) {
	var id = req.params.id;
	var found = false;
 	
 	Products.destroy({
    where: {
        id: Number(id)
	 	
	 	}
	}).then(function() {
	  		res.send({status: "OK", message: "Delete data success" });
	}).catch(function(err) {
	       res.send({status: err.message, message: err.name });
	});
});

// FUNCTION TO LISTEN STREAM ON SERVER
app.listen(PORT, function() {
	console.log('Server running on port ' + PORT);
});

