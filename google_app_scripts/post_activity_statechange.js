function testPostStart(){
    doPost({
      parameter: {
        id: 4,
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
      var success = true;
      var errorMessage = "";
      var sb = getSpreadSheetBook();
  
      try {
          var request = parseRequest(request);
          insertData(request, sb);
      }
      catch(e) {
          success = false;
          errorMessage = e.message;
      }
  
      var result = {
          succeeded: success,
          errorMessage: errorMessage
      }
      console.log(result);
      return result;
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
  
      return result;
  }
  
  function insertValue(sb, activityId, row, date, isStart){
      var column = columns[activityId * 3 + (isStart ? 0 : 1)];
      var rowId = (row + 3);
      sb.getRange(column + rowId).setValue(date);
  }
  
  function parseRequest(request){
      var activityId = request.parameter.id;
      var startActivity = request.parameter.startActivity;
      var endActivity = request.parameter.endActivity;
      var date = request.parameter.date;
      var request = {
          activityId: activityId,
          startActivity: startActivity,
          endActivity: endActivity,
          date: date
      }
      return request;
  }
  
  
  