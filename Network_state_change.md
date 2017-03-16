# Checking Network state change

```
// Add change event in main controller for example
Ti.Network.addEventListener('change', function(e) {
    Alloy.Globals.online = e.online;  // Global useful for checking connection all over the app
    Ti.API.info("info internet",JSON.stringify(e));
    
    if(e.online === false){
        // Stop data sync for example
    } else {
        // Continue data sync
    }
});
```

**TODO** 
Try to add change event in app.js or alloy.js for global event listening
