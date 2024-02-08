var sheetId = "<SheetId>";



var columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U'];
const maxActivities = 9;

function getSpreadSheetBook(){
    var ss = SpreadsheetApp.openById(sheetId);
    var sheetBook = ss.getSheetByName("New Data");
    return sheetBook;
}

function getEntries(sheetBook, activityId){
    var entries = [];
    var range = sheetBook.getRange(columns[activityId * 3] + "3:" + columns[activityId * 3 + 1]).getValues();
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