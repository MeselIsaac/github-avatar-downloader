var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');

var myArgs1 = process.argv[2]
var myArgs2 = process.argv[3]

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

getRepoContributors(myArgs1, myArgs2, function(err, result) {
  console.log("Errors:", err);
  for (i = 0; i < result.length; i++) {
  downloadImageByURL(result[i].avatar_url, "./avatar/"+result[i].login)

}




});

function downloadImageByURL(url, filePath) {
request(url).pipe(fs.createWriteStream(filePath))
}




