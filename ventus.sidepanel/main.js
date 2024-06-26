$(document).ready(function(){
    $( function() {
        const timeCells = $("div[data='serviceCategoryGroups']");        
        timeCellObjects = [];
        uniqueScgs = {};
        //iterate each SCG for this timeCell
        timeCells.each(function(index, value) {
            const timeCell = timeCells[index];
            const timeCellMaxBookings = timeCell.dataset.maxbookings;
            const fromTime = $(timeCell).children("input").eq(4).val();
            const toTime = $(timeCell).children("input").eq(5).val();

            const timeCellObject = {
                maxBookings: timeCellMaxBookings,
                fromTime,
                toTime,
                scgs: []
            }
            
            //iterate each serviceCategoryGroup in a timecell
            const scgs = $(timeCell).find("tr[data-function='serviceCategoryGroup']");
            scgs.each(function(index, value) {
                const scg = scgs[index];
                const scgName = $(scg).children("td").first().text();
                //grab the second td which is the number of bookings
                const scgBookings = $(scg).children("td").eq(1).text();
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
        $("<table class='cell-border compact stripe' id='scgStats'><thead><tr id='scgStatsHeader'><td>Tjenestekategorigruppe</td><td>Bookede tider</td><td>Reserverte tider</td><td>Første tilgjengelig dato</td></tr></thead><tbody id='scgStatsBody'></tbody></table>").insertBefore("form");
        console.log(uniqueScgs);
        for (const scg in uniqueScgs) {
            console.log(uniqueScgs[scg]);
            $("#scgStatsBody").after("<tr><td>"+uniqueScgs[scg].name+"</td><td>"+uniqueScgs[scg].bookings+"</td><td>"+uniqueScgs[scg].reserved+"</td><td>"+uniqueScgs[scg].firstAvailableDate || ''+"</td></tr>");
        }
        

    });
    
});