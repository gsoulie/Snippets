## Screen stack managing

This snippet show how to use screen's stack to close all opened screen (when switching tab on tabGroup for example)
 
#### Step 1 - create global function "unstackScreens" in your alloy.js file

```javascript
Alloy.Globals.unstackScreens = function(_screensStack) {
        if(OS_IOS){

                if(_screensStack.length > 0){
                        for (var screen in _screensStack) {
                                if(typeof(_screensStack[screen]) != 'undefined'){
                                        _screensStack[screen].close();
                                        _screensStack[screen] = null;
                                }
                        }
                        Alloy.Globals.windowStack = [];
                }
        }
};
Alloy.Globals.windowStack = [];
```

#### Step 2 - Add screen to the stack. Put the following code in the top of your controllers
```
Alloy.Globals.windowStack.push($.myController);
```

#### Step 3 - to clean the stack (when changing tab for example) put the following code :
```
Alloy.Globals.unstackScreens(Alloy.Globals.windowStack);
```
