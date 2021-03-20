

/**
 * Sample JavaScript code for youtube.search.list
 * See instructions for running APIs Explorer code samples locally:
 * https://developers.google.com/explorer-help/guides/code_samples#javascript
 */


// add file ti html:      <script src="youtube.js"></script>



// var YOUR_API_KEY = "AIzaSyAXixY_kkDNEl3u81teoiRxo5GysbI-yXc";

var YOUR_API_KEY = "AIzaSyDuYx8N72Fgrlvv1uyeakRwNNeB6R7MM44";

async function gettrailer(movietitle) {
  const titleWithTrailerString = `${movietitle} official trailer`;
  console.log('trailerString: ' + titleWithTrailerString)
  const videoURL = await $.ajax({
    type: "GET",
    url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&eventType=none&order=relevance&q=${titleWithTrailerString}&key=${YOUR_API_KEY}`,
    datatype: "json",
    Headers: { "Accept": "application/json" },
    success: function (data) {
      console.log('full trailer data')
      console.log(data);
      // $("#weekday").empty();

      //we need to get the right data-- data.items[i].id.kind === "youtube#video"
      var filteredData = data.items.filter(item => {
        return item.id.kind == "youtube#video"
      });
      console.log('filtered data')
      console.log(filteredData);

      var videourl = `https://youtube.com/watch?v=${filteredData[0].id.videoId}`;

      //  var iframe element / video element.
      //  src
      console.log('built youtube url')
      console.log(videourl);
      window.location.href = videourl;
      return;

    }
  })
};



// gettrailer("star wars");


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

$(document).on('click', '.youtube-router', function (e) {
  e.preventDefault();
  const desiredTitle = $(this).attr('data-title');
  console.log(desiredTitle)
  gettrailer(desiredTitle)
  //.then((url) => {
   // console.log('what is url?')
   // console.log(url);
    // document.location.href = url;
  //})
  .catch(err => {
    console.log(err)
  })



})