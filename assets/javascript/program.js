var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=1G6SPeGpBmZUH9CoKUlujrqu8YG7ruMz&q=game&limit=5&offset=0&rating=PG&lang=en";
var searchList = [];

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    renderImages(response);

    $(document.body).on("click", ".gif", function(){
      // Boolean to checking which status the image is in
      var play = $(this).attr("class").includes("play");
      var stop = $(this).attr("class").includes("stop");

      // Data source for the GIF images
      var gifData = response.data[$(this).data("data-val")].images; 

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

  });

function renderImages(res){
  for(var i=0; i < res.data.length;i++){
    var newGIF = $("<img>").attr("src", res.data[i].images.fixed_height_still.url);
    newGIF.addClass("gif stop");
    newGIF.data("data-val", i);
    $("h1").append(newGIF);
  };
}
// Array of items to create buttons for


// Create buttons that can be pressed to change the displayed GIFS

// On click function to switch still image to active or back

// 