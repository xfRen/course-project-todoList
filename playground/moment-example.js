const moment = require('moment');

console.log(moment().format()); // it will print "2017-05-18T22:18:52-07:00"

// January 1st, 1970 @12:00am -> 0
// January 1st, 1970 @12:01am -> 60
// December 31st, 1969 @11:59pm -> -60

// to get timestamp:
var now = moment();
console.log('Current timestamp', now.unix()); // it will print "Current timestamp 1495171132"

// to convert timestamp to what user can understand:
var timestamp = 1495144148;
var currentMoment = moment.unix(timestamp);
// Jan 1, 16 @ 12:12 am
console.log('Current moment version 1 -', currentMoment.format('MMM D, YY @ h:mm a'));
// it will print "Current moment version 1 - May 18, 17 @ 2:49 pm"

// January 1st, 2016 @ 12:12 AM
console.log('Current moment version 2 -', currentMoment.format('MMMM Mo, YYYY @ h:mm A'));
// it will print "Current moment version 2 - May 5th, 2017 @ 2:49 PM"
