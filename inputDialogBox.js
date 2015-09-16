/**
 * This document show how to create input dialogBox on Android by using androidView property of createAlertDialog native function
 */

// view textInput.xml
<Alloy>
        <View id="textSaisie" class="container">
                <TextArea id ="saisie"/>
        </View>
</Alloy>

// style textInput.tss
".container" : { },
"#textSaisie" : { },
"#saisie" : {
        width: Ti.UI.FILL,
        left: 10,
        bottom: 10,
        right: 10,
        height: 120,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "#b5b5ba"        ,
        backgroundColor: "#36373a",
        keyboardType: Titanium.UI.KEYBOARD_DEFAULT
}

// controller textInput.js
var args = arguments[0] || {};
$.saisie.value = args.saisieEnCours;


function openDialog() {
        var dialog = Ti.UI.createAlertDialog({
                androidView: Alloy.createController('textInput',{saisieEnCours: "<Text to display if value already exists>"}).getView(),
                message: "<Your message>",
                buttonNames: ["OK", "Cancel"]
        });

        dialog.addEventListener("click", function(e) {
        // Search value
        var nPosChildView = arraySearch("saisie",e.source.androidView.children);
                if(nPosChildView >= 0) {
                        //e.source.androidView.children[nPosChildView].value // Get the input value
                }
        });
        // Show dialogBox
        dialog.show();
}

// Specific search function on id attribute
function arraySearch(_searchID, _myArray){
    for (var i=0; i < _myArray.length; i++) {
        if (_myArray[i].id === _searchID) {
            return i;
        }
    };
    return -1;
};
