# Request for permissions (local storage, geolocation, camera)

See on github (https://github.com/appcelerator-developer-relations/appc-sample-ti510/blob/master/app/controllers/permissions.js)    

#### Since SDK 5.4.0.GA we can use Ti.FileSystem.hasPermission / Ti.FileSystem.requestStoragePermission

*example*
```javascript
function doClick(e) {
if (!Ti.Filesystem.hasStoragePermissions()) {
Ti.Filesystem.requestStoragePermissions(function(result) {
  console.log('Permission granted? ' + result.success);
  if (result.success) {
    getFile();
  }
  else {
    alert('Permission denied.');
  }
});
  }
else {
getFile();
}
}
function getFile() {
  var url = "http://www.appcelerator.com/wp-content/uploads/GettingStartedTitanium_Linux.pdf";
var fileName = "GettingStartedTitanium_Linux.pdf";

var httpClient = Ti.Network.createHTTPClient();
httpClient.onerror = function(e) {
alert('Download Error: ' + e.error);
};
httpClient.onload = function(e) {
var filePath = Ti.Filesystem.tempDirectory + Ti.Filesystem.separator + fileName;
var f = Ti.Filesystem.getFile(filePath);
var file = f.write(this.responseData);
alert('File exist? ' + f.exists());
};
httpClient.open('GET', url);
httpClient.send();
}
$.index.open();
```
