This document show how to use Android material theme in Alloy project.

Note that using material design is available since Android 5.0. To use it, follow instructions bellow :

- Updating your Titanium SDK to 3.4.0 minimum.
- Target Android SDK 5.0 (API 21) in your tiapp.xml file
- Create custom theme from native AppCompat theme

**tiapp.xml configuration**
```
...
<android xmlns:android="http://schemas.android.com/apk/res/android">
      <manifest>
            <application android:theme="@style/monTheme"/>
            <uses-sdk android:minSdkVersion="14"/>
            <uses-sdk android:targetSdkVersion="21"/>
       </manifest>
</android>
...
```

**Custom theme creation**

First, create monTheme.xml file in /platform/android/res/ folder of your project. Now let's create custom theme with this file like this example :

```
<?xml version="1.0" encoding="utf-8"?>
<resources>
<style name="monTheme" parent="@style/Theme.AppCompat">

<!-- status bar color -->
<item name="colorPrimaryDark">#1976D2</item>

<!-- tabgroup color -->
<item name="colorPrimary">#2196F3</item>

<item name="colorControlNormal">#BBDEFB</item>

<!-- tabGroup underline color -->
<item name="colorAccent">#FFFFFF</item>

<!-- menu animation color -->
<item name="colorControlHighlight">#BBDEFB</item>

<!-- switch disable color -->
<item name="colorSwitchThumbNormal">#BDBDBD</item>

<!-- switch enable color -->
<item name="colorControlActivated">#FFCC00</item>

<!-- bottom action bar color -->
<item name="android:navigationBarColor">#000000</item>

<!-- remove tabGroup dividers-->
<item name="android:actionBarDivider">[couleur du tabGroup]</item>

<!-- DatePicker style override -->
<item name="android:datePickerDialogTheme">@style/MyDatePickerDialogTheme</item>

<!-- TimePicker style override -->
<item name="android:timePickerDialogTheme">@style/MyTimePickerDialogTheme</item>
                
</style>
<style name="monTheme.NoActionBar" parent="@style/Theme.AppCompat">
        <!-- AppCompat Compatibility -->
        <item name="windowActionBar">false</item>
        <item name="windowNoTitle">true</item>
</style>
<style name="MyDatePickerDialogTheme" parent="android:Theme.Material.Light.Dialog">
        <item name="android:colorAccent">@color/mainColor</item>
        <item name="android:datePickerStyle">@style/MyDatePickerStyle</item>
</style>
<style name="MyTimePickerDialogTheme" parent="android:Theme.Material.Light.Dialog">
         <item name="android:colorAccent">@color/mainColor</item>
         <item name="android:timePickerStyle">@style/MyTimePickerStyle</item>
</style>
<style name="MyDatePickerStyle" parent="@android:style/Widget.Material.Light.DatePicker">
          <item name="android:headerBackground">@color/mainColor</item>
</style>
<style name="MyTimePickerStyle" parent="@android:style/Widget.Material.Light.TimePicker">
          <item name="android:headerBackground">@color/mainColor</item>
</style>
</resources>
```

**Warning**

**colorAccent** and **colorControlActivated** properties can't be both used. In this case, **colorControlActivated** override **colorAccent** property. 
This, create impact on current tab underline color, searchbar color, loading color and focused field.

To avoid this issue, you need to proceed as :

**1 - Define colorControlActivated (for the switchs style)**

**2 - Don't define colorAccent property in the android xml theme file**

**3 - Create new xml theme file to override tabGroup style**

Create new xml file (like tab_bar_barckground.xml) in platform/android/res/drawable folder of your project

Fill the xml file like below :

```
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
         <item android:drawable="@android:color/transparent" android:state_focused="false" android:state_pressed="false" android:state_selected="false"/>
        <item android:state_focused="false" android:state_pressed="false" android:state_selected="true">
                <layer-list xmlns:android="http://schemas.android.com/apk/res/android">
                        <item>
                            <shape android:shape="rectangle" >
                                <solid android:color="#ffffff" />
                                <padding android:bottom="2dp" />
                            </shape>
                        </item>
                        <item>
                            <shape android:shape="rectangle" >
                                <solid android:color="#00adef" />
                            </shape>
                        </item>
                </layer-list>
        </item>
</selector>
```

**4 - Put the new reference in the main theme file** platform/android/res/values/monTheme.xml

```
<?xml version="1.0" encoding="utf-8"?>
<resources>
<style name="monTheme" parent="@style/Theme.AppCompat">
<!-- other properties definitions : colorControlActivated etc... -->
...
<!-- tabGroup override to customize underline color -->
                <item name="android:actionBarTabStyle">@style/myApp.ActionBar.TabView</item>
                <item name="actionBarTabStyle">@style/myApp.ActionBar.TabView</item> <!-- pour compatibilité -->
</styles>
<style name="myApp.ActionBar.TabView" parent="@style/Widget.AppCompat.ActionBar.TabView">
            <item name="android:background">@drawable/tab_bar_background</item>
            <item name="background">@drawable/tab_bar_background</item>
</style> 
```
