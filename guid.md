##GUID generation

**guidLib.js**
```
exports.generate = function(){
        var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
             return v.toString(16);
        });
        return guid;
};
```

**Usage**
```
var GUID = require("guidLib");
var myGuid = GUID.generate();

// Note : the returned value is a string, so if you want to use it as a primary key in Alloy Model, declare your primary key as follow :
"guid": "TEXT primary key"
```
