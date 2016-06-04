$(document).ready(function () {

	$('#fictionYes').click(function () {
		$('#fGenreContainer').removeClass('hide');
		$('#nfGenreContainer').addClass('hide');
		$('#nfgenre')
	})

	$('#fictionNo').click(function () {
		$('#nfGenreContainer').removeClass('hide');
		$('#fGenreContainer').addClass('hide');
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


})