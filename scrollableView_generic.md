##Generic scrollableView widget

Very useful for creating tutorial frame

####View file
```
<Alloy>
	<!-- iOS -->
	<NavigationWindow platform="ios">
		<Window id="tutorial">
			<ScrollableView id="container"/>
			<View id="pagingControl">
				<Button id="skip" backgroundColor="transparent" title="SKIP"/>
				<View id="dotView"/>
				<Button id="done" title="NEXT" backgroundColor="transparent"/>
			</View>
		</Window>
	</NavigationWindow>
	
	<!-- Android -->
	<Window id="tutorial" platform="android">
		<ScrollableView id="container"/>
		<View id="pagingControl">
			<Button id="skip" backgroundColor="transparent" title="SKIP"/>
			<View id="dotView"/>
			<Button id="done" title="NEXT" backgroundColor="transparent"/>
		</View>
	</Window>
</Alloy>
```

####Controller file
```
var pageCount = 0,
    nextButtonTitle = "NEXT",
    doneButtonTitle = "DONE",
    closeCallback;
    
/**
 * 
 * @param {String}  _args.pagingControlBackground :
 * @param {String}  _args.backgroundColor : 
 * @param {String}  _args.fontColor
 * @param {Array}   _args.content : views to add to the scrollableView
 * @param {String}  _args.skipButtonTitle : 
 * @param {String}  _args.doneButtonTitle : 
 * @param {String}  _args.nextButtonTitle : 
 * @param {Function}_args.closeCallback : callback function play on done, skip buttons
 */
 
exports.init = function(_args){
    $.tutorial.backgroundColor = _args.backgroundColor || "#ffffff";
    $.pagingControl.backgroundColor = "#00adef";
    $.container.removeAllChildren();
    $.dotView.removeAllChildren();
    
    nextButtonTitle = _args.nextButtonTitle || "NEXT";
    doneButtonTitle = _args.doneButtonTitle || "DONE";
    $.skip.title = _args.skipButtonTitle || "SKIP";
    
    pageCount = _args.content ? _args.content.length : 0;
    closeCallback = _args.closeCallback || function(){};
    
    if(_args.content){
        $.container.setViews(_args.content);    
        
        // Création du paging control
        for(var i = 0; i < pageCount; i++){
            var dot = Ti.UI.createLabel({
               id: "dot"+i,
               text: Alloy.CFG.icons.enableDot	// using custom font with plain dot character
            });
            
            $.resetClass(dot,'dot');
            $.dotView.add(dot);
        }
    }
};

exports.open = function(){
    $.tutorial.open();
    $.container.setCurrentPage = 0;
    refreshPagingControl(0);
};

exports.close = function(){$.tutorial.close();};

/**
 * pagingControl Refresh switch active page
 * @param {Object} index
 */
function refreshPagingControl(index){
    var dots = $.dotView.getChildren();
    
    for(var i = 0; i < dots.length; i++){
        if(index == i){
            //dots[i].text = Alloy.CFG.icons.enableDot;
            dots[i].color = "#FFFFFF";
        } else {
            //dots[i].text = Alloy.CFG.icons.disableDot;
            dots[i].color = "#008cc1";
        }        
    }
    
    // button title switch index
    if(index == dots.length-1){
        // last page
        $.done.title = doneButtonTitle;
        $.done.width = Ti.UI.SIZE;
        $.skip.visible = false;
    } else {
        $.done.title = nextButtonTitle;
        $.skip.visible = true;
    }     
};

// open event
$.tutorial.addEventListener('open', function(){
    if(OS_ANDROID){
        $.tutorial.activity.actionBar.hide();
        $.tutorial.activity.actionBar.displayHomeAsUp = false;
        $.tutorial.activity.actionBar.icon = "";
        $.tutorial.activity.actionBar.logo = "";
        $.tutorial.activity.actionBar.title = "";
    }
});

// scrollend event
$.container.addEventListener('scrollend', function(e){refreshPagingControl(e.source.currentPage);});

// clic on skip button
$.skip.addEventListener('click', function(){
    if(closeCallback){closeCallback();}
    $.tutorial.close();
});

// backbutton event Android only
if(OS_ANDROID){
    $.tutorial.addEventListener('androidback', function(){
        if(closeCallback){closeCallback();}
        $.tutorial.close();
    });
}

// clic on done button
$.done.addEventListener('click', function(){
    var children = $.container.getViews();
    
    if(children.length > 0){
        
        // current page is the last ?
        if($.container.currentPage != children.length-1){
            // No, scrolling next
            $.container.moveNext();
            refreshPagingControl($.container.currentPage);
        } else {
            // last page, close widget
            if(closeCallback){closeCallback();}
            $.tutorial.close();
        }
    } else {
        if(closeCallback){closeCallback();}
        $.tutorial.close();
    }
});

// Cleaning method
$.cleanup = function cleanup() {
    $.destroy();
    $.off();
};

$.tutorial.addEventListener('close', $.cleanup);
```



####Style file
```
 "Window": {
	backgroundColor: Alloy.Globals.grey,
	orientationModes: [Titanium.UI.PORTRAIT,Titanium.UI.UPSIDE_PORTRAIT]
}

"#container": {
	width: Ti.UI.FILL,
	top: 0,
	bottom: 40
}
".tutorialView": {
	width: Ti.UI.FILL,
	top: 0
}
"#pagingControl": {
	bottom: 0,
	height: 40,
	width: Ti.UI.FILL
}
"#dotView": {
	height: Ti.UI.FILL,
	width: Ti.UI.SIZE,
	layout: "horizontal"
}
".dot": {
	top: 10,
	height: 20,
	width: 15,
	left: 2,
	right: 2,
	font: {
		fontFamily: "vega_symbol",	// custom font provide plain dot character
		fontSize: "10sp"
	},
	color: "#ffffff"
}
"#skip": {
	left: 10,
	height: Ti.UI.FILL,
	color: "#ffffff",
	font: {
		fontSize: "11sp"
	}
}

"#done": {
	right: 10,
	height: Ti.UI.FILL,
	color: "#ffffff",
	font: {
		fontSize: "11sp"
	}
}
```



####Usage (from another controller)
```
<Alloy>
	<Window width="Ti.UI.FILL" height="Ti.UI.FILL" backgroundColor="#fff" fullscreen="true"/>
	<Widget src="com.isiapps.tutorialframe" id="tutorial"/>
</Alloy>
```

```
var page1 = Ti.UI.createView({
	height: Ti.UI.FILL,
	width: Ti.UI.FILL,
	backgroundColor: "#ffcc00"
});
var labelPage1 = Ti.UI.createLabel({text:"Page 1"});
page1.add(labelPage1);

var page2 = Ti.UI.createView({
	height: Ti.UI.FILL,
	width: Ti.UI.FILL,
	backgroundColor: "#22cc11"
});
var labelPage2 = Ti.UI.createLabel({text:"Page 2"});
page2.add(labelPage2);

var page3 = Ti.UI.createView({
	height: Ti.UI.FILL,
	width: Ti.UI.FILL,
	backgroundColor: "#aa33cc"
});
var labelPage3 = Ti.UI.createLabel({text:"Page 3"});
page3.add(labelPage3);

var page4 = Ti.UI.createView({
	height: Ti.UI.FILL,
	width: Ti.UI.FILL,
	backgroundColor: "#e5b4f2"
});
var labelPage4 = Ti.UI.createLabel({text:"Page 4"});
page4.add(labelPage4);

$.tutorial.init({
	content: [page1,page2,page3,page4] 
});

$.tutorial.open();
``` 
