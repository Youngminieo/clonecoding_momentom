// html 파일에서, 해당 이름으로 된, 요소들의 정보를 가져온다.
const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

// 5. li , button(삭제버튼) , span 을 createElement로 만든다. 
// span에 매개변수로 들어온 text(즉, input-text에서 입력된 텍스트)를 반영하고
// li 에 button과 span을 넣어주고, 마지막에 toDoList(html의 ul)에 넣어준다.
function printToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    const span = document.createElement("span");
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    toDoList.appendChild(li);
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
// 값이 비어있지 않을 경우만 생각
function loadToDos(){
    const toDos = localStorage.getItem(TODOS_LS);
    if (toDos !== null){

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