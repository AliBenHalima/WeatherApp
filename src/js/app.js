const API_KEY = '152ba6ac3ac5cc41523ada381a15d0ab';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const errname = document.getElementById('Error-id');
// const api = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputLocation.value + '&appid=152ba6ac3ac5cc41523ada381a15d0ab';


const changeElements = (weather) => {
    const image = document.getElementById('weather-image');
    image.src = `assets/icons/solid-white/svg/${weather.main}.svg`;

    const temp = document.getElementById('temp-container');
    temp.innerHTML = `Temperature : ${weather.temp}°C`;

    const hum = document.getElementById('decreption-container');
	hum.innerHTML = `Description : ${weather.descp}`;

	const cityname = document.getElementById("city-title");
	cityname.innerHTML=weather.place ;
	
}

const Errors = errr => {
	weatherNavigator.innerHTML = '<p> ' + errr + ' </p>';
	weatherNavigator.style.display = 'block';
}

function fetchFunction(url){
	fetch(url)
		.then(
			response => {
				let data;
				 if (response.ok) {
					 console.log(response)
					 data = response.json();
					 console.log(data)
					return data;
				 }
				 else{
					errname.style.display="block";
				 }
				 }).then(
					 data =>{
						 console.log(data);
						 
				const weather = {
					lat: data.coord.lat,
					lon: data.coord.lon,
					temp: Math.floor(data.main.temp - 273),
					descp: data.weather[0].description,
					iconId: data.weather[0].id,
					main: data.weather[0].main,
					place: data.name,
				};
				changeElements(weather);
			
					 })		
}

const showPosition = position => {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	const url = `${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
	fetchFunction(url);
		
		
};

function getCurrenWeatherPosition() {
	if ('geolocation' in navigator) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		Errors('no Geolocation detected');
	}
};
function SearchCity(){
	// const cityInput = document.getElementById('input-city');
	const cityInput =$('#input-city option:selected').text();
	const url = `${API_URL}?q=${cityInput}&appid=${API_KEY}`;
	errname.style.display="none";
	fetchFunction(url);
	//changeSelect(cityInput);
	const SelectedName= $('#input-city option:selected').text();
	const cityname = document.getElementById("city-title");
	cityname.innerHTML=SelectedName ;
	console.log(SelectedName);
	
}
function GetData(){
const search = document.getElementById('SearchByName');
const cityInput = document.getElementById('input-city');


const url=`https://raw.githubusercontent.com/samayo/country-json/master/src/country-by-name.json`;
fetch(url)
.then(response => {
	return response.json();
}).then((data) => {
	console.log(data);
	console.log(data[0].country);
	for(let i=0;i<data.length;i++){

	
	 var newOption = new Option(data[i].country, i, false, false);
	 $('.form-control').append(newOption).trigger('change');
	}
}
	

)
.catch(err => {
	console.log(err);
});


// function loadDoc() {
// 	var xhttp = new XMLHttpRequest();
// 	xhttp.onreadystatechange = function() {
// 	  if (this.readyState == 4 && this.status == 200) {
// 	  console.log(this.responseText);
// 	  }
// 	};
// 	xhttp.open("GET", ".\assets\file.json", true);
// 	xhttp.send();
//   }
//   loadDoc();
 }
function changeSelect(cityname){
var cities = {
	
		city1:{id:1,value:"tunis"},city2:{id:"2",value:"sousse"},city3:{id:"3",value:"baja"}
}
const selectElements = document.getElementsByClassName('select2');

// var newOption = new Option(cityname, cities.city1.id, false, false);
// $('.select2').append(newOption).trigger('change');
}
// function fetchData(api) {}

// DynamicLocation.addEventListener('click', function() {
// 	weatherNavigator.style.display = 'none';
// 	fetchData(api);
// });

//     // .catch((error)=>{
//     //     console.log("error");

//     // })

// });
// }

// tempurature.addEventListener('click', function() {
// 	if (tempur == 'k') {
// 		weather.temp = weather.temp - 273;
// 		this.innerHTML = '<p>' + weather.temp + ' °<span>  C</span></p> ';
// 		tempur = 'c';
// 	} else {
// 		weather.temp = weather.temp + 273;
// 		this.innerHTML = '<p>' + weather.temp + ' °<span>  K</span></p> ';
// 		tempur = 'k';
// 	}
// });
