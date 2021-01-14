// 날씨 적용을 위해, 위도,경도 가져오기 (geolocation 객체 사용)
// localStorage에 위치정보를 영구적저장하기위해, COORDS변수에 키 "coords"를 저장
const COORDS = "coords";

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
}

// 위치정보를 잘 가져오지 못한경우, 에러메시지 출력 메소드
function handleGeoError(){
    console.log("Cant aceess Geo location")
}

// 위치정보를 가져오는 실질적인 메소드, navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}

// 현재, localStorage에 위치정보가 있나 보고, 없으면, 위치정보 물어서 가져오고, 있으면, 뭔가하겠지 ?
function init(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        // getWeather()
    }
}

init();