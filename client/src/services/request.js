const Request = function(url) {
  this.url = url;
}

Request.prototype.get = function (callback) {
  const request = new XMLHttpRequest();
};

module.exports = Request;
