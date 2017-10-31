// wait until doc loads
$(document).ready(function() {
	// object oriented
	var gifGenerator = {
		// starting buttons
		emotions: ["happy", "sad", "scared", "angry",
			 "surprised", "confused", "awkward", "drunk", 
			 "excited", "bored"],
		// function for user added buttons
		addEmotions: function() {
			// setting variable equal to user input text and error
			// handling any leading/trailing spaces from user
			var newEmotion = $("#emotion-input").val().trim();
			// pushing the new emotion into emotion array
			gifGenerator.emotions.push(newEmotion);
			// run the display emotions function
			gifGenerator.displayButtons();
		},
		// function to display the buttons
		displayButtons: function () {
			// empty the buttons div each time this runs so that it 
			// doesn't re-write all the buttons over each time user 
			// adds a new button and clicks submit
			$("#emotion-buttons").empty();
			// loop through each emotion in array
			for (var i = 0; i < gifGenerator.emotions.length; i++) {
				// create jquery button selector var
				var button = $("<button>");
				// give it bootstrap button classes and emotion class
				button.addClass("btn btn-primary emotion");
				// give it text equal to emotion in current array index
				button.text(gifGenerator.emotions[i]);
				// append button to the buttons div
				$("#emotion-buttons").append(button);
			}
		},
		// displayGifs: function() {

		// },
		// animateGifs: function() {

		// }
	// close object
	};

	// run display method to display initial button set
	gifGenerator.displayButtons();

	// run add emotion method when user adds emotion/clicks submit
	$("#add-emotion").on("click", function(event) {
		// prevents the form from submitting and page reloading
		event.preventDefault();
		gifGenerator.addEmotions();
	});

	// // click event listener to all elements with "emotion" class
	// // will run the diplay Gifs method
 //  $(document).on("click", "emotion", displayGifs);

	// // click event listener to all elements with "gif" class
	// // will run the animate Gifs method
	// $(document).on("click", "gif", animateGifs);

// close ready function
});