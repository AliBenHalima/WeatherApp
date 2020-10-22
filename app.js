
// var latitude;
// var longitude ;
var data;

var weather ={

    lat:0,
    lon:0,
    place:"",
    temp:0,
    descp:"",
    iconId:0,
    main:""
} 
const weatherNavigator = document.querySelector(".notification");
const image= document.querySelector('.Image');
const tempurature = document.querySelector('.Tempurature');
const temDiscription = document.querySelector('.temDiscription');
const place =  document.querySelector('.location');
const currentLocation = document.getElementById('currentLocation');
const DynamicLocation= document.getElementById('DynamicLocation'); 
const inputLocation = document.getElementById('inputLocation'); 
var tempur="c";
function Errors(errr){
    weatherNavigator.innerHTML= "<p> "+errr+" </p>";
    weatherNavigator.style.display="block";
}

function TestExsistance(){
if ('geolocation' in navigator ){
    navigator.geolocation.getCurrentPosition(showPosition);}
    else{
        Errors("no Geolocation detected");
}
}


  
currentLocation.addEventListener('click',function(){
    TestExsistance();
    showPosition(position);
});
function showPosition(position) {
    let lat=position.coords.latitude ;
  let lon=position.coords.longitude;

   code(lat,lon);

  }
  
function code (latitude,longitude){
    const key="152ba6ac3ac5cc41523ada381a15d0ab";
    // weather.place=navigator.location.
    // console.log(weather);
    // http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY} 
    // let  api=` http://api.openweathermap.org/data/2.5/waether?lat=${latitude}&lon=${longitude}&appid=${key}` 
    // let  api=` http://api.openweathermap.org/data/2.5/forecast?id=${1811281}&APPID=${key} `
    let api='http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=152ba6ac3ac5cc41523ada381a15d0ab';
   
    // let  api="http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=152ba6ac3ac5cc41523ada381a15d0ab"
    // let api=`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=152ba6ac3ac5cc41523ada381a15d0ab`;
   
    /**
     * Using AJAX 
     */
    /*
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
console.log(this.responseText)  ;
 data= JSON.parse(this.responseText);
 weather.lat=data.coord.lat;
 console.log(data)  ;
          weather.lon=data.coord.lon;
          weather.temp= Math.floor(data.main.temp - 273);
          weather.descp = data.weather[0].description;
          weather.iconId = data.weather[0].id;
          weather.main =data.weather[0].main;
          weather.place= data.name;
          changeElements();
        }
        };
        xhttp.open("GET",api, true);
        xhttp.send();
      }
     */ 
    fetchData(api);
}
function fetchData(api){


    fetch(api).then(function(response){
        if(response.ok){
            let data=response.json();
            // console.log(response);
            return data;
        }
       else{
        Errors("Please Select a valid country");
       }
    }).then(function(data){
        weather.lat=data.coord.lat;
         weather.lon=data.coord.lon;
         weather.temp= Math.floor(data.main.temp - 273);
         weather.descp = data.weather[0].description;
         weather.iconId = data.weather[0].id;
         weather.main =data.weather[0].main;
         weather.place= data.name;
      
        
         console.log(weather);
         console.log(data);
         changeElements();
    })
}
DynamicLocation.addEventListener('click',function(){
    weatherNavigator.style.display="none";
const api='https://api.openweathermap.org/data/2.5/weather?q='+inputLocation.value+'&appid=152ba6ac3ac5cc41523ada381a15d0ab';
fetchData(api);
})

//     // .catch((error)=>{
//     //     console.log("error");
      
//     // })

    
   
    
// });
// }


function changeElements(){
    image.innerHTML='<img src="dist/icons/white/png/128x128/'+weather.main+'.png" alt="no image found">';
    tempurature.innerHTML= '<p>'+weather.temp+' °<span>  C</span></p> ' ;
    temDiscription.innerHTML=' <p>'+weather.descp+'</p>';
    place.innerHTML='  <p>'+weather.place+'</p>';
}

tempurature.addEventListener('click',function(){
    if( tempur == "k"){
        weather.temp= weather.temp -273 ;
        this.innerHTML='<p>'+weather.temp+' °<span>  C</span></p> ' ;
        tempur = "c";
    }
        else{
            weather.temp= weather.temp + 273 ;
            this.innerHTML='<p>'+weather.temp+' °<span>  K</span></p> ' ;
            tempur = "k";
        }
    }
);


