//WEATHER
function getAPIdata() {

	var url = 'https://api.openweathermap.org/data/2.5/weather';
	var apiKey ='a72ea895927f300f935ab3cee6d47ab0';
	var city = 'florida';

	// construct request
	var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + city;
	
	// get current weather
	fetch(request)
	
	// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// render weather per day
	.then(function(response) {
		// render weatherCondition
		onAPISucces(response);	
	})
	
	// catch error
	.catch(function (error) {
		onAPIError(error);
	});

}


function onAPISucces(response) {
	// get type of weather in string format
	var type = response.weather[0].description;

	// get temperature in Celcius
	var degC = Math.floor(response.main.temp - 273.15);

	// render weather in DOM
	var weatherBox = document.getElementById('weatherText');
	weatherBox.innerHTML = degC + '&#176;C <br>' + type;

	console.log(response);
}


function onAPIError(error) {
	console.error('Request failed', error);
	var weatherBox = document.getElementById('weatherText');
	weatherBox.className = 'hidden'; 
}

// init data stream
getAPIdata();

//KLOK
function showTime(){
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
	
	var day =  date.getDate();
	var month = date.getMonth() + 1; 
	var year = date.getFullYear();
	
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("timeText").innerHTML = time;
	
    
    setTimeout(showTime, 1000);
    
}

showTime();


//MAP
// Set api token
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FtemVzYWhpbiIsImEiOiJja21rbTYxbGoxMm92MnBuYXI4amlsbTB2In0.uEkCsJQ8Ztnf6iWmS1rnoQ';

// Initialate map
var map = new mapboxgl.Map({
  container: 'mapImg',
  style: 'mapbox://styles/mapbox/streets-v11',

  // Positioning the map on a certain longitute + latitude and zooming in
  center: [4.322840, 52.067101],
  zoom: 15,
});

var popup = new mapboxgl.Popup().setHTML('<h3>De Haagse Hogeschool</h3><p>Is momenteel dicht.</p>');

// Adding a marker based on lon lat coordinates
var marker = new mapboxgl.Marker()
  .setLngLat([4.324439, 52.067200])
  .setPopup(popup)
  .addTo(map);