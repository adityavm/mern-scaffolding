var express = require("express");
var
  app = express();
  port = 3000;

var __dist = __dirname + "/dist";

// static files
app.use(express.static("./dist"));

// main route
app.get("/", function (req, res) {
  var opts = {
    root: __dist,
    dotfiles: "deny",
  };
  res.sendFile("index.html", opts);
  console.log("got GET request");
});

app.get("/api/:api/:filter?/:value?", function(req, res) {
  try {
    var api = require("./api/" + req.params.api);
  } catch (e) {
    res.status(404).send("Oops");
    console.log("errored", e);
    return;
  }

  res.set("Access-Control-Allow-Origin", "*");

  // set params
  var params = {};
  if (req.params.filter && req.params.value) {
    var val = Number.isNaN(parseInt(req.params.value)) ? req.params.value : parseInt(req.params.value);
    params[req.params.filter] = val;
  }

  console.log("serving /%s", req.params.api);
  api.respondTo(res, params);
});

// start server
app.listen(port, function () {
  console.log("listening on %d", port);
});
