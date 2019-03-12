var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');

var myArgs = process.argv.slice(2)

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

getRepoContributors(myArgs[0], myArgs[1], function(err, result) {
  if (!myArgs[0] && !myArgs[1]) {
  console.log("Specify a repoOwner and a repoName ");
} else if (!myArgs[1]) {
  console.log("Specify a repoName")
}
  for (i = 0; i < result.length; i++) {
  downloadImageByURL(result[i].avatar_url, "./avatar/"+result[i].login)

}




});

function downloadImageByURL(url, filePath) {
request(url).pipe(fs.createWriteStream(filePath))
}




