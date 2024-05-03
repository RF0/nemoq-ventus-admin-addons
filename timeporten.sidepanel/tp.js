$(document).ready(function(){
    $( function() {
        // make sure all time cells are selectable
        $("table.timetable").selectable({
            // cancel certain elements to make sure Ventus default behavior still works:
            // - clicking on image of red cross to remove time slot
            // - clicking on table header to select all time slots in column
            cancel: "img, th",
            // only timecells should be selectable
            filter: "div.timecell",
            // timecells should be selectable if they are partly inside the select lasso
            tolerance: "touch",
            selected: function(event, ui) {
                var el = $(ui.selected);
                // click the element to select it
                el.click();
            },
            selecting: function( event, ui ) {
                var el = $(ui.selecting);
                // we are not doing anything with this
            },
            unselected: function( event, ui ) {
                var el = $(ui.unselected);
                //this will not work with Ventus functionality that lets user selection persist
                //even if clicking outside selected area
                //el.click();
            }
      } );
    });
});

