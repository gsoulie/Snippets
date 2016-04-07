##Picture's zooming with 2 fingers (iOS)

This snippet show how to make zoom with 2 fingers on imageView using pinch event listener
 
####PhotoView.xml
```
<Alloy>
        <NavigationWindow platform="ios">
                <Window title="Photo">
                        <ScrollView id="content">
                                <ImageView id="photo" backgroundColor="#ffffff"/>
                        </ScrollView>
                </Window>
        </NavigationWindow>
</Alloy>
```

####PhotoView.tss
```
"ScrollView": {
    width:Ti.UI.FILL,
    height:Ti.UI.FILL,
    left:0,
    top:0,
    showHorizontalScrollIndicator:false,
    showVerticalScrollIndicator:false,
    maxZoomScale:15,
    minZoomScale:1.0,
    backgroundColor:"transparent",
    contentWidth: 'auto',
    contentHeight: 'auto'
}
"#photo": {
     top: 0,
     left: 0,
     right: 0,
     bottom: 0
}
```

####PhotoView.js
```
var args = arguments[0] || {};

// Loading image content
if(args.image){
    $.photo.image = args.image;
}

/*
 * EVENTS -----------------------------------------------------------
 */
// double tap on main content (scrollView) to set zooming
$.content.addEventListener('doubletap', function(e){
        // Image already zoomed ?
        if($.content.zoomScale > 1){
                // Yes, reset is size to 1
                $.content.zoomScale = 1;
        } else {
                // Else set size to 2 (you can set other value if you want)
                $.content.zoomScale = 2;
        }
});

// manage zooming with two finger
$.content.addEventListener('pinch',function(e){
        if (e.scale>1){
            if (e.scale>$.content.zoomScale){
                  $.content.zoomScale=e.scale;
            } else {
                  $.content.zoomScale=$.content.oldZoom + (e.scale-1);
            }
        } else if (e.scale<$.content.zoomScale)
            $.content.zoomScale=$.content.zoomScale - (1-e.scale);
});

$.content.addEventListener('touchend',function(e){
    $.content.oldZoom=$.content.zoomScale;
});
```
