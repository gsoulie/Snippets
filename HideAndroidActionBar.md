##Hide Android ActionBar from specific window
 
First step consist in create custom style in Android style.xml file

```
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="Theme.NoActionBar" parent="@style/Theme.AppCompat">
        <item name="windowActionBar">false</item>
        <item name="windowNoTitle">true</item>
    </style>
    <style name="Theme.YesActionBar" parent="@style/Theme.AppCompat">
        <item name="windowActionBar">true</item>
        <item name="windowNoTitle">false</item>
    </style>
</resources>
```

Then, apply this custom theme in the specific window tss file
```
"Window[platform=android]" : {
    theme: 'Theme.NoActionBar'
}
```
