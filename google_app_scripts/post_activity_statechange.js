function testJson(){
    var json = '{"id": 4,"startActivity": true,"endActivity": false,"date": "2024-01-01 12.00.00"}';
    var input = JSON.parse(json);
    var res = doPost(input);
    console.log(res);
  }
  
  function testPostStart(){
    doPost({
      parameter: {
        id: 4, // Fails if undefined
        startActivity: true,
        endActivity: false,
        date: "2019-01-01 12.00.00"
      }
    });
  }
  
  function testPostEnd(){
    doPost({
      parameter: {
        id: 4,
        startActivity: false,
        endActivity: true,
        date: "2019-01-01 14.15.00"
      }
    });
  }
  
  function sendRequest(isStart){
    var res = doPost({
      parameter: {
        id: 5,
        startActivity: isStart,
        endActivity: !isStart,
        date: isStart ? "2019-01-01 14.15.00" : "2019-01-01 16.56.00"
      }
    });
    return res;
  }
  
  function test(){
  
    // First Row
    var res = sendRequest(false);
    if(res.success === true){
      throw new Error("Should not have been able to end activity");
    }
  
    res = sendRequest(true);
    if(res.success === false){
      throw new Error("Should have been able to start activity");
    }
  
    res = sendRequest(true);
    if(res.success === true){
      throw new Error("Should not have been able to start activity");
    }
  
    res = sendRequest(false);
    if(res.success === false){
      throw new Error("Should have been able to end activity");
    }
  
    // Second Row
    res = sendRequest(false);
    if(res.success === true){
      throw new Error("Should not have been able to end activity");
    }
  
    res = sendRequest(true);
    if(res.success === false){
      throw new Error("Should have been able to start activity");
    }
  
    res = sendRequest(true);
    if(res.success === true){
      throw new Error("Should not have been able to start activity");
    }
  
    res = sendRequest(false);
    if(res.success === false){
      throw new Error("Should have been able to end activity");
    }
  }
  
  
  function doPost(request){
      const { parameter, postData: { contents, type } = {} } = request;
      console.log(request);
      var success = true;
      var errorMessage = "";
      var sb = getSpreadSheetBook();
  
      try {
          var input = JSON.parse(contents);
          console.log("ActivityId: " + input.activityId);
          console.log("IsStart: " + input.startActivity);
          console.log("IsEnd: " + input.endActivity);
          console.log("Date: " + input.date);
          insertData(input, sb);
      }
      catch(e) {
          success = false;
          errorMessage = e.errorMessage;
          console.error(e);
      }
  
      var result = {
          success: success,
          errorMessage: errorMessage
      }
      console.log(result);
      return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON); 
  }
  
  function insertData(request, sb){
      var entries = getEntries(sb, request.activityId);
      var row = getActiveRow(entries);
      if(request.startActivity === true)
      {
          if(row.start !== undefined)
              throw new Error("Activity already started");
          else 
              insertValue(sb, request.activityId, row.id, request.date, true);
      }
      else if(request.endActivity === true)
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
  
      console.log("Active row: " + result);
      return result;
  }
  
  function insertValue(sb, activityId, row, date, isStart){
      var column = columns[activityId * 3 + (isStart ? 0 : 1)];
      var rowId = (row + 3);
      console.log("Overriding cell: " + column + rowId + " with " + date);
      sb.getRange(column + rowId).setValue(date);
  }
  
  
  