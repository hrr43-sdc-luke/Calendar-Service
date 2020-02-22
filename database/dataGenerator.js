const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: './test.csv',
  header: [
    { id: 'exp_id', title: 'exp_id' },
    { id: 'm1Avail', title: 'month1' },
    { id: 'm2Avail', title: 'month2' },
    { id: 'm3Avail', title: 'month3' },
    { id: 'm4Avail', title: 'month4' },
    { id: 'm5Avail', title: 'month5' },
    { id: 'm6Avail', title: 'month6' },
  ],
});

const batchWrite = (data, cb) => {
  csvWriter
    .writeRecords(data)
    .then(() => {
      cb();
    });
};

// variables needed to produce current calendar
const curDate = new Date();
const curYear = curDate.getFullYear();
const curMonth = curDate.getMonth() + 1; // 0-indexed months
const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();
const m1Days = getDaysInMonth(curYear, curMonth);
const m2Days = getDaysInMonth(curYear, curMonth + 1);
const m3Days = getDaysInMonth(curYear, curMonth + 2);
const m4Days = getDaysInMonth(curYear, curMonth + 3);
const m5Days = getDaysInMonth(curYear, curMonth + 4);
const m6Days = getDaysInMonth(curYear, curMonth + 5);

// produces string representation of openings using 0s/1s X num of days in month
// "11100111011000000001111010011"
const getMonthOpenings = (monthDays) => {
  let monthOpenings = '';
  for (let j = 0; j < monthDays; j += 1) {
    monthOpenings += Math.round(Math.random()).toString();
  }
  return monthOpenings;
};

const createRecords = (batchIndex, batchSize) => {
  const records = [];

  for (let i = batchIndex * batchSize + 1; i <= batchIndex * batchSize + batchSize; i += 1) {
    // produces 1 record with data for 6 months of openings
    records.push({
      exp_id: i,
      m1Avail: getMonthOpenings(m1Days),
      m2Avail: getMonthOpenings(m2Days),
      m3Avail: getMonthOpenings(m3Days),
      m4Avail: getMonthOpenings(m4Days),
      m5Avail: getMonthOpenings(m5Days),
      m6Avail: getMonthOpenings(m6Days),
    });
  }
  return records;
};

function runBatches() {
  // number of batches to run
  const batchAmt = 100;
  // number of records per batch
  const batchSize = 100000;

  let batchIndex = 0;
  const oneBatch = () => {
    batchWrite(createRecords(batchIndex, batchSize), () => {
      batchIndex += 1;
      console.log(`batchIndex: ${batchIndex}  batchSize: ${batchSize}  batchTotal: ${batchIndex * batchSize}  timer: ${((new Date()) - curDate) / 1000} secs`);
      // check to see if more batches need to be run
      if (batchIndex < batchAmt) {
        oneBatch();
      }
    });
  };
  oneBatch();
}

runBatches();
// 21 seconds per 1M
// 217 seconds per 10M = 3.6 minutes
