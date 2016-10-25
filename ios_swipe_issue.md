#iOS swipe issue on TabGroup

##Use case

In this case, we have a Main controller which is a tabgroup. Each tab contains a Window including a Listview, clicking on ListItem open a new Window.

##The issue

From main Tab,doing a swipe (left to right) before clicking on a ListItem will cause trouble on the navbar (making a mix between the main window navbar and the detail window) and freezing the app.

##The solution

To avoid this bug, add to your main Window tss file 

```css
Window[platform=ios]: {
  swipeToClose: false
}
```
