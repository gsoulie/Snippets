/**
 * This document show how to create infinite scrollableView (using only 3 sub view) to display date in our example.
 * The scrollableView is composed with 3 view, the first to display the previous day, the second to display the current day and the third to display next day.
 * source : https://gist.github.com/dawsontoth/810171
 */



/**
 * We're going to create an infinite scrollable list. In this case, we're going to show a date. When you swipe left,
 * you'll see yesterday. Then the day before yesterday, and so on. Swiping right shows you tomorrow, and so on.
 */
var win = Ti.UI.createWindow({ backgroundColor: '#fff' });
var isAndroid = Ti.Platform.osname === 'android';
/**
 * Track where we are in the infinite scrollable views, and define how large of a step goes between each view.
 */
var currentDate = new Date(), msIntervalBetweenViews = 1000/*ms*/ * 60/*s*/ * 60/*m*/ * 24/*h*/;

/**
 * Create our UI elements.
 */
var scrollable = Ti.UI.createScrollableView({ currentPage: 1, showPagingControls: true, pagingControlHeight: 30 }),
        containers = [
            Ti.UI.createView({ backgroundColor:'#fdd', top: 0, right: 0, bottom: 0, left: 0 }),
            Ti.UI.createView({ backgroundColor:'#dfd', top: 0, right: 0, bottom: 0, left: 0 }),
            Ti.UI.createView({ backgroundColor:'#ddf', top: 0, right: 0, bottom: 0, left: 0 })
        ];
win.add(scrollable);
scrollable.views = containers;

/**
 * Loads data into the specified view based on the specified date.
 * @param view
 * @param date
 */
function loadView(view, date) {
    // empty out any children
    if (view.children) {
        for (var c = view.children.length - 1; c >= 0; c--) {
            view.remove(view.children[c]);
        }
    }
    // add new children
    var label = Ti.UI.createLabel({
        text: date.toLocaleDateString(),
        color: '#000',
        width:'auto',
        height:'auto'
    });
    view.add(label);
}

/**
 * Whenever we scroll, manipulate our views so that the user is back to viewing the "middle" view with a buffer view on
 * either side, then make sure the buffer views are actually loaded and ready to go.
 */
function scrollListener(evt) {
    // what is our current page?
    switch (evt.currentPage) {
        case 0: // scrolled to the left
            // so pop a view off the end, and put it at the start
            containers.unshift(containers.pop());
            if (isAndroid) {
                // temporarily remove our event listener (for Android's sake...)
                scrollable.removeEventListener('scrollend', scrollListener);
            }
            // reset the counter so we are back in the middle
            scrollable.currentPage = 1;
            // reset our views array
            scrollable.views = containers;
            if (isAndroid) {
                // now we can add the event listener again
                scrollable.addEventListener('scrollend', scrollListener);
            }
            // take a day from our currentDate
            currentDate.setDate(currentDate.getDate() - 1);
            // and now buffer load the view we reset
            loadView(containers[0], new Date(currentDate.getTime() - msIntervalBetweenViews));
            break;
        case 1:
            // they didn't go anywhere; should only happen the first time around
            break;
        case 2: // scrolled to the right
            // so shift a view off the start, and put it at the end
            containers.push(containers.shift());
            if (isAndroid) {
                // temporarily remove our event listener (for Android's sake...)
                scrollable.removeEventListener('scrollend', scrollListener);
            }
            // reset the counter so we are back in the middle
            scrollable.currentPage = 1;
            // reset our views array
            scrollable.views = containers;
            if (isAndroid) {
                // now we can add the event listener again
                scrollable.addEventListener('scrollend', scrollListener);
            }
            // add a day to our currentDate
            currentDate.setDate(currentDate.getDate() + 1);
            // and now buffer load the view we reset
            loadView(containers[2], new Date(currentDate.getTime() + msIntervalBetweenViews));
            break;
    }
}
scrollable.addEventListener('scrollend', scrollListener);

/**
 * Set up our initial views.
 */
loadView(containers[0], new Date(currentDate.getTime() - msIntervalBetweenViews));
loadView(containers[1], currentDate);
loadView(containers[2], new Date(currentDate.getTime() + msIntervalBetweenViews));

/**
 * That's it, we just need to open the window! Hope you enjoyed this.
 */
win.open();






/*******************************************************************
 * Sample from project
 **/
 
var position = 0, items = [];

var currentDate = new Date(), msIntervalBetweenViews = 1000/*ms*/ * 60/*s*/ * 60/*m*/ * 24/*h*/;
Ti.App.Properties.setString('rdvSelectedDate',Moment(currentDate).format("YYYYMMDD"));	// Maj de la properties contenant la date sélectionnée

