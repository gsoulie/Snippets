#Support Android floating action button

[JIRA ticket](https://jira.appcelerator.org/browse/TIMOB-19431)

```javascript
var win = Ti.UI.createWindow({
    fullscreen: true
});
 
var view1 = Titanium.UI.createView({
   backgroundColor:'white',
   width:Ti.UI.FILL,
   height:Ti.UI.FILL
});
 
win.add(view1);
 
var view2 = Titanium.UI.createView({
   backgroundColor:'red',
   width:70,
   height:70,
   left: 50,
   bottom: 50,
   borderRadius: 35,
   viewShadowRadius : 4,
   viewShadowColor : 'gray'
});
 
view1.add(view2);
 
win.open();
```
