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
