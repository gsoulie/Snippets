/**
 * This document show how to reach the next field on iOS when returnKeyType : Titanium.UI.RETURNKEY_NEXT is out on iOS
 *
 * To solve this problem, there is a hook, it consist in create array containing the list of textField / textArea in the needed order.
 * Next, we are going to browse the list, and for each field we are going to update it's return event with the next field to focus
 */

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


// In your controller, add the following code :
nextField([$.firstName, $.lastName, $.addressField,$.cpField,$.cityField,$.emailField,$.assureFirstNameField,$.assureLastNameField]);

// Note : you need to set the returnKeyType parameter to Titanium.UI.RETURNKEY_NEXT in your tss (or xml) file
