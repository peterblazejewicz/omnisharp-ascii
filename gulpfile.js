"use strict";
var gulp = require("gulp");
var remote = require("gulp-remote-src");
var del = require("del");
var path = require("path");
var ImageToAscii = require("image-to-ascii");
var green = require("chalk").bold.green;
var COPY = "Cross platform .NET development!";
var DESCRIPTION = "OmniSharp is a family of Open Source projects, each with one goal:\nTo enable a great .NET experience in YOUR editor of choice";

gulp.task("clean:assets", function () {
  return del([
    "./assets/"
  ]);
})

gulp.task("convert", function (cb) {
  var image = path.join(__dirname, "assets/logo_large.png");
  ImageToAscii({
    path: image,
    pixels: " .#@",
    reverse: true
  }, function (err, converted) {
    if (err) {
      cb(err);
    } else {
      console.log(converted.trim());
      console.log(green(COPY));
      console.log(green(DESCRIPTION));
      console.log("\n");
    }
    cb(0);
  });
});

gulp.task("download", ["clean:assets"], function () {
  return remote([
    "logo_large.png",
    "logo-small.png"
  ],
    {
      base: "https://raw.githubusercontent.com/OmniSharp/OmniSharp.github.io/master/images/"
    })
    .pipe(gulp.dest("./assets/"));
});
