//weatherapp
//model
const apikey="bea7a6837277dbecf7a4bc13b0d9c3d8";
const url=(location) =>
`http://api.openweathermap.org/data/2.5/weather?q=${location}&limit=${1}&appid=${apikey}`;

async function getWeatherByLocation(location){
  const resp = await fetch(url(location),{
    origin:"cors"});
  const respData = await resp.json();
  console.log(respData);

  searchWeatherButton(respData);

}
//get input city and call getweatherbylocation function
//controller
function getWeather(){
  let text = document.getElementById("weather-city");
  let city = text.value;
  getWeatherByLocation(city);
}



//view
function ktoC(k){
  let degree = k-273.15;
  return Math.round(degree);
}
function searchWeatherButton(data){
  let degree = ktoC(data.main.temp);
  console.log(data.weather[0].main)
  console.log(degree);
  let temp = document.getElementById("temp-display");
  let city = document.getElementById("city-display");
  let range = document.getElementById("temp-range");
  let weathericon = document.getElementById("weather-icon");
  let weathertype = document.getElementById("weather-type");
  city.innerHTML=`${data.name}`;
  temp.innerHTML=`${degree} °C`;
  let maxtemp = ktoC(data.main.temp_max);
  let mintemp = ktoC(data.main.temp_min);
  range.innerHTML=`${maxtemp} °C - ${mintemp}°C`;
  changeweather(data);
  
}

function changeweather(data){
  let weathertype = data.weather[0].main;
  document.getElementById("weather-type").innerHTML = `${weathertype}`;
  if (weathertype == "Clouds"){
    document.getElementById("weatherapp").style.backgroundImage = "url('/icons/cloudypic.jpg')";
    document.getElementById("weather-icon1").src = "/icons/Clouds.png";
  }
  else if(weathertype == "Clear"){
    document.getElementById("weatherapp").style.backgroundImage = "url('/icons/sunnypic.jpg')";
    document.getElementById("weather-icon1").src = "/icons/Sunny.png";
  }
  else if(weathertype == "Rain"){
    document.getElementById("weatherapp").style.backgroundImage = "url('/icons/rainpic.jpg')";
    document.getElementById("weather-icon1").src = "/icons/Rain.png";
  }
}