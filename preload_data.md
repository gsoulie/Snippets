#Preload data in your app

If you are using Alloy models, you can use a migration file to preload data in you're app like below :

```
app/migrations/20120610049877_book.js
var preload_data = [
	{title: 'To Kill a Mockingbird', author:'Harper Lee'},
	{title: 'The Catcher in the Rye', author:'J. D. Salinger'},
	{title: 'Of Mice and Men', author:'John Steinbeck'},
	{title: 'Lord of the Flies', author:'William Golding'},
	{title: 'The Great Gatsby', author:'F. Scott Fitzgerald'},
	{title: 'Animal Farm', author:'George Orwell'}
];
 
migration.up = function(migrator) {
    migrator.createTable({
        "columns":
        {
            "book": "TEXT",
            "author": "TEXT"
        }
    });
    for (var i = 0; i < preload_data.length; i++) { 
	    migrator.insertRow(preload_data[i]);
    }
};
 
migration.down = function(migrator) {
    migrator.dropTable();
};
```
