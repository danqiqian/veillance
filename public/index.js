var aText = new Array(
"Welcome to NakedMice",
"You are naked in the digital age","Made by Danqi Qian",
"Big thanks to Shawn Van Every & Katie Han"
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
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(successCallback, errorCallback, {});
    function successCallback(currentPosition) {
          var lat = currentPosition.coords.latitude,
              lon = currentPosition.coords.longitude;
          geocodeLatLng(lat,lon);
          console.log(lat,lon);
    }
    function errorCallback(e) {
      //alert(e);
    }
  } else {
    //alert("Not Allowed");
  }
  function geocodeLatLng(lat, lon) {
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
    var latlng = {lat: lat, lng: lon};
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        var locationName = results[0].address_components[3].long_name + ', ' + results[0].address_components[5].long_name;
        var locationGuess = results[0].types[0];
        socket.emit('currentLocation', locationName);
        console.log("you just clicked on an alive human from " + locationName + ", might be in " + locationGuess);
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
}
