// wait until doc loads
$(document).ready(function() {
	// object oriented
	var gifGenerator = {
		// starting buttons
		emotions: ["happy", "sad", "scared", "angry",
			 "surprised", "confused", "awkward", "drunk", 
			 "excited", "bored"],
		// method for user added buttons
		addEmotions: function() {
			// setting variable equal to user input text and error
			// handling any leading/trailing spaces from user and
			// putting it all to lowercase
			var newEmotion = $("#emotion-input").val().trim()
				.toLowerCase();
			// pushing the new emotion into emotion array
			gifGenerator.emotions.push(newEmotion);
			// run the display emotions meethod
			gifGenerator.displayButtons();
		},
		// method to display the buttons
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
				// give it a data name equal to the emotion
				button.attr("data-name", gifGenerator.emotions[i]);
				// give it text equal to emotion in current array index
				button.text(gifGenerator.emotions[i]);
				// append button to the buttons div
				$("#emotion-buttons").append(button);
			}
		},
		// method to display gifs
		displayGifs: function() {
			// clears prior gif each time a new button is clicked
			$("#emotion-gifs").empty();
			// beta api key from giphy
			var apiKey = "005nfNXY5tfl1ZFiBX7GH8Hzg9aWf6sQ";
			// data name of the button clicked will be search parameter
			var clickEmotion = $(this).attr("data-name");
			// number of gifs to display
			var numGifs = 10;
			// max rating pg
			var rating = "pg"
			// buildin query url
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        clickEmotion + "&rating=" + rating + "&api_key=" + apiKey
        + "&limit=" + numGifs;

      // ajax call getting JSON object from query url
      $.ajax({
      	url: queryURL,
      	method: "GET"
      })
      // after data comes back from request
      .done(function(response) {
      	// saving response.data in var for shorthand
      	var results = response.data;
      	// loop through the # of data results in response
      	for (var i = 0; i < results.length; i++) {
      		// creating div for info to go into
      		var gifDiv = $("<div>");
      		// adding gif class for css styling/click feature
      		gifDiv
      			.addClass("gif");
      		// creating <p> for the rating info	
      		var p = $("<p>").text("Rating: " + results[i].rating);
      		// creating image tag for the gif
      		var gif = $("<img>");
      		// giving image tag source with gif url at i
      		gif.attr("src", results[i].images.fixed_height.url);
      		// appending the p and image to the gifDiv
      		gifDiv.append(p);
      		gifDiv.append(gif);
      		// prepending the giv div to the emotion gifs row/div
      		$("#emotion-gifs").prepend(gifDiv);
      	}
      });
		},
		// method to animate gifs
		animateGifs: function() {
			console.log("placehold");
		}
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

// click event listener to all elements with "emotion" class
// will run the diplay Gifs method
 $(document).on("click", ".emotion", gifGenerator.displayGifs);

	// click event listener to all elements with "gif" class
	// will run the animate Gifs method
	$(document).on("click", ".gif", gifGenerator.animateGifs);

// close ready function
});