var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;

// INIT DATA TO SERVE
var products = [
	{
		id: 1,
		name: "car"
	},
	{
		id: 2,
		name: "motorcycle"
	},
	{
		id: 3,
		name: "equipment"
	},
	{
		id: 4,
		name: "music instrument"
	},
	{
		id: 5,
		name: "furniture"
	}

];

var currentID = 5;

// MIDDLEWARE : SET STATIC DIRECTORY ON SERVER AND BODY PARSER FOR REQUEST
app.use(express.static(__dirname));
app.use(bodyParser.json());

// ROUTES FOR API
app.get('/products', function(req, res) {
	res.send({products: products});
});

app.post('/products', function(req, res) {
	var productName = req.body.name;
	currentID++;

	products.push({
		id: currentID,
		name: productName
	});

	res.send("Successfully create");
});

app.put('/products/:id', function(req, res) {
	var id = req.params.id;
	var newName = req.body.newName;

	var found = false;

	products.forEach(function(product, index) {
		if(!found && product.id === Number(id)) {
			product.name = newName;
		}
	});

	res.send("Successfully updated");
});

app.delete('/products/:id', function(req, res) {
	var id = req.params.id;
	var found = false;

	products.forEach(function(product, index) {
		if(!found && product.id === Number(id)) {
			products.splice(index, 1);
		}
	});

	res.send("Successfully deleted");
});

// FUNCTION TO LISTEN STREAM ON SERVER
app.listen(PORT, function() {
	console.log('Server running on port ' + PORT);
});

