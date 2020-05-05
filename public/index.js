var aText = new Array(
"Hmm lemme see"
);
var iSpeed = 100; // time delay of print out
var iIndex = 0; // start printing array at this posision
var iArrLength = aText[0].length; // the length of the text array
var iScrollAt = 40; // start scrolling up at this many lines

var iTextPos = 0; // initialise text position
var sContents = ''; // initialise contents variable
var iRow; // initialise current row

var counter=0;


function typewriter(){
 sContents =  ' ';
 iRow = Math.max(0, iIndex-iScrollAt);
 var destination = document.getElementById("typedtext");
 //if it's less than 20 texts
 while ( iRow < iIndex ) {
  //store texts in sContents
  sContents += '<span class="typing_text">' + aText[iRow++] + '</span>' + '<br />';
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
    // navigator.geolocation.watchPosition(successCallback, errorCallback, {});
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    function successCallback(currentPosition) {
          var lat = currentPosition.coords.latitude,
              lon = currentPosition.coords.longitude;
          geocodeLatLng(lat,lon);
          initialize(lat, lon);
          console.log(lat,lon);
    }
    function errorCallback(e) {
      // alert(e);
    }
  } else {
    //alert("Not Allowed");
  }
}
  function geocodeLatLng(lat, lon) {
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
    var latlng = {lat: lat, lng: lon};
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        var locationName = results[0].address_components[3].long_name + ', ' + results[0].address_components[5].long_name;
        var streetName = results[0].formatted_address;
        var locationGuess = results[0].types[0];
        // console.log(results);
        if(okClick === true){
          socket.emit('currentLocation', locationName);
          console.log("geolocation sent locationName to server");
        }
        console.log("your current location" +locationName);
        var text_loc = document.createElement("text_LOC");
        // text_loc.classList.add(typing_text);
        text_loc.innerHTML = "<span> thanks for letting me know you are at " +locationName + "</span>";
        aText.push(text_loc.innerHTML);
        typewriter();
        // console.log("you just clicked on an alive human from " + locationName + ", might be in " + locationGuess);
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  function initialize(lat, lon) {
    var fenway = {lat:lat, lng:lon};
    // var fenway = {lat: 42.345573, lng: -71.098326};
        var map = new google.maps.Map(document.getElementById('map'), {
          center: fenway,
          zoom: 14
        });
        var panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), {
              position: fenway,
              pov: {
                heading: 34,
                pitch: 10
              }
            });
        map.setStreetView(panorama);
  }

  function validata(){
    if (counter == 1){
      document.getElementById("para").innerHTML = "I won't store or sell your data.";
    } else if (counter == 2){
      document.getElementById("para").innerHTML = "Because I dont know how to programme that out.";
    } else if (counter == 3){
      document.getElementById("para").innerHTML = "It's fun. I promise.";
    } else if (counter == 4){
      document.getElementById("para").innerHTML = "Come on.";
    } else if (counter == 5){
      document.getElementById("para").innerHTML = "Ok. Now I know you are tough.";
    } else if (counter >= 6){
      document.getElementById("para").innerHTML = "Whatever.";
    }

  }

  function leaveText(){
      var btnNum=event.button;
      if(btnNum == 2 && btnNum == 1 && btnNum == 0){
        console.log("you clicked clicked");
      }
  }

  var a_idx = 0;
  $("body").click(function(e) { drawText(e) } );
  var drawText=function(e){
    var a = new Array("you know","I know","you know I know","I know you know");
    var $i = $("<span/>").text(a[a_idx]);
    a_idx = (a_idx + 1) % a.length;
    var x = e.x * window.innerWidth,
    y = e.y * window.innerHeight;
    // console.log(x+","+y);
    $i.css({
        "z-index": "9999",
        "top": y + 5,
        "left": x,
        "position": "absolute",
        "font-weight": "bold",
        "background-color":"white",
        //"font-family": "system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue","Lucida Grande", "Segoe UI""
      });
      $("body").append($i);
    $i.animate({
        "top": y + 180,
        "opacity": 0
    },
    1500,
    function() {
      $i.remove();
    });
  }

  var b_idx = 0;
  var leaveText=function(e,loctext){
    // console.log("im clicked");
    console.log("loctext:"+loctext);
    // var b = loctext.split(" ");
    // var $j = $("<p/>").text(b[b_idx]);
    var $j = $("<p/>").text(loctext);
    // b_idx = (b_idx + 1) % b.length;
    var x = e.x,
    y = e.y ;
    $j.css({
        "z-index": "999",
        "width":"50px",
        "height":"50px",
        "top": y,
        "left": x,
        "background-color":"white",
        "font-size":"12px",
        "position": "absolute",
        "font-weight": "bold",
        "color": "#000000"
      });
      $("#box").append($j);
    $j.animate({
        "top": y
    });
  }
