const API_KEY = '152ba6ac3ac5cc41523ada381a15d0ab';
const API_URL = 'http://api.openweathermap.org/data/2.5/';

// const api = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputLocation.value + '&appid=152ba6ac3ac5cc41523ada381a15d0ab';


const changeElements = (weather) => {
    const image = document.getElementById('weather-image');
    image.src = `assets/icons/solid-white/svg/${weather.main}.svg`;

    const temp = document.getElementById('temp-container');
    temp.innerHTML = `Temperature : ${weather.temp}°C`;

    const hum = document.getElementById('decreption-container');
    hum.innerHTML = `Description : ${weather.descp}`;
}

const Errors = errr => {
	weatherNavigator.innerHTML = '<p> ' + errr + ' </p>';
	weatherNavigator.style.display = 'block';
}

const showPosition = pos => {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	const url = `${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
	fetch(url)
		.then(
			response => {
				let data;
				if (response.ok) {
					data = response.json();
				} else {
					throw 'Please Select a valid country';
				}
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
			},
			err => {
				Errors(err);
			},
		)
};

const getCurrenWeatherPosition = () => {
	if ('geolocation' in navigator) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		Errors('no Geolocation detected');
	}
};





function fetchData(api) {}

DynamicLocation.addEventListener('click', function() {
	weatherNavigator.style.display = 'none';
	fetchData(api);
});

//     // .catch((error)=>{
//     //     console.log("error");

//     // })

// });
// }

tempurature.addEventListener('click', function() {
	if (tempur == 'k') {
		weather.temp = weather.temp - 273;
		this.innerHTML = '<p>' + weather.temp + ' °<span>  C</span></p> ';
		tempur = 'c';
	} else {
		weather.temp = weather.temp + 273;
		this.innerHTML = '<p>' + weather.temp + ' °<span>  K</span></p> ';
		tempur = 'k';
	}
});
