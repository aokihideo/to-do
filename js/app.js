// selecionar os Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const lista = document.getElementById("list");
const input = document.getElementById("input");

// class names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// variaveis
let LIST, id;

// load armazenamento local
let data = localStorage.getItem("TODO");

//checar se tem o data está vazio
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; //"seta" o id para o da ultima lista
    loadList(LIST); // 'loada a lista para a interface
}else{
    //se tiver data
    LIST = [];
    id = 0;
}

// carrega os itens para a interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// limpa o armazenamento local
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})

// mostra o dia de hoje
const options = {weekday:"long", month:"short", day:"numeric"};
const hoje = new Date();

dateElement.innerHTML = hoje.toLocaleDateString("pt-BR", options);

// function de tarefas
function addToDo(toDo, id, done, trash){

    if(trash){return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    
    const item = `
        <li class="item">
            <i class="fa ${DONE} co" job="complete" id="${id}"></i>
            <p class="text ${LINE}">${toDo}</p> 
            <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
        </li>
    `;
    const position = "beforeend";

    lista.insertAdjacentHTML(position, item);
}

// adicionar um item ao apertar a tecla Enter
document.addEventListener("keyup", function(even){if(event.keyCode == 13){
    const toDo = input.value;

    // se o input não estiver vazio
    if(toDo){
        addToDo(toDo, id, false, false);

        LIST.push({
            name : toDo,
            id : id,
            done : false,
            trash : false
        });

        localStorage.setItem("TODO", JSON.stringify(LIST));

        id++;
    }
    input.value = ""
}
});

// tarefa feita
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remover tarefa
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

// escolher itens criados dinamicamente
lista.addEventListener("click", function(event){
    const element = event.target; //retorna o elemento clicado para a lista
    const elementJob = element.attributes.job.value; //complete or delete

    if(elementJob == "complete"){
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }

    localStorage.setItem("TODO", JSON.stringify(LIST));
});