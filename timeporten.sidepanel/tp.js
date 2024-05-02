$(document).ready(function(){
    $( function() {
        $("table.timetable").selectable({
            filter: "div.timecell",
            tolerance: "touch",
            selected: function(event, ui) {
                ui.selected.click();
            },
            unselected: function( event, ui ) {
                ui.unselected.click();
            },
            cancel: "img"
      } );
    });
});

