
var resetTimer = new Date() ;

var Day = resetTimer.getDate();

var Month = resetTimer.getMonth()+1;
var Year = resetTimer.getFullYear();
var Day1 = resetTimer.getDay();
var dayText = ''; 
console.log('day = '+Day1)
var d = new Date();
  var m = d.getMinutes();
  var h = d.getHours();
  if(h < '15')
  {console.log('not passed 15 hours')}
else
{
  console.log('passed 15 hours')
}

var countDownDate = new Date(Year, makeMeTwoDigits(Month), makeMeTwoDigits(Day), 15, 00, 00);

if(Day1 == 6 || Day1 == 0)
  dayText = 'to get it on Tuesday.';

else if(( Day1 == 1) && (h < '15'))
	dayText = 'to get it on Tuesday.';
else if((Day1 == 1) && (h >= '15'))
    dayText = 'to get it on Wednesday.';

else if((Day1 == 2) && (h < '15'))
    dayText = 'to get it on Wednesday.';
else if((Day1 == 2) && (h >= '15'))
    dayText = 'to get it on Thrusday.';

else if((Day1 == 3) && (h < '15'))
    dayText = 'to get it on Thrusday.';
else if((Day1 == 3) && (h >= '15'))
    dayText = 'to get it on Friday.';

else if((Day1 == 4) && (h < '15'))
    dayText = 'to get it on Friday.';
else if((Day1 == 4) && (h >= '15'))
    dayText = 'to get it on Monday.';

else if((Day1 == 5) && (h < '15'))
    dayText = 'to get it on Monday.';
else if((Day1 == 5) && (h >= '15'))
    dayText = 'to get it on Tuesday.';

var x = setInterval(updateTime, 1000);

function makeMeTwoDigits(n){
    return (n < 10 ? "0" : "") + n;
}

function updateTime() {

  var now = new Date().getTime();

  
  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));

  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  

   document.getElementById("demo").innerHTML = "Order in the next <b>"+makeMeTwoDigits(hours) + ":" + makeMeTwoDigits(minutes) + ":" + makeMeTwoDigits(seconds) +"</b> "+ dayText;
    
  if (distance < 0) {
    clearInterval(x);
    distance = 0;
    countDownDate = null;
    var day1 = new Date(Month+" "+Day+", "+Year);
    var nextDay = new Date(day1);
    nextDay.setUTCHours(0,0,0,0);
    nextDay.setDate(day1.getDate()+1);
    
    Day = nextDay.getDate();
    Month = nextDay.getMonth()+1;
    Year = nextDay.getFullYear();
    Day1 = nextDay.getDay();
    
    var d = new Date();
  var m = d.getMinutes();
  var h = d.getHours();
    
    
if(Day1 == 6 || Day1 == 0)
  dayText = 'to get it on Tuesday.';

else if(( Day1 == 1) && (h < '15'))
	dayText = 'to get it on Tuesday.';
else if((Day1 == 1) && (h >= '15'))
    dayText = 'to get it on Wednesday.';

else if((Day1 == 2) && (h < '15'))
    dayText = 'to get it on Wednesday.';
else if((Day1 == 3) && (h >= '15'))
    dayText = 'to get it on Thrusday.';

else if((Day1 == 3) && (h < '15'))
    dayText = 'to get it on Thrusday.';
else if((Day1 == 3) && (h >= '15'))
    dayText = 'to get it on Friday.';

else if((Day1 == 4) && (h < '15'))
    dayText = 'to get it on Friday.';
else if((Day1 == 4) && (h >= '15'))
    dayText = 'to get it on Monday.';

else if((Day1 == 5) && (h < '15'))
    dayText = 'to get it on Monday.';
else if((Day1 == 5) && (h >= '15'))
    dayText = 'to get it on Tuesday.';
    

   countDownDate = new Date(Year, makeMeTwoDigits(Month), makeMeTwoDigits(Day), 15, 00, 00);

   
    x = setInterval(updateTime, 1000);
  }
}