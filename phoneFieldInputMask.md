## Phone field input mask

On Android, it's very difficult to use custom input masks like phone number field.
Generally the method consist to use textField change EventListener. But at this day, an issue is remaining on this point.
You can follow [JIRA ticket](https://jira.appcelerator.org/browse/TIMOB-16176)
On Android, when you update textField value on the change Event, the new value affectation call change event, creating an infinite loop
To avoid this bug, there is a hook...

#### Snippet to create french phone number (XX XX XX XX XX)

 ```javascript
function createPhoneField(){
	var field = Ti.UI.createTextField({
		hintText: 'Phone Number',
		color:'#000',
		left: 20,
		right: 20,
		height: 40,
		keyboardType: Titanium.UI.KEYBOARD_TYPE_NUMBER_PAD,
		returnKeyType: Titanium.UI.RETURNKEY_DONE,
		keyboardToolbarColor: '#e3e3e3',
		keyboardToolbarHeight: 40,
		backgroundColor: '#fff',
		value: ""		
	});
	
	if(OS_IOS){
		var phKeyboard = UI.returnButton({field:field});	// create return button on ios keyboard
		field.setKeyboardToolbar(phKeyboard);
		
		// Updating input mask during input
		field.addEventListener('change', function(e){
			var fieldValue = e.source.value;
		   	var temp = fieldValue.replace(/\ /g,'');	// removing all spaces
	
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
			// limit the input to 10 digit
			if(temp.length > 9){
			    e.source.value = temp.substr(0,2) + ' ' + temp.substr(2,2) + ' ' + temp.substr(4,2) + ' ' + temp.substr(6,2) + ' ' + temp.substr(8,2);
			}
		});
	} else {
		// Android, custom function on change event listener
		field.softKeyboardOnFocus = Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS;
		/**
		 * phone field value updating function to avoid infinite loop Android bug on onChange event
		 * see JIRA ticket : https://jira.appcelerator.org/browse/TIMOB-16176
		 */
		var AndroidInputMask = function(e){
	
				var fieldValue = e.source.value;
			   	var temp = fieldValue.replace(/\ /g,'');	// removing all spaces
				
				switch(temp.length){
					case 3: 
						// Remove listener to avoid infinite loop.
					     if (OS_ANDROID){e.source.removeEventListener('change', AndroidInputMask);}
						AndroidChangeFieldValue(e,temp.substr(0,2) + ' ' + temp.charAt(temp.length-1));
						break;
					case 5:
						// Remove listener to avoid infinite loop.
			     		if (OS_ANDROID){e.source.removeEventListener('change', AndroidInputMask);}
						AndroidChangeFieldValue(e,temp.substr(0,2) + ' ' + temp.substr(2,2) + ' ' + temp.charAt(temp.length-1)); 
						break;
					case 7:
						// Remove listener to avoid infinite loop.
			     		if (OS_ANDROID){e.source.removeEventListener('change', AndroidInputMask);}
						AndroidChangeFieldValue(e,temp.substr(0,2) + ' ' + temp.substr(2,2) + ' ' + temp.substr(4,2) + ' ' + temp.charAt(temp.length-1)); 
						break;
					case 9:
						// Remove listener to avoid infinite loop.
		     			if (OS_ANDROID){e.source.removeEventListener('change', AndroidInputMask);}
						AndroidChangeFieldValue(e,temp.substr(0,2) + ' ' + temp.substr(2,2) + ' ' + temp.substr(4,2) + ' ' + temp.substr(6,2) + ' ' + temp.charAt(temp.length-1));
						break;
				}
				
		// limit the input to 10 digit
                if(temp.length > 9){
                    if (OS_ANDROID){e.source.removeEventListener('change', AndroidInputMask);}
                    AndroidChangeFieldValue(e,temp.substr(0,2) + ' ' + temp.substr(2,2) + ' ' + temp.substr(4,2) + ' ' + temp.substr(6,2) + ' ' + temp.substr(8,2));
                }
		};
		
		var AndroidChangeFieldValue = function(e,_value){
			e.source.value = _value;
     
		     //Put the cursor in the end of the value in the textfield
		     e.source.setSelection(e.source.value.length, e.source.value.length);	
		     
		     //Add the event 'change'.
		     setTimeout(function() {e.source.addEventListener('change', AndroidInputMask);}, 100);
		};
		
		field.addEventListener('change',AndroidInputMask);
	}

	return field;
};
```
