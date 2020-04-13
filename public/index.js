var aText = new Array(
"Welcome to MouseinMic",
"Made by Danqi","I'm watching you"
);
var iSpeed = 100; // time delay of print out
var iIndex = 0; // start printing array at this posision
var iArrLength = aText[0].length; // the length of the text array
var iScrollAt = 40; // start scrolling up at this many lines

var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row

function typewriter()
{
 sContents =  ' ';
 iRow = Math.max(0, iIndex-iScrollAt);
 // console.log("iRow = " + iRow);//row num
 // console.log("iIndex = " + iIndex);//array num
 var destination = document.getElementById("typedtext");
 //if it's less than 20 texts
 while ( iRow < iIndex ) {
  //store texts in sContents
  sContents += aText[iRow++] + '<br />';
  //console.log("sContents = " + sContents);
}
 destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
 if ( iTextPos++ == iArrLength ) {
  iTextPos = 0;

  iIndex++;
  if ( iIndex != aText.length ) {
   iArrLength = aText[iIndex].length;
   setTimeout("typewriter()", 500);
  }
 } else {
     // console.log("iTextPos = " + iTextPos);
  setTimeout("typewriter()", iSpeed);
 }
}

function getGeolocation(){
  var gerCor = false;
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(successCallback, errorCallback, {});
    function successCallback(currentPosition) {
    var lat = currentPosition.coords.latitude,
        lon = currentPosition.coords.longitude;
    console.log(lat,lon);
  }

  function errorCallback(e) {
    //alert(e);
  }

} else {
  //alert("Not Allowed");
}
}
