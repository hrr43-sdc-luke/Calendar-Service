// uses db data to transform data into shape the FE expects
const dataTransformer = (dataObj) => {
  const convertDigitToBoolean = (inputDataObj, monthNum, day) => {
    const selectedMonth = dataObj[`month${monthNum}`];
    const selectedDay = selectedMonth[day];
    const openForBooking = '0';
    return selectedDay === openForBooking;
  };

  const expObj = {};
  expObj.exp_id = dataObj.exp_id;
  const today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  const howManyMonthsToGenerate = 6;
  const data = [];
  let neededYear = 0;
  let nextMonth = 0;

  for (let x = 0; x < howManyMonthsToGenerate; x += 1) {
    if (month === 11) {
      neededYear += 1;
      nextMonth = 0;
    } else {
      neededYear = year;
      nextMonth = month + 1;
    }

    // empty calendar 6 weeks by 7 days
    const calendar = [];
    for (let i = 0; i < 6; i += 1) {
      calendar[i] = [];
      for (let j = 0; j < 7; j += 1) {
        calendar[i][j] = {};
      }
    }

    // assigns values to the day's availability
    const daysInMonth = new Date(neededYear, nextMonth, 0).getDate();
    const weekdayOfFirstDayInMonth = new Date(year, month, 1).getDay();
    let line = 0;
    let place = weekdayOfFirstDayInMonth;

    for (let i = 1; i <= daysInMonth; i += 1) {
      calendar[line][place].day = i;
      calendar[line][place].morning = convertDigitToBoolean(dataObj, month, i);
      calendar[line][place].lunch = convertDigitToBoolean(dataObj, month, i);
      place += 1;
      if (place === 7) {
        line += 1;
        place = 0;
      }
    }

    data.push({
      year,
      month,
      days: calendar,
    });

    expObj.dates = data;

    // increments month to create next month's availability data
    if (month === 11) {
      year += 1;
      month = 0;
    } else {
      month += 1;
    }
  }
  return expObj;
};

module.exports = dataTransformer;
