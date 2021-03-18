

  /**
   * Sample JavaScript code for youtube.search.list
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/guides/code_samples#javascript
   */


  // add file ti html:      <script src="youtube.js"></script>



var YOUR_API_KEY = "AIzaSyAXixY_kkDNEl3u81teoiRxo5GysbI-yXc";

function gettrailer(movietitle) {
    $.ajax({
        type: "GET",     // [OpenWeather API](https://openweathermap.org/api)
        url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&eventType=none&order=relevance&q=${movietitle}&key=${YOUR_API_KEY}`,
        datatype: "json",
        Headers: {"Accept": "application/json"},
        success: function (data) {
            console.log(data);
            // $("#weekday").empty();
        
         var videourl = `https://youtube.com/watch?v=${data.items[0].id.videoId}`;  

        //  var iframe element / video element.
        //  src

            console.log(videourl);

    }
})
};



gettrailer("The last jedi");


//   function loadClient() {
//     gapi.client.setApiKey("AIzaSyAXixY_kkDNEl3u81teoiRxo5GysbI-yXc");
//     return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
//         .then(function() { console.log("GAPI client loaded for API"); },
//               function(err) { console.error("Error loading GAPI client for API", err); });
//   }
  // Make sure the client is loaded before calling this method.
//   function execute(searchterm) {
//     return gapi.client.youtube.search.list({
//       "part": [
//         "snippet"
//       ],
//       "eventType": "none",
//       "order": "relevance",
//       "q": searchterm
//     })
//         .then(function(response) {
//                 // Handle the results here (response.result has the parsed body).
//                 console.log("Response", response);
//               },
//               function(err) { console.error("Execute error", err); });
//   }
//   gapi.load("client");
// execute("inception");