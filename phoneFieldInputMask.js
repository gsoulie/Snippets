/**
 * On Android, it's very difficult to use custom input masks like phone number field.
 * Generally the method consist to use textField change EventListener. But at this day, an issue is remaining on this point.
 * You can follow JIRA ticket on : https://jira.appcelerator.org/browse/TIMOB-16176
 * On Android, when you update textField value on the change Event, the new value affectation call change event, creating an infinite loop
 * To avoid this bug, there is a hook...
 */


/**
 * Create textField
 */
var field = Ti.UI.createTextField({
		hintText: 'Numéro',
		color:'#000',
		left: 20,
		right: 20,
		height: 40,
		keyboardType: Titanium.UI.KEYBOARD_NUMBER_PAD,
		returnKeyType: Titanium.UI.RETURNKEY_DONE,
		keyboardToolbarColor: Alloy.Globals.grey,//Alloy.CFG.colors.windowGrey,
		keyboardToolbarHeight: 40,
		backgroundColor: '#fff'
	});

/**
 * Create phone mask (french phone number in this example XX XX XX XX XX)
 */
function createPhoneField(){
	field.value = "";

	if(OS_IOS){
		// Update input mask during the input
		field.addEventListener('change', function(e){
			var fieldValue = e.source.value;
		   	var temp = fieldValue.replace(/\ /g,'');	// Remove all spaces

			switch(temp.length){
				case 3:
					e.source.value = temp.substr(0,2) + ' ' + temp.charAt(temp.length-1);
					break;
				case 5:
					e.source.value = temp.substr(0,2) + ' ' + temp.substr(2,2) + ' ' + temp.charAt(temp.length-1);
					break;
				case 7:
					e.source.value = temp.substr(0,2) + ' ' + temp.substr(2,2) + ' ' + temp.substr(4,2) + ' ' + temp.charAt(temp.length-1);
					break;
				case 9:
					e.source.value = temp.substr(0,2) + ' ' + temp.substr(2,2) + ' ' + temp.substr(4,2) + ' ' + temp.substr(6,2) + ' ' + temp.charAt(temp.length-1);
					break;
			}
		});
	} else {
		// Android, custom function on change event listener
		field.softKeyboardOnFocus = Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS;
		field.addEventListener('change',AndroidInputMask);
	}

	return field;
};

/**
 * Custom function to manage input mask on Android field
 */
function AndroidInputMask(){

		var fieldValue = field.value;
	   	var temp = fieldValue.replace(/\ /g,'');	// Remove all spaces

		switch(temp.length){
			case 3:
				// Remove listener to avoid infinite loop.
			     if (OS_ANDROID){field.removeEventListener('change', AndroidInputMask);}
				AndroidChangeFieldValue(temp.substr(0,2) + ' ' + temp.charAt(temp.length-1));
				break;
			case 5:
				// Remove listener to avoid infinite loop.
	     		if (OS_ANDROID){field.removeEventListener('change', AndroidInputMask);}
				AndroidChangeFieldValue(temp.substr(0,2) + ' ' + temp.substr(2,2) + ' ' + temp.charAt(temp.length-1));
				break;
			case 7:
				// Remove listener to avoid infinite loop.
	     		if (OS_ANDROID){field.removeEventListener('change', AndroidInputMask);}
				AndroidChangeFieldValue(temp.substr(0,2) + ' ' + temp.substr(2,2) + ' ' + temp.substr(4,2) + ' ' + temp.charAt(temp.length-1));
				break;
			case 9:
				// Remove listener to avoid infinite loop.
     			if (OS_ANDROID){field.removeEventListener('change', AndroidInputMask);}
				AndroidChangeFieldValue(temp.substr(0,2) + ' ' + temp.substr(2,2) + ' ' + temp.substr(4,2) + ' ' + temp.substr(6,2) + ' ' + temp.charAt(temp.length-1));
				break;
		}

};

/**
 * Update Android field's value
 */
function AndroidChangeFieldValue(_value){
	 field.value = _value;

     //Put the cursor in the end of the value in the textfield
     field.setSelection(field.value.length, field.value.length);

     //Add the event 'change'.
     setTimeout(function() {
          field.addEventListener('change', AndroidInputMask);
     }, 100);
};
