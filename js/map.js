console.log('map.js')

var map

function renderMap(){
  console.log('\nrenderMap()')

/*
    var mymap = L.map('mapid').setView([51.505, -0.09], 13);
    var marker = L.marker([51.5, -0.09]).addTo(mymap);

    
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      id: 'mapbox.streets'
    }).addTo(mymap);

    var circle = L.circle([51.508, -0.11], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(mymap);

    var polygon = L.polygon([
      [51.509, -0.08],
      [51.503, -0.06],
      [51.51, -0.047]
      ]).addTo(mymap);

    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
    circle.bindPopup("I am a circle.");
    polygon.bindPopup("I am a polygon.");

    var popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(mymap);

    var popup = L.popup();

    function onMapClick(e) {
      popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(mymap);
    }

    mymap.on('click', onMapClick);
    */


    /*
    var maxBounds =  L.latLngBounds(
      L.latLng(40.54148, -75.4082),//northeast
      L.latLng(35.35806, -123.2793)//southwest
      );
      */

      map = L.map('mapid', {
        center: [38.61687, -99.22852],
        zoom: 4,
      //maxZoom: 6,
      //minZoom: 4,
      layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        'attribution': 'Map data &copy; OpenStreetMap contributors'
      })
      ],
      //'maxBounds': maxBounds
    })//.fitBounds(maxBounds);

      map.on('click', onMapClick);
      map.on('zoomstart',onMapZoomStart);
      map.on('zoomend',onMapZoomEnd);
      

    //ng-repeat="marker in geo_data | limitTo: 1 track by $index"
}

var popup = L.popup();
function onMapClick(e) {
  popup
  .setLatLng(e.latlng)
  .setContent("<div style='width:300px; height:300px; background:red;'>You clicked the map at " + e.latlng.toString() + '</div>')
  .minWidth
  .openOn(map);
  console.log(e.latlng);
}

function onMapZoomStart(e) {
}

function onMapZoomEnd(e) {
  console.log('onMapZoomEnd()')
  var zoomLev = map.getZoom();
  console.log('zoomLev: ' + zoomLev);
  console.log(map.options.zoom)
  //console.log(map.options)
  if(zoomLev == map.options.zoom){
    console.log('zoom level match default zoom')    
    angular.element('#HomeCtrol').scope().setFilter();
    angular.element('#HomeCtrol').scope().$apply();
  }
}



function hideMarkers(){
  console.log('hideMarkers()')
  map.removeLayer(markers);
  markers.visibility = false;
}

function showMarkers(){
  console.log('hideMarkers()')
  map.addLayer(markers);
  markers.visibility = true;
}

function clearMarkers(){
  console.log('clearMarkers()')
  markers.clearLayers();
  map.removeLayer(marker);
  map.removeLayer(markers);
}

function zoomReset(){
  console.log('zoomReset()')
  console.log(map)
  //if(!zoomToState_set){
    //zoomToState_set = true; 
    //center: [38.61687, -99.22852],
    //zoom: 4,
    var latlng = map.options.center;
    var lat = latlng[0];
    var lng = latlng[1];
    var zoom = map.options.zoom;
    map.setView([lat, lng], zoom);
  //}

}

var zoomToState_set = false;
function zoomToState(){
  console.log('zoomToState()')
  if(!zoomToState_set){
    zoomToState_set = true; 
    console.log(geo_data)
    var latlng = geo_data[0];
    var lat = latlng[0];
    var lng = latlng[1];
    var zoom = 5;
    map.setView([lat, lng], zoom);
  }

}

function zoomToCity(){
  console.log('zoomToCity()')
  if(!zoomToState_set){
    zoomToState_set = true; 
    console.log(geo_data)
    var latlng = geo_data[0];
    var lat = latlng[0];
    var lng = latlng[1];
    var zoom = 5;
    map.setView([lat, lng], zoom);
  }

}

// custome icon class
var LeafIcon = L.Icon.extend({
    options: {
        //shadowUrl: 'leaf-shadow.png',
        //shadowAnchor: [4, 62],
        //shadowSize:   [50, 64],
        iconSize:     [20, 20],
        iconAnchor:   [0, 0],
        popupAnchor:  [10, 5] // x,y
    }
});

