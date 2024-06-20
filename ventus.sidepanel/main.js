$(document).ready(function(){
    $( function() {
        const serviceCategoryGroups = $("div[data='serviceCategoryGroups']");
        serviceCategoryGroups.each(function(index, value) {
            value.prev('h3')
        })
        console.log(serviceCategoryGroups);
    } );
        
});

