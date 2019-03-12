var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');


console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",

    headers: {
      'User-Agent': 'request',
      'Authorization':  'Token ' + secrets.GITHUB_TOKEN

    }


  };

  request(options, function(err, res, body) {
      var data = JSON.parse(body);

    cb(err, data) ;
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  for (i = 0; i < result.length; i++) {
  console.log("Result:", result[i].avatar_url);
}




});




function downloadImageByURL(url, filePath) {
request(url).pipe(fs.createWriteStream(filePath))
}


// }
downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", './kvirani.jpg')

// request.get("https://avatars2.githubusercontent.com/u/2741?v=3&s=466")
// .on('response', function(response){
//   .pipe(fs.createWriteStream("./kvirani.jpg"))
// })


