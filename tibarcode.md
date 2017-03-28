# ti.barcode

Here is a sample of using of ti.barcode module (iOS / Android)

## Get ti.barcode module for each platform

ti.barcode module is available on gittio or (here)[https://github.com/appcelerator-labs/appc-liveviewer-app/tree/master/modules)    

Donwload it and install it by unzip it and copy it in your project. Then add the correct dependency in your **tiapp.xml**

## Implement ti.barcode scanner

```javascript
var args = arguments[0] || {};

var Barcode = require('ti.barcode');
Barcode.allowRotation = true;
Barcode.displayedMessage = ' ';
Barcode.allowMenu = false;
Barcode.allowInstructions = false;
Barcode.useLED = true;

var window = Ti.UI.createWindow({
    backgroundColor: 'white'
});
var scrollView = Ti.UI.createScrollView({
    contentWidth: 'auto',
    contentHeight: 'auto',
    top: 0,
    showVerticalScrollIndicator: true,
    layout: 'vertical'
});

/**
 * Create a chrome for the barcode scanner.
 */
var overlay = Ti.UI.createView({
    backgroundColor: 'transparent',
    top: 0, right: 0, bottom: 0, left: 0
});
var switchButton = Ti.UI.createButton({
    title: Barcode.useFrontCamera ? 'Back Camera' : 'Front Camera',
    textAlign: 'center',
    color: '#000', backgroundColor: '#fff', style: 0,
    font: { fontWeight: 'bold', fontSize: 16 },
    borderColor: '#000', borderWidth: 1,
    opacity: 0.5,
    width: 220, height: 30,
    bottom: 10
});
switchButton.addEventListener('click', function () {
    Barcode.useFrontCamera = !Barcode.useFrontCamera;
    switchButton.title = Barcode.useFrontCamera ? 'Back Camera' : 'Front Camera';
});
overlay.add(switchButton);
var cancelButton = Ti.UI.createButton({
    title: 'Cancel', textAlign: 'center',
    color: '#000', backgroundColor: '#fff', style: 0,
    font: { fontWeight: 'bold', fontSize: 16 },
    borderColor: '#000', borderWidth: 1,
    opacity: 0.5,
    width: 220, height: 30,
    top: 20
});
cancelButton.addEventListener('click', function () {
    Barcode.cancel();
});
overlay.add(cancelButton);

/**
 * Create a button that will trigger the barcode scanner.
 */
var scanCode = Ti.UI.createButton({
    title: 'Scan Code',
    width: 150,
    height: 60,
    top: 20
});
scanCode.addEventListener('click', function () {
    reset();
    // Note: while the simulator will NOT show a camera stream in the simulator, you may still call "Barcode.capture"
    // to test your barcode scanning overlay.
    requestCameraPermissions(
        function(){            
            Barcode.capture({
                animate: true,
                overlay: overlay,
                showCancel: false,
                showRectangle: true,
                keepOpen: true,
                acceptedFormats: [
                    Barcode.FORMAT_QR_CODE, Barcode.FORMAT_DATA_MATRIX
                ]
            });
        }
    );
});
scrollView.add(scanCode);

/**
 * Create a button that will show the gallery picker.
 */
var scanImage = Ti.UI.createButton({
    title: 'Scan Image from Gallery',
    width: 150, height: 60, top: 20
});
scanImage.addEventListener('click', function () {
    reset();
    Ti.Media.openPhotoGallery({
        success: function (evt) {
            Barcode.parse({
                image: evt.media,
                acceptedFormats: [
                    Barcode.FORMAT_QR_CODE,
                    Barcode.FORMAT_DATA_MATRIX
                ]
            });
        }
    });
});
scrollView.add(scanImage);
/**
 * Now listen for various events from the Barcode module. This is the module's way of communicating with us.
 */
var scannedBarcodes = {}, scannedBarcodesCount = 0;
function reset() {
    scannedBarcodes = {};
    scannedBarcodesCount = 0;
    cancelButton.title = 'Cancel';

    scanResult.text = ' ';
    scanContentType.text = ' ';
    scanFormat.text = ' ';
    scanParsed.text = ' ';
}

/**
 * ERROR case
 */
Barcode.addEventListener('error', function (e) {
    Ti.API.warn("ERROR " + JSON.stringify(e));
    scanContentType.text = ' ';
    scanFormat.text = ' ';
    scanParsed.text = ' ';
    scanResult.text = e.message;
});

/**
 * CANCEL case
 */
Barcode.addEventListener('cancel', function (e) {
    Ti.API.info('Cancel received');
});

/**
 * SUCCESS case
 */
Barcode.addEventListener('success', function (e) {
    Ti.API.warn('Success called with barcode: ' + e.result);
        
    if (!scannedBarcodes['' + e.result]) {
        var res = [];
        res = e.result.split("#");
    
        scannedBarcodes[e.result] = true;
        scannedBarcodesCount += 1;
        cancelButton.title = 'Finished (' + scannedBarcodesCount + ' Scanned)';

        scanResult.text += e.result + ' ';
        scanContentType.text += parseContentType(e.contentType) + ' ';
        scanFormat.text += e.format + ' ';
        
        for(var i in res){
            scanParsed.text += res[i] + "\r\n";    
        }
        
        //scanParsed.text += parseResult(e) + ' ';
    }
});

/**
 * Finally, we'll add a couple labels to the window. When the user scans a barcode, we'll stick information about it in
 * to these labels.
 */
scrollView.add(Ti.UI.createLabel({
    text: 'You may need to rotate the device',
    top: 10,
    height: Ti.UI.SIZE || 'auto', width: Ti.UI.SIZE || 'auto'
}));

scrollView.add(Ti.UI.createLabel({
    text: 'Result: ', textAlign: 'left',
    top: 10, left: 10,
    color: 'black',
    height: Ti.UI.SIZE || 'auto'
}));
var scanResult = Ti.UI.createLabel({
    text: ' ', textAlign: 'left',
    top: 10, left: 10,
    color: 'black',
    height: Ti.UI.SIZE || 'auto'
});
scrollView.add(scanResult);

scrollView.add(Ti.UI.createLabel({
    text: 'Content Type: ',
    top: 10, left: 10,
    textAlign: 'left',
    color: 'black',
    height: Ti.UI.SIZE || 'auto'
}));
var scanContentType = Ti.UI.createLabel({
    text: ' ', textAlign: 'left',
    top: 10, left: 10,
    color: 'black',
    height: Ti.UI.SIZE || 'auto'
});
scrollView.add(scanContentType);

scrollView.add(Ti.UI.createLabel({
    text: 'Format: ', textAlign: 'left',
    top: 10, left: 10,
    color: 'black',
    height: Ti.UI.SIZE || 'auto'
}));
var scanFormat = Ti.UI.createLabel({
    text: ' ', textAlign: 'left',
    top: 10, left: 10,
    color: 'black',
    height: Ti.UI.SIZE || 'auto'
});
scrollView.add(scanFormat);

scrollView.add(Ti.UI.createLabel({
    text: 'Parsed: ', textAlign: 'left',
    top: 10, left: 10,
    color: 'black',
    height: Ti.UI.SIZE || 'auto'
}));
var scanParsed = Ti.UI.createLabel({
    text: ' ', textAlign: 'left',
    top: 10, left: 10,
    color: 'black',
    height: Ti.UI.SIZE || 'auto'
});
scrollView.add(scanParsed);

function parseContentType(contentType) {
    Ti.API.warn('parseContentType ' + contentType);
    switch (contentType) {
        case Barcode.URL:
            return 'URL';
        case Barcode.SMS:
            return 'SMS';
        case Barcode.TELEPHONE:
            return 'TELEPHONE';
        case Barcode.TEXT:
            return 'TEXT';
        case Barcode.CALENDAR:
            return 'CALENDAR';
        case Barcode.GEOLOCATION:
            return 'GEOLOCATION';
        case Barcode.EMAIL:
            return 'EMAIL';
        case Barcode.CONTACT:
            return 'CONTACT';
        case Barcode.BOOKMARK:
            return 'BOOKMARK';
        case Barcode.WIFI:
            return 'WIFI';
        default:
            return 'UNKNOWN';
    }
}

function parseResult(event) {
    Ti.API.warn('parseResult ' + event);
    var msg = '';
    switch (event.contentType) {
        case Barcode.URL:
            msg = 'URL = ' + event.result;
            break;
        case Barcode.SMS:
            msg = 'SMS = ' + JSON.stringify(event.data);
            break;
        case Barcode.TELEPHONE:
            msg = 'Telephone = ' + event.data.phonenumber;
            break;
        case Barcode.TEXT:
            msg = 'Text = ' + event.result;
            break;
        case Barcode.CALENDAR:
            msg = 'Calendar = ' + JSON.stringify(event.data);
            break;
        case Barcode.GEOLOCATION:
            msg = 'Geo = ' + JSON.stringify(event.data);
            break;
        case Barcode.EMAIL:
            msg = 'Email = ' + event.data.email + '\nSubject = ' + event.data.subject + '\nMessage = ' + event.data.message;
            break;
        case Barcode.CONTACT:
            msg = 'Contact = ' + JSON.stringify(event.data);
            break;
        case Barcode.BOOKMARK:
            msg = 'Bookmark = ' + JSON.stringify(event.data);
            break;
        case Barcode.WIFI:
            return 'WIFI = ' + JSON.stringify(event.data);
        default:
            msg = 'unknown content type';
            break;
    }
    return msg;
}

/**
 * Check for camera permission
 * @param {Object} _callback
 */
function requestCameraPermissions(_callback){
      _callback = _callback || function(){};
    
    if(OS_IOS){
        _callback();
    } else {
        Ti.API.info("PERMISSION CAMERA",require('ti.permissions').hasPermission('android.permission.CAMERA'));
        if (!require('ti.permissions').hasPermission('android.permission.CAMERA')){
            
            require('ti.permissions').requestPermissions(['android.permission.CAMERA','android.permission.WRITE_EXTERNAL_STORAGE'], function(e) {
                if (e.success != 0){
                    Ti.API.warn("Permissions OK");
                    _callback();
                } else {
                    Ti.API.warn("Permissions denied");
                    Alert("Vous devez autoriser les permissions demandées pour pouvoir accéder à la prise de photos.");
                }
            });
        } else {
            _callback();
        }
    }
};

window.add(scrollView);
window.open();
```

*Notice* that you have to check for Android camera permission before call barcode scanner. To do this, you have to install first the *ti.permissions* module (don't forget to add its requirement in your tiapp.xml)

