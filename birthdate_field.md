##Snippet for creating birthdate field

####View file
```
<View class="lineView" id="birthdateView">
	<Label class="standardLabel">Né(e) le</Label>
	<View layout="horizontal" right="5" width="Ti.UI.SIZE">
		<TextField id="day" class="birthday" hintText="JJ" maxLength="2"/>
		<Label height="Ti.UI.FILL" text="/"/>
		<TextField id="month" class="birthday" hintText="MM" maxLength="2"/>
		<Label height="Ti.UI.FILL" text="/"/>
		<TextField id="year" class="birthday" hintText="AAAA" maxLength="4"/>
	</View>
</View>
```

####Style tss file
```
".birthday": {
	backgroundColor:"#ffffff",
	width:Ti.UI.SIZE,
	height:Ti.UI.FILL,
	textAlign: 'right',
	returnKeyType:Titanium.UI.RETURNKEY_NEXT,
	keyboardType:Titanium.UI.KEYBOARD_NUMBER_PAD,
	font: {
		fontFamily: 'OpenSans-Regular',
		fontSize: "16sp"
	}
}
```

####Controller file

```
$.day.addEventListener('focus', function(e){$.day.setSelection(0,0); });
$.day.addEventListener('change', function(e){
    Ti.API.info("SELECTION",e.source.getSelection().length + " / " + e.source.getSelection().location);
    if(e.source.value.length == 2 && e.source.getSelection().location == 2){
        $.month.setSelection(0,0);
        $.month.focus();
    }
});

$.month.addEventListener('change', function(e){
    if(e.source.value.length == 2 && e.source.getSelection().location == 2){
        $.year.setSelection(0,0);
        $.year.focus();
    }
});
$.month.addEventListener('focus', function(e){$.month.setSelection(0,0); });

$.year.addEventListener('focus', function(e){$.year.setSelection(0,0);});

// Get the value to save it in database 
// var dateNaissance = $.day.value !== "" && $.month.value !== "" && $.year.value !== "" ? Moment($.day.value+$.month.value+$.year.value,"DDMMYYYY").format("YYYYMMDD") : "",
```
