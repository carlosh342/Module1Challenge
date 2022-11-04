// Array is created with necessary information for the application to function. Includes id- an index identifier, phase- AM or PM, an empty string to save text values, etc. 
var day =[
  {
     id:"0",
     hour: "09",
     time: "09",
     phase:" AM",
     rem_text: ""
  },
  {
    id:"1",
    hour: "10",
    time: "10",
    phase:"AM",
    rem_text: ""
 },
 {
    id:"2",
    hour: "11",
    time: "11",
    phase:"AM",
    rem_text: ""
},
{
    id:"3",
    hour: "12",
    time: "12",
    phase:"AM",
    rem_text: ""
},
{
    id:"4",
    hour: "1",
    time: "13",
    phase:"PM",
    rem_text: ""
},
{
    id:"5",
    hour: "2",
    time: "14",
    phase:"PM",
    rem_text: ""
},
{
    id:"6",
    hour: "3",
    time: "15",
    phase:"PM",
    rem_text: ""
},
{
    id:"7",
    hour: "4",
    time: "16",
    phase:"PM",
    rem_text: ""
},
{
    id:"8",
    hour: "5",
    time: "17",
    phase:"PM",
    rem_text: ""
},
]
// Variable that uses moment.js to get the current information of the user. Includes Month, Day, Year, and time pertaining to when the user is using his/her computer. 
var get_date= moment().format('MMMM Do YYYY, h:mm:ss a');
// Function is created that sets id current day to the value of the previously mentioned variable. 
function set_date(){
   $("#currentDay").text(get_date);
 }
 // initiate set_date function
set_date() 
// Function that stringifies values of the array and puts it in local storage
function save_rem(){
   localStorage.setItem("day",JSON.stringify(day));
 }
 // Function that includes loop to display the remainers. Function works by invoking previous function.
function display_rem(){
   day.forEach(function(current_hour){
   $(`#${current_hour.id}`).val(current_hour.rem_text);
   })
 }
 // Function invokes previous functions and run them. If statement will be true if day exist. 
function compare_dates(){
  var comp_date =JSON.parse(localStorage.getItem("day"));
  if (comp_date) {
    day =comp_date;
  }

  save_rem();
  display_rem();
}
// Function created to categorize and invoke css elements for the calendar.Sections of code will be explained below
day.forEach(function(x){
// This sections creates the rows for the calendar and display them in class container.
  var hour_dis =$("<form>").attr({
    "class": "row"
  });
  $(".container").append(hour_dis);
 // This section creates the date columns and displays the date and time of day( A.M or P.M)
  var hour_dis_square=$("<div>")
    .text(`${x.hour}${x.phase}`)
    .attr({
     "class": "col-md-2 hour"
    });
  var rem_hour=$("<div>").attr({
   "class": "col-md-9 description p-0" });
  var rem_dat =$("<textarea>");
  rem_hour.append(rem_dat);
 // If else loop are used to compare if the current time( which is formatted with moment.js to the hour) falls in classes present, future, or past. These classes invoke CSS visual 
 // properties of the same name
  rem_dat.attr("id",x.id);
  if(x.time < moment().format("HH")){
    rem_dat.attr("class","past");
  } else if(x.time === moment().format("HH")){
    rem_dat.attr("class", "present");
  }else {
   rem_dat.attr("class", "future");
 }
// Save button is created and put in a column next to the elements. Relevant CSS properties are invoked. 
  var save_button=$("<i class='far fa-save fa-lg'></i>");
  var save_c = $("<button>").attr("class","col-md-1 saveBtn");
  save_c.append(save_button);
  hour_dis.append(hour_dis_square,rem_hour,save_c);
})

compare_dates();
// Function is created to finilize the saving of text inputted by the user when button is clicked. Previously mentioned functions are used to finilize the process. 
// Only dates with future class are displayed. 
$(".saveBtn").on("click",function(y) {
   y.preventDefault();
  var save_data =$(this).siblings(".description").children(".future").attr("id");
  day[save_data].rem_text=$(this).siblings(".description").children(".future").val();
  console.log(save_data);
  save_rem();
  display_rem();
})