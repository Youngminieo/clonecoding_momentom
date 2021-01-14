// 날씨 적용을 위해, 위도,경도 가져오기 (geolocation 객체 사용)
// localStorage에 위치정보를 영구적저장하기위해, COORDS변수에 키 "coords"를 저장
// API_KEY = openweathermap 사이트에 내 계정에따른 API key 값을 복사해온것
const weather = document.querySelector(".js-weather");
const API_KEY = "d95a7199bf52207f3aa3c5803153d259";
const COORDS = "coords";

// fetch() = 해당 API사이트에서 제공하는 링크로, 접근해서 "데이터"를 가져옴
// then() = JS 함수인데, then 앞에 메소드의 기능이 다 끝나면, 그 다음 실행됨을 의미
function getWeather(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        console.log(json);
        const temperature = json.main.temp;
        const country = json.sys.country;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place} @ ${country}`;
    });
}

// localStorage에 coordsObj 정보영구저장 (stringify로 string 형태로)
function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// 위치정보를 잘 가져왔을 경우실행되는 메소드 (position객체에서 위도와 경도 정보면 가져와서, 객체로 만듬)
function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude : latitude,
        longitude : longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

// 위치정보를 잘 가져오지 못한경우, 에러메시지 출력 메소드
function handleGeoError(){
    console.log("Cant aceess Geo location")
}

// 위치정보를 가져오는 실질적인 메소드, navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}

// 현재, localStorage에 위치정보가 있나 보고, 없으면, 위치정보 물어서 가져오고, 
// 있으면, localStorage에 있는 위도와 경도 정보를 통해서, openweatherMap API사이트에서 제공하는 형식으로, 내가 원하는 정보를 가져와서, getWeather() 함수에서 뿌려준다.
function init(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        // getWeather()
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

init();