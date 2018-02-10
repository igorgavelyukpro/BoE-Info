// some code
document.addEventListener("DOMContentLoaded", function(event) {


  document.getElementById("#general").addEventListener("click", function(event) {
         // document.getElementById("output-box").innerHTML += "Sorry! <code>preventDefault()</code> won't let you check this!<br>";
         event.preventDefault();
}, false);
  console.log("DOM fully loaded and parsed");
  var current = new Date();

  var monthNameArray = [
    ['Blue', '#0d47a1', 'December', '31 days'],
    ['Cyan', '#00838f', 'January', '31 days'],
    ['Teal ', '#00796b', 'February', '28 days', '29 days in leap'],
    ['Green', '#1b5e20', 'March', '31 days'],
    ['Lime', '#afb42b', 'April', '30 days'],
    ['Yellow', '#ffeb3b', 'May', '31 days'],
    ['Orange', '#e65100', 'June', '30 days'],
    ['Red', '#d50000', 'July', '31 days'],
    ['Pink', '#880e4f', 'August', '31 days'],
    ['Purple', '#6a1b9a', 'September', '30 days'],
    ['Brown', '#3e2723', 'October', '31 days'],
    ['Grey', '#757575', 'November', '30 days']
  ];
  var colorName = 0;
  var colorHex = 1;
  var monthName = 2;

  console.log();
  console.log(monthNameArray[current.getMonth()][colorName]);
});
