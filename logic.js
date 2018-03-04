/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyDYfKeA3W76cGw-FcVWpc32dgSEao58R0M",
    authDomain: "trainschedule-4745d.firebaseapp.com",
    databaseURL: "https://trainschedule-4745d.firebaseio.com",
    projectId: "trainschedule-4745d",
    storageBucket: "",
    messagingSenderId: "590461798360"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var dest = $("#destination-input").val().trim();
  var fTrain = moment($("#first-trainTime-input").val().trim(), "HH:mm").format("X");
  var frq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: dest,
    firstTt:fTrain,
    frequency: frq
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTt);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-trainTime-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var dest = childSnapshot.val().destination;
  var fTrain = childSnapshot.val().firstTt;
  var frq = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(dest);
  console.log(fTrain);
  console.log(frq);

  // Match the First Train Time
  var trainTime = moment.unix(fTrain).format("HH:mm");

  // Calculate the next train arrival
  // To calculate the next train arrival 
//   var nxtTrain = moment().diff(moment.unix(fTrain, "X"), "hours");
//   console.log(nxtTrain);

  // Calculate how far away
//   var minAway = empMonths * empRate;
//   console.log(empBilled);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + dest + "</td><td>" +
  frq + "</td><td>" + trainTime + "</td><td>");
});


