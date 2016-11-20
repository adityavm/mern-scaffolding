import q from "q";

const utils = {
  xhr: function(url, payload) {
    let
      data = null,
      lastResponse = null,
      request = new XMLHttpRequest(),
      then = q.defer();

    let type = payload ? "POST" : "GET";

    request.open(type, url);
    request.responseType = "json";
    request.onload = function() {
      lastResponse = request.response;
      if (lastResponse.error) {
        console.error(lastResponse);
        then.reject(lastResponse);
        return;
      }

      try {
        data = lastResponse;
      } catch (e) {
        then.reject({ error: e, response: lastResponse });
        return;
      }

      then.resolve(data);
    }
    request.send(type === "POST" ? payload : null);
    return then.promise;
  },
}

module.exports = utils;
