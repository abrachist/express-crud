$(function(){

	// GET DATA FROM SERVER
	$("#get-data").on("click", function() {
		$.ajax({
			url: "/products",
			contentType: "application/json",
			success: function(response) {
				var tbodyElem = $("tbody");
				tbodyElem.html('');

				response.products.forEach(function(product) {
					tbodyElem.append('<tr>' +
							'<td class="id">'+ product.id +'</td>'+
							'<td><input type="text" class="name" value="'+ product.name +'"></input></td>'+
							'<td>'+
								'<button class="update-data">Update</button>'+
							    '<button class="delete-data">Delete</button>'+
							'</td>'+
						'</tr>')
				});
			}
		});
	});

	// CREATE DATA ON SERVER
	$("#create-form").on("submit", function(event) {
		event.preventDefault();

		var createInput = $("#create-input");

		$.ajax({
			url: "/products",
			method: "post",
			contentType: "application/json",
			data: JSON.stringify({name: createInput.val()}),
			success: function(response) {
				console.log(response);
				createInput.val('');
				$("#get-data").click();
			}
		});
	});


	// UPDATE DATA ON SERVER
	$("table").on("click",".update-data", function() {
		var rowElem = $(this).closest("tr");
		var id = rowElem.find(".id").text();
		var newName = rowElem.find(".name").val();

		$.ajax({
			url: "/products/" + id,
			method: "put",
			contentType: "application/json",
			data: JSON.stringify({newName: newName}),
			success: function(response) {
				console.log(response);
				$("#get-data").click();
			}
		});
	});

	// DELETE DATA ON SERVER
	$("table").on("click",".delete-data", function() {
		var rowElem = $(this).closest("tr");
		var id = rowElem.find(".id").text();

		$.ajax({
			url: "/products/" + id,
			method: "delete",
			contentType: "application/json",
			success: function(response) {
				console.log(response);
				$("#get-data").click();
			}
		});
	});

});