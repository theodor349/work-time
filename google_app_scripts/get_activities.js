function doGet(){
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
    console.log(result);
    return result;
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
