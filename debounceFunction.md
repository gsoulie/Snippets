##Mutliple click preventing

Function to prevent multiple click fireing events

```
function debounce(func, threshold, execAsap) {
  var timeout;

  return function debounced () {
    var obj = this, args = arguments;
    function delayed () {
      if (!execAsap)
      func.apply(obj, args);
      timeout = null;
    };

    if (timeout)
    clearTimeout(timeout);
    else if (execAsap)
    func.apply(obj, args);

    timeout = setTimeout(delayed, threshold || 100);
  };
};
```

####Usage

```
$.listview.addEventLisntener('itemclick',debounce(function(e){
  some code here ...
  },500));
```
