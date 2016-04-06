##Hide custom photo from native gallery

The workthough consist to create emtpy file named .nomedia. Next, all photo files will be ignored during device scanning
 
```
var nomediaFile = Ti.Filesystem.getFile(myDirectory, '.nomedia'); // myDirectory is the directory where photos are created

/*nomediaFile.exists() && */nomediaFile.write('');
nomediaFile = null;
```
