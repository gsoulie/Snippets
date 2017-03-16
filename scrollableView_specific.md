## Specific scrollableView widget
 
#### View file
```xml
  <Alloy>
	<Window id="tutorial">
		<ScrollableView id="container">
			<View class="tutorialView" id="view1">
				<Label id="lbl1">Page 1</Label>
			</View>
			<View class="tutorialView" id="view2">
				<Label id="lbl2">Page 2</Label>
			</View>
			<View class="tutorialView" id="view3">
				<Label id="lbl3">Page 3</Label>
			</View>
		</ScrollableView>
		<View id="pagingControl">
			<Button id="skip" backgroundColor="transparent">PASSER</Button>
			<View id="dotView">
				<Label id="dot1" class="dot"/>
				<Label id="dot2" class="dot"/>
				<Label id="dot3" class="dot"/>
			</View>
			<Button id="done" title="SUIVANT" backgroundColor="transparent"/>
		</View>
	</Window>
</Alloy>
```

#### Controller file
 
```javascript
 var pageCount = 0;
/**
 * 
 * @param {String}  _args.backgroundColor
 * @param {String}  _args.fontColor
 * @param {Array}   _args.content : liste des views à ajouter dans la scrollableView
 */
exports.init = function(_args){
    $.tutorial.backgroundColor = _args.backgroundColor || "#ffffff";
    $.pagingControl.backgroundColor = _args.backgroundColor || "#ffffff";
    $.view1.backgroundColor = _args.backgroundColor || "#000";
    $.view2.backgroundColor = _args.backgroundColor || "#000";
    $.view3.backgroundColor = _args.backgroundColor || "#000";
    $.lbl1.color = _args.fontColor || "#000";
    $.lbl2.color = _args.fontColor || "#000";
    $.lbl3.color = _args.fontColor || "#000";
    $.dot1.text = Alloy.CFG.icon.enableDot;
    $.dot2.text = Alloy.CFG.icon.disableDot;
    $.dot3.text = Alloy.CFG.icon.disableDot;
    pageCount = _args.content ? _args.content.length : 0;
};

exports.open = function(){
    $.tutorial.open();
    $.container.setCurrentPage = 0;
    refreshPagingControl(0);
}
;
exports.close = function(){$.tutorial.close();};

function refreshPagingControl(index){
    switch(index){
        case 0 :
            $.dot1.text = Alloy.CFG.icon.enableDot;
            $.dot2.text = Alloy.CFG.icon.disableDot;
            $.dot3.text = Alloy.CFG.icon.disableDot;
            $.skip.visible = true;
            $.done.title = "SUIVANT";
            break;
        case 1 :
            $.dot1.text = Alloy.CFG.icon.disableDot;
            $.dot2.text = Alloy.CFG.icon.enableDot;
            $.dot3.text = Alloy.CFG.icon.disableDot;
            $.skip.visible = true;
            $.done.title = "SUIVANT";
            break;
        case 2 :
            $.dot1.text = Alloy.CFG.icon.disableDot;
            $.dot2.text = Alloy.CFG.icon.disableDot;
            $.dot3.text = Alloy.CFG.icon.enableDot;
            $.skip.visible = false;
            $.done.title = "TERMINER";
            break;
    }
};

$.tutorial.addEventListener('open', function(){
    if(OS_ANDROID){
        $.tutorial.activity.actionBar.displayHomeAsUp = false;
        $.tutorial.activity.actionBar.icon = "";
        $.tutorial.activity.actionBar.logo = "";
        $.tutorial.activity.actionBar.title = "";
    }
});

$.skip.addEventListener('click', function(){$.tutorial.close();});

$.container.addEventListener('scrollend', function(e){refreshPagingControl(e.source.currentPage);});

$.done.addEventListener('click', function(){
    var children = $.container.getViews();
    
    if(children.length > 0){
        
        // Page courante n'est pas la dernière page ?
        if($.container.currentPage != children.length-1){
            // Non, on scroll à la suivante
            $.container.moveNext();
            refreshPagingControl($.container.currentPage);
        } else {
            // dernière page, on ferme
            $.tutorial.close();
        }
    } else {
        $.tutorial.close();
    }
});
```

#### Style file

``` 
 "Window": {
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
	//backgroundColor: "#fff",
	top: 10,
	height: 20,
	width: 15,
	left: 5,
	right: 5,
	font: {
		fontFamily: "symbol",
		fontSize: "12sp"
	},
	color: "#ffffff"
}
"#skip": {
	left: 15,
	height: Ti.UI.FILL,
	color: "#ffffff",
	font: {
		fontSize: "12sp"
	}
}

"#done": {
	right: 15,
	height: Ti.UI.FILL,
	color: "#ffffff",
	font: {
		fontSize: "12sp"
	}
}
```
