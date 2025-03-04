let contador = 0;
let input = document.getElementById("inputTarefa");
let btnAdd = document.getElementById("btn-add");
let main = document.getElementById("areaLista");

// Adiciona uma nova tarefa
function addTarefa() {
  let valorInput = input.value.trim();
  
  if (valorInput !== "") {
    contador++;
    let novaTarefa = {
      id: contador,
      nome: valorInput,
      concluida: false
    };

    let listaTarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    listaTarefas.push(novaTarefa);
    localStorage.setItem("tarefas", JSON.stringify(listaTarefas));

    renderTarefas();
    input.value = "";
    input.focus();
  }
}

// Renderiza as tarefas salvas no localStorage
function renderTarefas() {
  let listaTarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  main.innerHTML = "";

  listaTarefas.forEach((tarefa) => {
    let novoItem = `<div id="${tarefa.id}" class="item ${tarefa.concluida ? 'clicado' : ''}">
      <div onclick="marcarTarefa(${tarefa.id})" class="item-icone">
        <i id="icone_${tarefa.id}" class="mdi ${tarefa.concluida ? 'mdi-check-circle' : 'mdi-circle-outline'}" class="oo" ></i>
      </div>
      <div onclick="marcarTarefa(${tarefa.id})" class="item-nome">
        ${tarefa.nome}
      </div>
      <div class="item-botao">
        <button onclick="deletar(${tarefa.id})" class="delete">
          <i class="mdi mdi-delete"></i>
        </button>
      </div>
    </div>`;
    main.innerHTML += novoItem;
  });

  // Atualiza o contador para evitar conflitos de ID
  contador = listaTarefas.length > 0 ? Math.max(...listaTarefas.map(t => t.id)) : 0;
}

// Marca ou desmarca uma tarefa como concluída
function marcarTarefa(id) {
  let listaTarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  let tarefa = listaTarefas.find(t => t.id === id);

  if (tarefa) {
    tarefa.concluida = !tarefa.concluida;
    localStorage.setItem("tarefas", JSON.stringify(listaTarefas));
    renderTarefas();
  }
}

// Deleta uma tarefa do localStorage
function deletar(id) {
  let listaTarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  listaTarefas = listaTarefas.filter(t => t.id !== id);
  localStorage.setItem("tarefas", JSON.stringify(listaTarefas));

  renderTarefas();
}

// Adiciona a tarefa ao pressionar "Enter"
input.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addTarefa();
  }
});

// Carrega as tarefas ao abrir o site
document.addEventListener("DOMContentLoaded", renderTarefas); 