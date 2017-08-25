const moment = require('moment');

console.log(moment().format());
console.log(moment().format('YYYY MM DD'));
console.log(moment().format('MMM Do YYYY hh:mm a'));

const now = moment();

// resta 1 año
now.subtract(1, 'year');
console.log(now.format());

console.log(now.format('X'));
console.log(now.format('x'));
// numero
console.log(now.valueOf());

const ts = 1472096126152;
var tsMoment = moment.utc(ts);
console.log(tsMoment.format());