var currentDateLabel, previousDateLabel, nextDateLabel, containers;


function init(){
    position = 0;
    items = [];

    currentDate = new Date(), msIntervalBetweenViews = 1000/*ms*/ * 60/*s*/ * 60/*m*/ * 24/*h*/;
    Ti.App.Properties.setString('rdvSelectedDate',Moment(currentDate).format("YYYYMMDD")); 

    // Current date view
    currentDateLabel = Ti.UI.createView({width: Ti.UI.FILL,height: Ti.UI.FILL});
    
    // previous date view
    previousDateLabel = Ti.UI.createView({width: Ti.UI.FILL,height: Ti.UI.FILL});
    
    // next date view
    nextDateLabel = Ti.UI.createView({width: Ti.UI.FILL,height: Ti.UI.FILL});
    
    // Initial content of ScrollableView
    containers = [previousDateLabel,currentDateLabel,nextDateLabel];

    $.dateScrollableView.setViews(containers);
    $.dateScrollableView.currentPage = 1;
    
    loadView(containers[0], Moment(new Date(currentDate.getTime() - msIntervalBetweenViews)).format("ddd D MMMM YYYY"));
    loadView(containers[1], Moment(currentDate).format("ddd D MMMM YYYY"));
    loadView(containers[2], Moment(new Date(currentDate.getTime() + msIntervalBetweenViews)).format("ddd D MMMM YYYY"));

    Ti.App.refreshCallback = function(){
        // do some stuff here
    };  
};


/**
 * Create current view label
 * 
 * @param {Object} 	view : current view
 * @param {date}	date : date to add
 */
function loadView(view, date) {
    // clear content
    if(view.children) {
        for (var c = view.children.length - 1; c >= 0; c--) {
            view.remove(view.children[c]);
        }
    }
    
    // Add new label
    var label = createDateView(date);
    view.add(label);
};

/**
 * Create date label
 * 
 * @param {String} _date : date to display
 */
function createDateView(_date){
    var dateLabel = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        font: {
            fontSize: '16sp',
            fontFamily: 'OpenSans-Regular'
        },
        color: "#000",
        text: _date,
        textAlign: 'center'
    });
    return dateLabel;
};

/**
 * Evenement scroll sur la zone de date
 * 
 * @param {Object}	evt : évenement
 */
function scrollListener(evt) {
	$.dateScrollableView.setBackgroundColor("transparent");	// background color reset
	
    //switch current page index
    switch (evt.currentPage) {
        case 0: // left scrolling
        	
            // positionning on the first position
            containers.unshift(containers.pop());
            if (OS_ANDROID) {
                // temporary remove scrollend event (usefull for Android)
                $.dateScrollableView.removeEventListener('scrollend', scrollListener);
            } else {
                $.dateScrollableView.setViews(containers);
            }
            // positionning on the middle view
            $.dateScrollableView.currentPage = 1;
            
            if (OS_ANDROID) {
                $.dateScrollableView.setViews(containers);
                // re-add scrollend event
                $.dateScrollableView.addEventListener('scrollend', scrollListener);
            }
           
          	// update current date -1 day
            currentDate.setDate(currentDate.getDate() - 1);
            // and now buffer load the view we reset
            loadView(containers[0], Moment(new Date(currentDate.getTime() - msIntervalBetweenViews)).format("ddd D MMMM YYYY",'fr'));
            
            break;
        case 1:
            break;
            
        case 2: // right scrolling
            // move the first view to put it at the end of the stack
            containers.push(containers.shift());
            if (OS_ANDROID) {
                // temporary remove scrollend event (usefull for android)
                $.dateScrollableView.removeEventListener('scrollend', scrollListener);
            } else {
                
                $.dateScrollableView.setViews(containers);
            }
            // positionning on the middle view
            $.dateScrollableView.currentPage = 1;
            
            if (OS_ANDROID) {
                $.dateScrollableView.setViews(containers);
                // re-add scrollend event
                $.dateScrollableView.addEventListener('scrollend', scrollListener);
            }
            
           	// current date +1 day
            currentDate.setDate(currentDate.getDate() + 1);
            
            // and now buffer load the view we reset
            loadView(containers[2], Moment(new Date(currentDate.getTime() + msIntervalBetweenViews)).format("ddd D MMMM YYYY",'fr'));
            
            break;
    }
    
    Ti.App.Properties.setString('rdvSelectedDate',Moment(currentDate).format("YYYYMMDD"));
    
    RefreshDataSet();
};
$.dateScrollableView.addEventListener('scrollend', scrollListener);

