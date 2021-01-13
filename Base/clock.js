// 연결된 HTML문서에서 .js-clock 이름의 class를 가진 요소를 가져온다.
// 그 가져온 요소안에서, h1 요소를 가져온다.
const clockContainer = document.querySelector(".js-clock"),
clockTitle = clockContainer.querySelector("h1");    
// new Date() = 순서대로 (요일 월 일 년 시:분:초 (현지옵션)) 인 객체 생성
// Date() 객체안에, 여러 메소드(.getMinutes,.getHours,.getSeconds 처럼 시,분,초를 담는 메소드 외에 여러 메소드 존재)
// ClockTitle에 담긴요소(h1)에 해당하는 곳에, innerText로 인해 ``(벡틱) 내용이 들어간다.
// ``(백택) 과 관련한 Link = https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals
function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();

    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours} : ${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
}
// init()이란 함수는, 시작은 getTime으로 정의한 대로 한번, 현재시간을 띄워준다.
// 그 후로는, setInterval()을 통해, 특정 시간 이후에 반복적으로, 매개변수로 넘긴 함수를 재실행하면서, 현재 시간을 띄워주는것처럼 보이게한다.
function init() {
    getTime();
    setInterval(getTime,1000);
}
// clock.js가 실행되면 실질적으로 실행되는 부분
init()
