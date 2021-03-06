## Url scheme interaction between 2 mobile apps

[based on http://fokkezb.nl/2013/08/26/url-schemes-for-ios-and-android-1/ tutorial](http://fokkezb.nl/2013/08/26/url-schemes-for-ios-and-android-1/),
 
### Step 1

You have to declare some instruction in the tiapp.xml of your target application, specially the scheme parameter

**MyApp2**
```xml
 <android xmlns:android="http://schemas.android.com/apk/res/android">
        <manifest>
            <uses-sdk android:minSdkVersion="15"/>
            <uses-sdk android:targetSdkVersion="21"/>
            <application>
                <activity android:configChanges="keyboardHidden|orientation" android:label="test8"
                          android:name=".test8Activity"
                          android:launchMode="singleTask" >
                          
                    <intent-filter>
                        <action android:name="android.intent.action.MAIN"/>
                        <category android:name="android.intent.category.LAUNCHER"/>
                    </intent-filter>
                    
                    <intent-filter>
                        <action android:name="android.intent.action.VIEW"/>
                        <category android:name="android.intent.category.DEFAULT"/>
                        <category android:name="android.intent.category.BROWSABLE"/>
                        <data android:scheme="test8" />
                    </intent-filter>
                </activity>
         </application>
        </manifest>
    </android>
```  

### Step 2 - Make your call on your first app

   
**MyApp1**

```javascript
  if(OS_ANDROID){
    var myIntent = Ti.Android.createIntent({
      action: Ti.Android.ACTION_MAIN,
      packageName: "com.test.test8",
      className: "com.test.test8.Test8Activity",
      flags: Ti.Android.FLAG_ACTIVITY_NEW_TASK,
      data: {param1:"coucou"}   // yours parameters here
    });
  
    myIntent.addCategory(Ti.Android.CATEGORY_LAUNCHER);
    Ti.Android.currentActivity.startActivity(myIntent);
    
```    
### Step 3 - Retrieve parameters on the target app

```javascript     
var activity = Ti.Android.currentActivity;
var data = activity.getIntent().getData();
if(data){
    alert(JSON.stringify(urlToObject(data)));
} else{
    alert("No parameters");
}

function urlToObject(url){
  var returnObj = {};

  url = url.replace('test8://?', '');

  var params = url.split('&');
  params.forEach(function(param) {
      var keyAndValue = param.split('=');
      returnObj[keyAndValue[0]] = decodeURI(keyAndValue[1]);
  });

  return returnObj;   
};

function processArgs() {
    data = activity.getIntent().getData();
    if (data) {     
          urlToObject(data);
    }  
}

// on launch
processArgs();
```
