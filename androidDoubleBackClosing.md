## Android double back to close application

Insert the code below in your main controller (tabGroup controller for example) :

```
var firstTap, secondTap;

$.Main.addEventListener("androidback",function(e){

        if(firstTap == null){
                firstTap = new Date();
                toast.show();
        }else{
                secondTap = new Date();
                var diff = (secondTap - firstTap)/1000;
                firstTap = new Date();
                if(diff < 1){ // checking for difference of 1 second between each back click to exit the app
                    toast.hide();
                    Ti.Android.currentActivity.finish();
                } else {
                    firstTap = new Date();
                    toast.show();
                }
         }

 });
```
