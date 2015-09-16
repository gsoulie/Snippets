/**
 * In this document we are going to see how to create Alloy Migration in your Titanium project. Alloy Migration gives informations to your app on the Alloy Model version. It
 * provides initial Alloy Model structure state before migration and new state after migration.
 * For all Alloy Model structure modification in your app, you need to create Alloy Migration if your application is already deployed (on store or device).
 * If you don't create Alloy Migration, your app is going to crash for the next use.
 */

/**
 * In this example, we are going to add new column in Book Alloy Model
 */

// Fisrt, consider the following Book Model :

// Book.js
exports.definition = {
    config: {
        columns: {
            "isbn": "TEXT primary key",
            "titre": "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "Book",
            idAttribute:"isbn"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            // extended functions and properties go here
        });

        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {
            // extended functions and properties go here
        });

        return Collection;
    }
};


/**
 * Step 2 : add new "author" column to Book model
 */

// Book.js
exports.definition = {
    config: {
        columns: {
            "isbn": "TEXT primary key",
            "titre": "TEXT",
            "author": "TEXT"
        },
        ...
};

/**
 * Step 3 : Alloy Migration creation
 */

/* Right click on your project --> new --> Alloy migration
 * You're invite to enter the Migration file's name. You must use the same name that the associated Alloy Model, in our case "Book".
 * Next you will see new folder "migration" in your project three, containing the migration's new file named like "201502041121584_Book.js"
 */

// Open the migration file, should contain :
migration.up = function(db) {

};

migration.down = function(db) {

};

// The migration.up function describe the Alloy Model updgrade afeter migration play. And migration.down describe the Alloy Model initial state before migration playing

/**
 * Step 4 : Fill the migration file
 */

migration.up = function(migrator) {
    // We want to add "author" column after migration
    migrator.db.execute('ALTER TABLE ' + migrator.table + ' ADD COLUMN author TEXT;');
};

migration.down = function(migrator) {
    // State of Alloy model before migration
    var db = migrator.db;
    var table = migrator.table;
    db.execute('CREATE TEMPORARY TABLE book_backup(alloy_id,isbn,titre);');
    db.execute('INSERT INTO book_backup SELECT alloy_id,isbn,titre FROM ' + table + ';');
    migrator.dropTable();
    migrator.createTable({
        columns: {
            "isbn": "TEXT",
            "titre": "TEXT"
        },
    });
    db.execute('INSERT INTO ' + table + ' SELECT alloy_id,isbn,titre FROM book_backup;');
    db.execute('DROP TABLE book_backup;');
};

/**
 * migration.down explaination
 * In this function, we are going to create tempory table which contains the initial structure of Book model.
 * Next, we delete the current Book Model to free data and we immedialty recreate it with the content of the tempory table.
 * Finally we delete the tempory table
 */


/*
 * ---------------------------------- OTHER EXAMPLE ----------------------------------------
 * new table creation
 */

// Model File creation
exports.definition = {
        config: {
                columns: {
                    "id": "integer primary key autoincrement",
                    "guid": "text",
                    "type": "integer",
                    "message": "text"
                },
                adapter: {
                        type: "sql",
                        collection_name: "ExportTemp",
                        idAttribute: "id"
                }
        },
        extendModel: function(Model) {
                _.extend(Model.prototype, {
                        // extended functions and properties go here
                });

                return Model;
        },
        extendCollection: function(Collection) {
                _.extend(Collection.prototype, {
                        // extended functions and properties go here
                });

                return Collection;
        }
};


// Migration
migration.up = function(migrator) {
        migrator.db.execute('CREATE TABLE '+ migrator.table + ' (alloy_id,guid,type,message)');
};

migration.down = function(migrator) {
        migrator.db.execute('DROP TABLE ' + migrator.table);
};
