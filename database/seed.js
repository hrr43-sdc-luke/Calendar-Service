const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/calendar', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const dateSchema = new mongoose.Schema({
  exp_id: Number,
  dates: []
});

var dateInCalendar = mongoose.model('Experience', dateSchema);

//Created seed for the next 6 months
const seed = () => {
  var today = new Date;
  let month = today.getMonth();
  let year = today.getFullYear();
  //month generator - several amount of months from now
  var howManyMonthToGenerate = 6
  var data = [];
  var neededYear = 0;
  var nextMonth = 0;
  //comes with year, month, neededYear, nextMonth;
  for (let x = 0; x < howManyMonthToGenerate ; x++) {
    if (month === 11) {
      neededYear ++;
      nextMonth = 0;
    } else {
      neededYear = year;
      nextMonth = month + 1;
    }
    let daysInMonth = new Date(neededYear, nextMonth, 0).getDate();

    //empty calendar 6*7
    var cdr = [];
    for (let i = 0; i < 6; i++) {
      cdr[i] = [];
      for (let j = 0; j < 7; j++) {
        cdr[i][j] = {};
      }
    }

    let weekdayOfFirstDayInMonth = new Date(year, month, 1).getDay();
    let line = 0;
    let place = weekdayOfFirstDayInMonth
    for (let i = 1; i <= daysInMonth; i ++) {
      cdr[line][place].day = i.toString();
      cdr[line][place].morning = (Math.random() > 0.3 ? true: false)
      cdr[line][place].lunch = (Math.random() > 0.3 ? true: false)
      place ++;
      if (place === 7) {
        line++;
        place = 0;
      }
    }

    data.push({
      year: year,
      month: month,
      days: cdr
    });

    //data.push(cdr)

    if (month === 11) {
      year ++;
      month = 0;
    } else {
      month ++;
    }
  }
  return data;
}

var counter = 1;
for (let i = 1; i <= 100; i++) {
  let calendar = new dateInCalendar({
    exp_id: i,
    dates : seed()
  });
  calendar.save((err)=>{
    if (err) {console.log(err)};
    counter ++;
    if (counter === 101) { mongoose.connection.close() }
  });

}

