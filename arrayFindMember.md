## Find element in complex array

**note:** you can find similar functions in underscoreJS lib or JQuery but it can be more light to import this only function to your project
 
```javascript
/**
 *@param{String}    _searchID : value to find
 *@param{String}    _myArray : array
 *@param{String}    _rubID : specific attribute of the reseach
 */
function arraySearch(_searchID, _myArray, _rubID){
    if(!_rubID) {_rubID = "id"; } //default search on "id" member
    for (var i=0; i < _myArray.length; i++) {
        if (eval("_myArray[i]." + _rubID) === _searchID) {
            return i;
        }
    };
    return -1;
};
```

Or other method

```javascript
var index = _.indexOf(_.pluck(myArray,'guid'), myGuid);
```
### Sort object array

```javascript
function predicateBy(prop){
   return function(a,b){
      if( a[prop] > b[prop]){
          return 1;
      }else if( a[prop] < b[prop] ){
          return -1;
      }
      return 0;
   }
}

//Usage
yourArray.sort( predicateBy("age") );
yourArray.sort( predicateBy("name") );
```
