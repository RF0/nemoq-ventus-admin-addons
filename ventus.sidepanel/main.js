$(document).ready(function(){
    $( function() {
        const timeCells = $("div[data='serviceCategoryGroups']");   
        
        //create array of all timeCells     
        timeCellObjects = [];
        
        //this object is used to store unique SCGs, where name is the unique key
        uniqueScgs = {};

        //iterate each SCG for this timeCell
        timeCells.each(function(index, value) {
            const timeCell = timeCells[index];
            const fromTime = $(timeCell).children("input").eq(4).val();

            const timeCellObject = {
                fromTime,
                scgs: []
            }
            
            //iterate each serviceCategoryGroup in a timecell
            const scgs = $(timeCell).find("tr[data-function='serviceCategoryGroup']");
            scgs.each(function(index, value) {
                const scg = scgs[index];
                const scgName = $(scg).children("td").first().text();
                //grab the zero-indexed second td which is the number of bookings
                const scgBookings = $(scg).children("td").eq(1).text();
                //grab the zero-indexed third td which is the number of reserved slots
                const scgReserved = $(scg).children("td").eq(2).find("input").val();
                timeCellObject.scgs.push({
                    name: scgName,
                    bookings: Number(scgBookings),
                    reserved: Number(scgReserved),
                });
                if (!uniqueScgs.hasOwnProperty(scgName)) {
                    uniqueScgs[scgName] = {
                        name: scgName,
                        bookings: Number(scgBookings),
                        reserved: Number(scgReserved)
                    }
                }else{
                    uniqueScgs[scgName].bookings += Number(scgBookings);
                    uniqueScgs[scgName].reserved += Number(scgReserved);
                }
                if (Number(scgReserved) > Number(scgBookings) && !uniqueScgs[scgName].firstAvailableDate)
                    uniqueScgs[scgName].firstAvailableDate = fromTime;
            });
            timeCellObjects.push(timeCellObject);
        });
        /**Insert table on top of page, styled using boostrap v2.3.2 which is used by Ventus */
        $("<table class='table table-striped table-bordered table-condensed' id='scgStats'><thead><tr id='scgStatsHeader'><th scope='col'>Group</th><th scope='col'>Antall bookinger</th><th scope='col'>Reserved</th><th scope='col'>Første ledige</th></tr></thead><tbody id='scgStatsBody'></tbody></table>").insertBefore("form");
        for (const scg in uniqueScgs) {
            const firstAvailableDate = uniqueScgs[scg].firstAvailableDate ? uniqueScgs[scg].firstAvailableDate : "Ingen";
            $("#scgStatsBody").append("<tr><th scope='row'>"+uniqueScgs[scg].name+"</td><td>"+uniqueScgs[scg].bookings+"</td><td>"+uniqueScgs[scg].reserved+"</td><td>"+firstAvailableDate+"</td></tr>");
        }
    });
    
});