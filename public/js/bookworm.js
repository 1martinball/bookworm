



let fictionGenreList = ["Action/Adventure", "Sci-fi", "Fantasy", "Thriller", "Horror", "Crime", "Romance", "Humour", "Period"];
let nonfictionGenreList = ["Autobiography", "Biography", "Self-Development", "Computing", "Music", "History", "Nature", "Humour", "Other"];

$(document).ready(function () {
	
	function populateGenreList(genreList){
		$.each(genreList, function (i, item) {
			$('#genre').append($('<option>', { 
				value: i+1,
				text : item
			}));
		});
	};
			   
	if($('#fictionYes').is(':checked')){
		$('#genre').html('');
		populateGenreList(fictionGenreList);
	} else if($('#fictionNo').is(':checked')){
		$('#genre').html('');
		populateGenreList(nonfictionGenreList);
	} else {
		$('#genre').html('Any');
		populateGenreList(fictionGenreList);
		populateGenreList(nonfictionGenreList);

	}

	$('#fictionYes').click(function () {
		$('#genre').html('');
		populateGenreList(fictionGenreList);
	});

	$('#fictionNo').click(function () {
		$('#genre').html('');
		populateGenreList(nonfictionGenreList);
	});

	setTimeout(function () {
		$('#addBookActionMsg').fadeOut('fast');
	}, 3000);

	$('#addBooksForm').validate({
		rules: {
			title: {
				required: true,
				minlength: 2
			},
			author: {
				required: true,
				minlength: 2
			},
			genre: 'required'
		},
		messages: {
			title: {
				required: "Please enter the book title",
				minlength: "At least 2 characters required!"
			},
			author: {
				required: "Please enter the authors name",
				minlength: "At least 2 characters required"
			},
			genre: "Please select a genre"
		},
		errorElement: "label",
		errorPlacement: function (error, element) {},
		highlight: function (element) {
			$(element).parent().addClass("is-invalid-label");
			$(element).addClass("is-invalid-input");
			
		},
		unhighlight: function (element) {
			$(element).parent().removeClass("error");
			$(element).removeClass("is-invalid-input");

		}
	});


});