var circleIcon = new LeafIcon(
    //{iconUrl: '/images/icon_circle.png'}
    {iconUrl: '/images/map_pin_circle_animation.gif'}
  ),
  redIcon = new LeafIcon(
    {iconUrl: 'leaf-red.png'}
  ),
  orangeIcon = new LeafIcon(
    {iconUrl: 'leaf-orange.png'}
  );

var markers = new L.FeatureGroup();
markers.visibility = true;
function setMarkers(){    
    console.log('setMarkers()')    
    console.log(geo_data);

    for(var i=0; i<geo_data.length; i++){      
      //console.log('for loop')
      //console.log(geo_data[i][0])
      //console.log(geo_data[i][1])
      //console.log(geo_data[i][2])
      marker = new L.marker([ geo_data[i][0], geo_data[i][1] ],
        {
          icon: circleIcon
        }).addTo(markers)//.bindPopup("hello");
      //marker = new L.marker([ geo_data[i][0], geo_data[i][1] ]);
      marker.geo_data_key = geo_data[i][2];     
      marker.on('click', function(e){
        //console.log('click()');
        //console.log(e)
        //console.log('click(), latlng: ' + e.latlng.lat, e.latlng.lng)
        displayLocation( e );
        //onMarkerClick(e);
      });
    }
    map.addLayer(markers);

    function onMarkerClick(e) {
      console.log('onMarkerClick();')
      console.log(e)      
      console.log(e.geo_data_key)
      geo_data_key = e.geo_data_key;
      angular.element('#HomeCtrol').scope().setSearch(e.geo_data_key);
      angular.element('#HomeCtrol').scope().$apply();
      angular.element('#description_table').css('display','inline-block');
      angular.element('#city').html(e.city);
      setIframeSrc();
      //angular.element('#cases_iframe').attr('src','/includes/arc.html?value=' + 19 + '&label=Completed&size=50');
      /*
      popup
      .setLatLng(e.latlng)
      //.setContent("You clicked the map at " + e.latlng.toString())
      .setContent(
        '<b>Disease Information:</b>' + 
        '<br/>city: ' + e.city
        //'<br/> <a href="/p/?pid=1" target="top">Project Dashboard</a>'
        )
      .openOn(map);
      */
    }


    //marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

    //get geo-location using google api
    function displayLocation(e){
      console.log('displayLocation()') 
      console.log(e)
      
      var latitude = e.latlng.lat;
      var longitude = e.latlng.lng;
      console.log('latitude: ' + latitude)
      console.log('longitude: ' + longitude)
      
      var point = e;
      point.geo_data_key = e.target.geo_data_key;
      
      var request = new XMLHttpRequest();

      var method = 'GET';
      var url = 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true';
      var async = true;

      console.log('open connection')
      request.open(method, url, async);

      console.log('listen for onreadystatechange')
      request.onreadystatechange = function(){
        console.log('onreadystatechange()');
        console.log(point);
        if(request.readyState == 4 && request.status == 200){
          console.log('success request')
          var data = JSON.parse(request.responseText);
          console.log(data)

            // location information
            var address = data.results[0];
            //console.log(address)
            point.address = address.formatted_address;
            point.city = address.address_components[2].long_name;
            console.log('point.address: ' + point.address)
            console.log('point.city: ' + point.city)
            onMarkerClick(point);
          }
        };
        request.send();
      };

      var successCallback = function(position){
        var x = position.coords.latitude;
        var y = position.coords.longitude;
        displayLocation(x,y);
      };

      var errorCallback = function(error){
        var errorMessage = 'Unknown error';
        switch(error.code) {
          case 1:
          errorMessage = 'Permission denied';
          break;
          case 2:
          errorMessage = 'Position unavailable';
          break;
          case 3:
          errorMessage = 'Timeout';
          break;
        }
        document.write(errorMessage);
      };

      var options = {
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0
      };

      //navigator.geolocation.getCurrentPosition(successCallback,errorCallback,options);
    }