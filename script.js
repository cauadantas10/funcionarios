const modal = document.querySelector(".modal-container"),
  tbody = document.querySelector("tbody"),
  sNome = document.querySelector("#m-nome"),
  sFuncao = document.querySelector("#m-funcao"),
  sSalario = document.querySelector("#m-salario"),
  sJornada = document.querySelector("#m-jornada"),
  btnSalvar = document.querySelector("#btnSalvar");

let id, items = [];

const API_URL = 'mongodb+srv://admin:<password>@cluster0.htauc1k.mongodb.net/';

function openModal(editing = false, index = 0) {
  modal.classList.add("active");
  modal.onclick = (e) => {
    if (e.target.className.indexOf("modal-container") !== -1) {
      modal.classList.remove("active");
    }
  };

  if (editing) {
    sNome.value = items[index].nome;
    sFuncao.value = items[index].funcao;
    sSalario.value = items[index].salario;
    sJornada.value = items[index].jornada;
    id = index;
  } else {
    sNome.value = "";
    sFuncao.value = "";
    sSalario.value = "";
    sJornada.value = "";
    id = undefined;
  }
}

function editItem(index) {
  openModal(true, index);
}

function deleteItem(index) {
  items.splice(index, 1);
  setItemsToLocalStorage();
  loadItems();
}

function insertItem(item, index) {
  let tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
    <td>${item.jornada}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;

  tbody.appendChild(tr);
}

btnSalvar.onclick = (e) => {
  e.preventDefault();

  const newItem = {
    nome: sNome.value,
    funcao: sFuncao.value,
    salario: sSalario.value,
    jornada: sJornada.value
  };

  if (!newItem.nome || !newItem.funcao || !newItem.salario || !newItem.jornada) return;

  if (id === undefined) {
    items.push(newItem);
  } else {
    items[id] = newItem;
  }

  setItemsToLocalStorage();
  modal.classList.remove("active");
  loadItems();
  id = undefined;
};

function loadItems() {
  items = getItemsFromLocalStorage();
  tbody.innerHTML = "";
  items.forEach((item, index) => {
    insertItem(item, index);
  });
}

function getItemsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("dbfunc")) ?? [];
}

function setItemsToLocalStorage() {
  localStorage.setItem("dbfunc", JSON.stringify(items));
}

loadItems();
