# Titanium useful modules

## TiWindowStack

https://github.com/HazemKhaled/TiWindowStack


## ti.imagefactory

```gittio install ti.imagefactory```

[Example of usage](https://github.com/appcelerator-modules/ti.imagefactory/blob/stable/android/example/app.js)    

*Sample code*

```
Titanium.Media.showCamera({
            allowEditing: false,
            showControl: true,
            saveToPhotoGallery: false,
            success:function(event) {
                // called when media returned from the camera
                if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                   var image = event.media;
                   
                   var dir;
                   if(Ti.Filesystem.isExternalStoragePresent()){
                        dir = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory, Alloy.CFG.param.photoDirName);
                   } else { 
                        // No SD or iOS
                        dir = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, Alloy.CFG.param.photoDirName);
                   }
                   
                    
                   var ImageFactory = require('ti.imagefactory');
                   image = ImageFactory.imageAsResized(image, {width: image.width / 2, height: image.height / 2});  // resizing
                   image = ImageFactory.compress(image, 0.6); // compression
                                      
                   var f = Titanium.Filesystem.getFile(dir.resolve(),_args.filename);
                   f.write(image);
                    
                   var thb = Titanium.Filesystem.getFile(dir.resolve(),thumbnailFilename);
                   
                   thb.write(image.imageAsThumbnail(Alloy.Globals.thumbSize,0,0));
                }
            },
            cancel:function() {
            },
            error:function(error) {
                
            }
      })
```
