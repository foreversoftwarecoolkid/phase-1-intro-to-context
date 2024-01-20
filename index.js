// Implementations of the required functions

function createEmployeeRecord(data) {
    return {
      firstName: data[0],
      familyName: data[1],
      title: data[2],
      payPerHour: data[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  }
  
  function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, timeStamp) {
    const [date, hour] = timeStamp.split(' ');
    employee.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(hour, 10),
      date,
    });
    return employee;
  }
  
  function createTimeOutEvent(employee, timeStamp) {
    const [date, hour] = timeStamp.split(' ');
    employee.timeOutEvents.push({
      type: 'TimeOut',
      hour: parseInt(hour, 10),
      date,
    });
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    return datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employee, date), 0);
  }
  
  function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
  }
  
  // Exporting functions for testing
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll,
  };
  
