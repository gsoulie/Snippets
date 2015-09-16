/**
 * This document sho how to find an element on a complex array.
 * note : you can find similar functions in underscoreJS lib or JQuery but it can be more light to import this only function to your project
 */

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
