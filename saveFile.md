## SaveFile generic lib

```javascript
/**
 * File : Save file
 *
 * @bin: Binary
 * @filename: Filename
 * @base64: Decode base64 binary
 *
 */
File.saveFile = function(_args) {

        // Decode file
        if(_args.base64) {
                _args.bin = Ti.Utils.base64decode(bin);
        }

        // Save on external or internal storage
        if(Ti.Filesystem.isExternalStoragePresent()){
                var cachePath = Ti.Filesystem.externalStorageDirectory;
        } else {
                var cachePath = Ti.Filesystem.applicationDataDirectory;
        }

        // Create Cache directory
        var cacheDir = Ti.Filesystem.getFile(cachePath, 'cache');
        if (!cacheDir.exists()) {
            cacheDir.createDirectory();
        }

        var file = Ti.Filesystem.getFile(cachePath + 'cache/', _args.filename);
        Ti.API.info('[---FILE---] File path: ' + file.resolve());

        file.write(_args.bin);

        if(file.exists) {
            Ti.API.info('[---FILE---] File exist: YES!');
            Ti.API.info('[---FILE---] File size: ' + file.size);
        } else {
            Ti.API.info('[---FILE---] File exist: NO!');
        }

        // Return path of file
        if(OS_IOS && Ti.version <= '1.8.2') {
                var fullPath = Ti.Filesystem.applicationDataDirectory + _args.filename;
                  fullPath = fullPath.replace('file://','app://');
                  return fullPath;
        } else {
                Ti.API.info('[---FILE---] File path: ' + file.nativePath);
                return file.nativePath;
        }
};
```
