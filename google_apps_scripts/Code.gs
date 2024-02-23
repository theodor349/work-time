var columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA'];
const maxActivities = 9;

function testGetAll(){
  doGet({ parameter: { type: "get" } })
}

function getSpreadSheetBook(){
    var propertyService = PropertiesService.getScriptProperties();
    var sheetId = propertyService.getProperty("sheetId");
    var ss = SpreadsheetApp.openById(sheetId);
    var sheetBook = ss.getSheetByName("Data");
    return sheetBook;
}

function getEntries(sheetBook, activityId){
    var entries = [];
    var rangeId = columns[activityId * 3] + "3:" + columns[activityId * 3 + 1];
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

function doGet(request) {
  var type = request.parameter.type;
  if(type === "get"){
    return getActivities();
  }
  else if(type === "getone"){
    return getOneActivity(request.parameter.activityId);
  }
  else if(type === "post") {
    return postData({
      activityId: request.parameter.activityId,
      startActivity: request.parameter.startActivity,
      endActivity: request.parameter.endActivity,
      date: request.parameter.date,
    });
  }
}


function postData(request){
    var success = true;
    var errorMessage = "";
    var sb = getSpreadSheetBook();

    try {
        insertData(request, sb);
    }
    catch(e) {
        success = false;
        errorMessage = e.errorMessage;
        console.error(e);
    }

    var result = {
        success: success,
        message: errorMessage
    }
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON); 
}

function insertData(request, sb){
    var entries = getEntries(sb, request.activityId);
    var row = getActiveRow(entries);
    if(request.startActivity == true && request.endActivity == true)
    {
      throw new Error("Cannot start and end activity at the same time");
    }

    if(request.startActivity === "true")
    {
        if(row.start !== undefined)
            throw new Error("Activity already started");
        else 
            insertValue(sb, request.activityId, row.id, request.date, true);
    }
    else if(request.endActivity === "true")
    {
        if(row.start === undefined)
            throw new Error("Activity not started");
        else if(row.stop !== undefined)
            throw new Error("Activity already ended"); // Should never happen
        else 
            insertValue(sb, request.activityId, row.id, request.date, false);
    }
    else
    {
        throw new Error("Invalid request. Must specify startActivity or endActivity.");
    }
}

function getActiveRow(entries){
    var result = {
      id: 0,
      start: undefined,
      stop: undefined
    }

    if (entries.length > 0){
      var lastEntry = entries[entries.length - 1];
      if(lastEntry.start !== undefined && lastEntry.stop !== undefined){
        result = {
            id: entries.length,
            start: undefined,
            stop: undefined
        }
      }
      else {
        result = {
            id: entries.length - 1,
            start: lastEntry.start,
            stop: lastEntry.stop
        }
      }
    }

    return result;
}

function insertValue(sb, activityId, row, date, isStart){
    var column = columns[activityId * 3 + (isStart ? 0 : 1)];
    var rowId = (row + 3);
    sb.getRange(column + rowId).setValue(date);
}

function getActivities(){
    var activities = [];
    var sb = getSpreadSheetBook();

    for (var activityId = 0; activityId < maxActivities; activityId++) {
        var activity = getActivity(sb, activityId);
        if(activity.name.length > 0)
            activities.push(activity);
    }

    var result = {
        activities: activities
    }
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON); 
}

function getOneActivity(id){
    var sb = getSpreadSheetBook();

    var activity = getActivity(sb, id);

    return ContentService.createTextOutput(JSON.stringify(activity)).setMimeType(ContentService.MimeType.JSON); 
}

function getActivity(sheetBook, activityId){
    var nameRange = columns[activityId * 3] + "1"; 
    var name = sheetBook.getRange(nameRange).getValue();
    var entries = getEntries(sheetBook, activityId);
    var duration = calculateDurationInMs(entries);
    var isActive = calculateIsActive(entries);

    var activity = {
        id: activityId,
        name: name,
        durationMs: duration,
        isActive: isActive
    };
    return activity;
}

function calculateDurationInMs(entries){
    var duration = 0;
    for (var i = 0; i < entries.length; i++) {
        var start = entries[i].start;
        var stop = entries[i].stop;
        if(stop > 0)
            duration += stop - start;
    }
    return duration;
}

function calculateIsActive(entries){
    if(entries.length === 0)
      return false;

    var isActive = entries[entries.length - 1].stop === undefined;
    return isActive;
}
