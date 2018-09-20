const youTubeRegEx = /(http(s)?:\/\/)?((w){3}.)?youtu(?:be\.com\/watch\?.*v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;
const instagramRegEx = /(http(s)?:\/\/)?((w){3}.)?instagram\.com(\/p\/\w+\/?)/;
const spotifyRegEx = /spotify:track:\w+|(http(s)?:\/\/)?((w){3}.)?[a-z]+\.spotify\.com\/[^\s]+/;
const vliveRegEx = /(http(s)?:\/\/)?((w){3}.)?vlive\.tv\/video\/\d+/;
const twitterRegEx = /(http(s)?:\/\/)?((w){3}.)?twitter\.com\/[^\s]+/;
const redditRegEx = /(http(s)?:\/\/)?((w){3}.)?reddit\.com\/(r|user)\/[^\s]+/;

function matchStr(str, regex) {
  if (str) {
    return str.match(regex);
  }
}

module.exports = {
  matchYTUrl: function(url) {
    return matchStr(url, youTubeRegEx);
  },
  matchIGUrl: function(url) {
    return matchStr(url, instagramRegEx);
  },
  matchSpotifyUrl: function(url) {
    return matchStr(url, spotifyRegEx);
  },
  matchVLiveUrl: function(url) {
    return matchStr(url, vliveRegEx);
  },
  matchTwitterUrl: function(url) {
    return matchStr(url, twitterRegEx);
  },
  matchRedditUrl: function(url) {
    return matchStr(url, redditRegEx);
  },
};
