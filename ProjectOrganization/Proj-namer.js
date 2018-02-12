// some code
document.addEventListener("DOMContentLoaded", function(event) {

//   document.getElementById("#general").addEventListener("click", function(event) {
//          // document.getElementById("output-box").innerHTML += "Sorry! <code>preventDefault()</code> won't let you check this!<br>";
//          event.preventDefault();
// }, false);
  console.log("DOM fully loaded and parsed");
  var current = new Date();

  var monthNameArray = [
    ['b43','Cyan', '#00838f', 'January', '31 days'],
    ['b27','Teal ', '#00796b', 'February', '28 days', '29 days in leap'],
    ['b17','Green', '#1b5e20', 'March', '31 days'],
    ['b7','Lime', '#afb42b', 'April', '30 days'],
    ['b16','Yellow', '#ffeb3b', 'May', '31 days'],
    ['b26','Orange', '#e65100', 'June', '30 days'],
    ['b42','Red', '#d50000', 'July', '31 days'],
    ['b52','Pink', '#880e4f', 'August', '31 days'],
    ['b63','Purple', '#6a1b9a', 'September', '30 days'],
    ['b67','Brown', '#3e2723', 'October', '31 days'],
    ['b62','Grey', '#757575', 'November', '30 days'],
    ['b53','Blue', '#0d47a1', 'December', '31 days']
  ];
  var idEl=0;
  var colorName = 1;
  var colorHex = 2;
  var monthName = 3;
  var id = monthNameArray[current.getMonth()][idEl];
  var x = document.getElementById(id);
  x.classList.add("active-svg-element");

  console.log(monthNameArray[current.getMonth()][idEl]);
});
