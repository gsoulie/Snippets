##Skip to next field on iOS

Before **Titanium.UI.RETURNKEY_NEXT** property is available on iOS, the hook consist in create array containing the list of textField / textArea in the needed order.
Then, we are going to browse the list, and for each field we are going to update it's return event with the next field to focus

```
function nextField (controllers) {
    if (OS_IOS) {
        for(var i in controllers) {
            var current = controllers[i], nextIndex = parseInt(i)+1;
            var nextController = controllers.length > nextIndex ? controllers[nextIndex] : null;

            current.nextField = nextController;
            current.addEventListener('return', function(){
                if (this.nextField) {
                    this.nextField.focus();
                } else {
                    this.blur();
                }
            });
        }
    }
};
```

**Usage in controller file**
```
nextField([$.firstName, $.lastName, $.addressField,$.cpField,$.cityField,$.emailField,$.assureFirstNameField,$.assureLastNameField]);
```

**Note:** you need to set the ```returnKeyType``` parameter to ```Titanium.UI.RETURNKEY_NEXT``` in your tss (or xml) file
