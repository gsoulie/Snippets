# Convert picture to black and white

The goal is to create a html 5 canvas and using a javascript library to adjust RVB values

## HTML 5 content sample

Here is a working sample showing how to use the conversion

```
<!DOCTYPE HTML>
<html>
  <head>
    <style>
      body {
        margin: 0px;
        padding: 0px;
      }
    </style>
  </head>
  <body>
    <canvas id="myCanvas" width="578" height="400"></canvas>
    <script>
      function drawImage(imageObj) {
        var canvas = document.getElementById('myCanvas');
        var context = canvas.getContext('2d');
        var x = 69;
        var y = 50;

        context.drawImage(imageObj, x, y);

        var imageData = context.getImageData(x, y, imageObj.width, imageObj.height);
        var data = imageData.data;

        for(var i = 0; i < data.length; i += 4) {
          var brightness = (0.34 * data[i]) + (0.5 * data[i + 1]) + (0.16 * data[i + 2]);
          // red
          data[i] = brightness;
          // green
          data[i + 1] = brightness;
          // blue
          data[i + 2] = brightness;
        }

        // overwrite original image
        context.putImageData(imageData, x, y);
      }
      
      var imageObj = new Image();
      imageObj.onload = function() {
        drawImage(this);
      };
      imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';
    </script>
  </body>
</html>     
```

## Custom lib

First, create a js library containing a function which create the html 5 code and return it

```
/**
 * Construct HTML5 canvas
 *@param {String} _file : full path of the picture file to convert
 **/
var convertToBnW = function(_file){
    
    var convertFunction = '<script> \
          function drawImage(imageObj) { \
            var canvas = document.getElementById("myCanvas"); \
            var context = canvas.getContext("2d"); \
            var x = 69; \
            var y = 50; \
            context.drawImage(imageObj, x, y); \
            var imageData = context.getImageData(x, y, imageObj.width, imageObj.height); \
            var data = imageData.data; \
            for(var i = 0; i < data.length; i += 4) { \
              var brightness = (0.34 * data[i]) + (0.5 * data[i + 1]) + (0.16 * data[i + 2]); \
              data[i] = brightness; \
              data[i + 1] = brightness; \
              data[i + 2] = brightness; \
             } \
            context.putImageData(imageData, x, y); \
          } \
          var imageObj = new Image(); \
          imageObj.onload = function() {drawImage(this);}; \
          imageObj.src = "'+_file+'"; \
        </script>';
        
    var canvas = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="description" content=""><meta name="author" content="Epsilog"><meta name="viewport" content="width=device-width; initial-scale=1.0"><link rel="shortcut icon" href="/favicon.ico"><link rel="apple-touch-icon" href="/apple-touch-icon.png"></head><body><canvas id="myCanvas" width="800" height="1280"></canvas>'+convertFunction+'</body></html>';
    
    return canvas;
};

exports.convertToBnW = convertToBnW;
```

## Usage

In a controller, call the lib with your picture file in parameter. Here we create a modal window to showing the result.

```
var win = Ti.UI.createWindow();
var html = require("canvas");             // import custom lib
var canvas = Ti.UI.createWebView({        // Create a webView
   html: html.convertToBnW(f.nativePath)  // Call convert function
});
win.add(canvas);
win.open();
```

##More settings

[grayscale algorithm](http://www.tannerhelland.com/3643/grayscale-image-algorithm-vb6/)
