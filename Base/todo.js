// html 파일에서, 해당 이름으로 된, 요소들의 정보를 가져온다.
const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

// TODOS_LS = localStorage에 키값
// toDos는 TODOS_LS 키값에 해당하는 object array 
const TODOS_LS = "toDos";
const toDos = [];

function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

// 5. li , button(삭제버튼) , span 을 createElement로 만든다. 
// span에 매개변수로 들어온 text(즉, input-text에서 입력된 텍스트)를 반영하고
// li 에 button과 span을 넣어주고, 마지막에 toDoList(html의 ul)에 넣어준다.
// 우리가 할거는 localStorage에 TODOS_LS키에 해당하는 object객체배열을 통해, 투두리스트를 불러오는거다. (새로고침해도 그대로)
// 이는, 매번, 추가되는 투두리스트가 추가될때마다 브라우저에만 보여주는게 아니라, localStorage에 배열에 추가된 정보를 계속 업데이트하는 식이여야한다.

function printToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.innerText = "❌";
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId; 
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id : newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

// 4. 이벤트가 들어온 상태를 유지한다.
// 현재 input-text에 입력된 값을, currentValue란 변수에 넣는다.
// 그 값을 토대로. printToDo() 호출하고, 현재 input-text값을 빈값으로 만든다.
function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    printToDo(currentValue);
    toDoInput.value = "";
}

// 2. localStorage에 TODOS_LS 변수안에 키에 해당하는 value를 가져온다.
// 값이 비어있지 않을 경우, 현재 localStorage에 TODOS_LS 변수에있는 키에, 해당하는 값을 가져온다.
// 그 값이 비어있지 않은경우, JSON.parse()를 이용해서 string데이터 -> object데이터로 대입해놓는다.
// parsedToDos 가 object array임으로, foreach() 함수 적용이 가능하다.

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            printToDo(toDo.text);
        });
    }
}

// 1.loadToDos() 호출
// 3. toDoForm은 input-text 인데, submit에 대한 이벤트가 있다.
function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

// 실제 todo.js 실행시 호출되는 부분
init();