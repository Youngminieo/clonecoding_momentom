// JS에서 querySelector()는 해당하는 요소 전부를 배열형태로 가져온다.
// => 이는 굉장히 불편하지..내부적인 자식 요소들이 많으면, 배열형태로 그걸 접근해야하니..

// 그래서 사용하는 것은 => local Storage = 작은 정보를 나의 유저들 컴퓨터에 저장하는 방법이다. (?)
// (검사 -> application -> Local Storage로 확인가능)

// localStorage.getItem(key) = localStorage에 있는 key에 해당하는 값을 리턴
// localStorage.setItem(key,value) = localStorage에 key와 value를 설정
const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

// # 2-1-1
// 들어온 text 값을, USER_LS 키의 해당하는 value로 영구 설정하면, 내가 새로고침해도, 그 값이 보존이 되겠지 ?
function saveName(text){
    localStorage.setItem(USER_LS, text);
}

// # 2-1
// input에서 summit된 텍스트 값 기반으로, 일단, Enter키를 누름과 동시에, 다른 영역으로 날라가는 효과를 제어하기위해
// 들어오는 event를 대상으로, preventDefault()를 통해, 그 효과를 무효화시킨다.
// 그 후, currentValue라는 변수에, 현재, 아직 날라가지않은 input.value를 넣고
// 그 값을 다시, paintGreeting(input.value)에 넘겨서 호출한다. => 그럼, 입력된 값으로, 로직을 실행할것이다.
// 추가적으로, 한번은 그렇게 되지만, 새로고침할시, 입력된 currentUser, 그에 해당하는 value 값이 사라지게 되니깐, 그것을 보존해야댐 => saveName() 호출

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

// # 2
// localStorage에 currentUser가 등록안된경우, input에 summit되는 값을, 기반으로 handleSubmit()호출
function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
}

// # 2
// paintGreeting() 을 호출해서, input - text는 사라지고, 입력된 텍스트를 기반으로 localStorage(currentUser)에 해당하는 값을 화면에 보이게 한다.

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

// # 1
// 현재, 나의 localStorage에 USER_LS 라는 변수에 키값이 존재한다. 그 키값에 해당하는 value를 가져오는데
// 그 값이 비어있다. 즉, currentUser 가 현재 등록되어 있지 않음을 의미하면
// askForName() 함수를 실행해서, input-text 에 입력되는 값을 받아와서 등록한다.

// 그게 아니고, USER_LS에 키값이, 즉 사용자가 있다면
function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null){
        // user is not
        askForName();
    }else{
        // user is
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();