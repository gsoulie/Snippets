#Extend Alloy collection

```javascript
exports.definition = {
	config: {
		columns: {
        "isbn": "TEXT",
        "title": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "RendezVous",
			idAttribute:"guid"
		},
		defaults: {
            "IKS":"",
            "IKP":"",
            "IKM":"",
            "indiceSeance":""
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
			updateRequest: function(_query) {
				var db = Ti.Database.open(this.config.adapter.db_name);
				db.execute(_query);
				db.close();
			},
			deleteAll : function() {
 
		        var collection = this;
		 
		        var sql = "DELETE FROM " + collection.config.adapter.collection_name;
		        db = Ti.Database.open(collection.config.adapter.db_name);
		        db.execute(sql);
		        db.close();
		 
		        collection.trigger('sync');
		 
	     	},
	     	deleteRecord : function(_opts) {
		        var collection = this;
		        var dbName = collection.config.adapter.db_name;
		        var table = collection.config.adapter.collection_name;
		        var columns = collection.config.columns;
		       
		        if(_opts.guid){
		       	
			        var sql = "DELETE FROM " + table + " WHERE guid = '" + _opts.guid + "'";
			
			        db = Ti.Database.open(dbName);
			        db.execute(sql);
			        db.close();
			        collection.trigger('sync');
		        }
          	},
	     	dropDB: function(){
                var db=Ti.Database.open(this.config.adapter.db_name);db.remove();
        }
		});

		return Collection;
	}
};```			
      
