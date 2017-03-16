## Infinite listView scrolling using markers

This snippet show how to load listView data with marker (with or without rupture)
In this example we are going to load Person's list (10 to 10) based on the Alloy model (id(auto increment), firstName, lastName).
The list will be ordered on firstName with rupture on the first letter.

#### View file

```xml
<Alloy>
        <Window backgroundColor="#e6e6e6">
                <View id="container">
                        <ListView id="personneListe" defaultItemTemplate="personneTemplate">
                                <Templates>
                        <ItemTemplate name="personneTemplate">
                                                <Label bindId="nomId" id="nom"/>
                                                <Label bindId="prenomId" id="prenom"/>
                                        </ItemTemplate>
                    </Templates>
                    <ListSection id="personneSection"/>
                        </ListView>
                </View>
        </Window>
</Alloy>
```

#### Controller file

```javascript
var args = arguments[0] || {};
var position = 0, currentLetter;


function init(){
       getPersonne(0);
};


/**
 * Query in database to get the next 10 persons from the _position parameter
 * @param {Object} _position
 */
function getPersonne(_position){
        var data = [];
        _position = _position ? _position : 0;

        var requete = "SELECT id, nom,prenom FROM Personne ORDER BY nom ASC LIMIT 10 OFFSET " + _position;

        var collection = Alloy.createCollection("Personne");
        collection.fetch({query: requete});

        for(var i = 0 ; i < collection.length; i++){
                var dbData = collection.at(i);
                data.push({
                        nom: dbData.get("nom"),
                        prenom: dbData.get("prenom"),
                        id: dbData.get("id")
                });
        }

        fillList(data);
};


/**
 * Get the last added section in the listview
 */
function getLastSection(){
        var sectionList = $.personneListe.sections;
        var sectionCount = sectionList.length;
        var lastSection = sectionList[sectionCount - 1];

        return lastSection;
};

/**
 * Fill the listView with dataset _data parameter
 * @param {Object} _data
 */
function fillList(_data){
        var items = [];

        for(var i = 0 ; i < _data.length; i++){

                var letter = _data[i].nom.charAt(0);        // First letter of person's name

                // First loop iteration ?
                if(typeof(currentLetter) == "undefined"){
                           currentLetter = letter;

                           // Create first section
                           var letterSection = createSection(letter);
                           $.personneListe.appendSection(letterSection);

                           // Create new current item
                           var item = createItem(_data[i]);
                           items.push(item);

                   } else {
                           // Section change ?
                           if(letter !== currentLetter){

                                   // Yes, add items to section
                                   var last = getLastSection();
                                   last.appendItems(items);

                                   // Clear item list
                                   items = [];

                                   // New letter
                                   currentLetter = letter;

                                   // Create new section
                                   var letterSection = createSection(letter);
                                   $.personneListe.appendSection(letterSection);

                                   // Create new current item
                                   var item = createItem(_data[i]);
                                   items.push(item);

                           } else {

                                   // Last item of dataSet ?
                                   if(_data.length === parseInt(i) + 1){
                                           // Yes, create it
                                           var item = createItem(_data[i]);
                                           items.push(item);

                                           // Add item to section
                                           var last = getLastSection();
                                           last.appendItems(items);

                                           // Clear item list
                                           items = [];
                                   } else {
                                           // Create new current item
                                           var item = createItem(_data[i]);
                                           items.push(item);
                                   }
                           }
                   } // First loop iteration ?

        } // Loop end

        // Add last item in the list
        if(items.length > 0){

            // Add item to the section
            var last = getLastSection();
            last.appendItems(items);

            // clear item list
            items = [];
    }
        // Add marker
        if(_data.length > 0){
                addListMarker();
        }
};



/**
 * Create listView section
 * @param {Object} _letter
 */
function createSection(_letter){

        var section  = Ti.UI.createListSection({
        headerView: createHeaderView({
            text: _letter
        })
    });

    return section;
};

/**
 * Create the custom view used for the new listView section
 * @param {Object} _args
 */
function createHeaderView(_args){
        var view = Ti.UI.createView({
        width:Ti.UI.FILL,
        height: 40,
        backgroundColor: "#e3e3e3"
    });

    var label = Ti.UI.createLabel({
        text: _args.text.toUpperCase(),
        left: 10,
        right: 10,
        height:Ti.UI.FILL
    });

    view.add(label);
    return view;
};

/**
 * Create listView item
 * @param {Object} _item
 */
function createItem(_item){
        var item;

    if(_item){
        item = {
            nomId: {
                text: _item.nom + " " + _item.prenom
            },
            properties :{
                itemId: _item.id
            }
        };
    }

    return item;
};

/**
 * Add Marker to the ListView
 */
function addListMarker(){

    var sectionList = $.personneListe.sections;
    var sectionCount = sectionList.length;
    var lastSection = sectionList[sectionCount - 1];
    var itemsList = lastSection.items;
    var nbItemsLastSection = itemsList.length;
    $.personneListe.setMarker({sectionIndex: (sectionCount - 1), itemIndex: (nbItemsLastSection - 1) });
};

$.Liste.addEventListener('open', function(){
        init();
});

// marker event listener
$.personneListe.addEventListener('marker', function(e) {
    position += 10;  // Marker position increase
    getPersonne(position);
});
```

#### Case of listview without rupture

Just change **fillList** function to :
```javascript
function fillList(_data){

    for(var i = 0 ; i < _data.length; i++){
        var item = createItem(_data[i]);
        $.personneSection.appendItems(item);
    }

     addListMarker();
};
```
