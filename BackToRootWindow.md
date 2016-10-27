#Back to root window

##Use case

We consider that we have a main controller which is a TabGroup with 2 or 3 tabs. Then, by navigating, we open many other modal window. Finally, we want to close all opened window and return on the main Tabgroup.

##Solution

Use the code below to return on the main TabGroup

```javascript
//close TabGroup
Alloy.Globals.mainTab.close();

//other callback stuff here...

//open the main TabGroup
Alloy.createController("Main"); 
```

**Main.js**
```javascript
Alloy.Globals.mainTab = $.Main;
```
