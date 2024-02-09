var columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA'];
const maxActivities = 9;

function getSpreadSheetBook(){
    var propertyService = PropertiesService.getScriptProperties();
    var sheetId = propertyService.getProperty("sheetId");
    var ss = SpreadsheetApp.openById(sheetId);
    var sheetBook = ss.getSheetByName("New Data");
    return sheetBook;
}

function getEntries(sheetBook, activityId){
    var entries = [];
    var rangeId = columns[activityId * 3] + "3:" + columns[activityId * 3 + 1];
    console.log("RangeId: " + rangeId)
    var range = sheetBook.getRange(rangeId).getValues();
    for (var i = 0; i < range.length; i++) {
      if(range[i][0].length === 0)
        continue;
      entries.push({
        start: range[i][0] !== "" ? range[i][0] : undefined,
        stop: range[i][1] !== "" ? range[i][1] : undefined,
      })
    }
    return entries;
}