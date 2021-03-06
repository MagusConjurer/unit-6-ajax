// Array of items to create buttons for
var topics = ["haha","eww","no","hey","bye","sorry","you're welcome"];

createButtons();

function updateImages(url){
  $.ajax({
    url: url,
    method: "GET"
  }).then(function(response) {
    renderImages(response);   
  });
}


function renderImages(res){
  $(".card-deck").empty();
  for(var i=0; i < res.data.length;i++){
    var newGIF = $("<img>").attr("src", res.data[i].images.fixed_height_still.url);
    newGIF.addClass("gif stop");
    newGIF.data("data-val", i);
    newGIF.attr("alt", res.data[i].title)
    addToDeck(newGIF, res.data[i].rating);
  };

  // On click function to switch still image to active or back
  $(document).on("click", ".gif", function(){
    // Boolean to checking which status the image is in
    var play = $(this).attr("class").includes("play");
    var stop = $(this).attr("class").includes("stop");

    // Data source for the GIF images
    var gifData = res.data[$(this).data("data-val")].images; 

    // Toggle the whether the image is active
    if(play == true){
      $(this).removeClass("play");
      $(this).addClass("stop");
      $(this).attr("src", gifData.fixed_height_still.url);
    } else if (stop == true) {
      $(this).addClass("play");
      $(this).removeClass("stop");
      $(this).attr("src", gifData.fixed_height.url);
    }; 
  
  });
};

function addToDeck(img, rating){
  var column = $("<div>").addClass("col-sm-4");
  var newCard = $("<div>").addClass("card");
  var newCardBody = $("<div>").addClass("card-body").text("Rating: " + rating.toUpperCase());
  var newCardTitle = $("<h5>").addClass("card-title");
  var newCardText = $("<p>").addClass("card-text");

  img.addClass("card-img-top");

  newCardBody.append(newCardTitle, newCardText);
  newCard.append(img, newCardBody);
  column.append(newCard);

  $(".card-deck").append(column);
};

// Create buttons that can be pressed to change the displayed GIFS
function createButtons(){
  $("#button-menu").empty();
  for(var i = 0; i < topics.length; i++){
    var newBtn = $("<button>").addClass("btn btn-dark topics");
    newBtn.text(topics[i]);
    $("#button-menu").append(newBtn);
  }
}

// Add a new button from submitted input

$(document).on("click", "#add", function(event){
  event.preventDefault();
  var input = $("#newTopic");
  topics.push(input.val());
  createButtons();
  input.val("");
});

$(document).on("click", ".topics", function(event){
  event.preventDefault();
  var topic = $(this).text();
  newURL = "https://api.giphy.com/v1/gifs/search?api_key=1G6SPeGpBmZUH9CoKUlujrqu8YG7ruMz&q=" + topic + "&limit=10&offset=0&rating=PG-13&lang=en";
  updateImages(newURL);
})


