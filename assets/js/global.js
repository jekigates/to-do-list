function loadTodolists(type = "", checked = false) {
  table.innerHTML = "";
  todolist.forEach(function (todo) {
    if (todo.status === type) {
      insertRow(todo.id, todo.name, false, checked);
    }
  });
}

function findTodolistIndex(id) {
  return todolist.findIndex((todo) => todo.id === id);
}

function deleteTodolist(id) {
  var todoIndex = findTodolistIndex(id);
  todolist.splice(0, 1);
  hideRow(id, false);
  localStorage.setItem("todolist", JSON.stringify(todolist));
}

function deleteAllTodolists() {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete them!",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("todolist");
      Swal.fire("Deleted!", "Your todolists have been deleted.", "success");
      todolist = [];
      loadTodolists("notFinished");
    }
  });
}

function editTodolist(id) {
  var todoIndex = findTodolistIndex(id);
  todolist[todoIndex].name = document.getElementById(`input-todolist${id}`).value;
  localStorage.setItem("todolist", JSON.stringify(todolist));
}

function insertRow(id = "", name = "", create = false, checked = false) {
  var row = table.insertRow();

  if (create === true) {
    id = todolist.length === 0 ? 0 : todolist[todolist.length - 1].id + 1;
    todolist.push({ id: id, status: "notFinished", name: "" });
    localStorage.setItem("todolist", JSON.stringify(todolist));
  }

  row.id = `todolist${id}`;
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  cell1.setAttribute("class", "text-center");
  cell1.innerHTML =
    checked === false
      ? `<input type="checkbox" id="checkbox${id}" onclick="hideRow(${id})">`
      : `<input type="checkbox" id="checkbox${id}" onclick="hideRow(${id})" checked>`;
  cell2.setAttribute("contenteditable", true);
  cell2.innerHTML = `<input type="input" class="input-todolist" id="input-todolist${id}" value="${name}" oninput="editTodolist(${id})">`;
  cell3.className = "text-center";
  cell3.innerHTML = `<button class="btn btn-outline-danger" onclick="deleteTodolist(${id})">X</button>`;
}

function hideRow(id, changeStatusOnly = true) {
  if (changeStatusOnly) {
    var checkbox = document.getElementById(`checkbox${id}`);
    var todoIndex = findTodolistIndex(id);
    todolist[todoIndex].status = checkbox.checked === false ? "notFinished" : "finished";
    localStorage.setItem("todolist", JSON.stringify(todolist));
  }

  document.getElementById(`todolist${id}`).className = "d-none";
}

function switchTodolist() {
  var btnInsertRow = document.getElementById("btnInsertRow");
  var inputSwitch = document.getElementById("inputSwitch");
  var labelSwitch = document.getElementById("labelSwitch");

  if (inputSwitch.checked) {
    btnInsertRow.disabled = true;
    labelSwitch.innerHTML = "Finished";
    loadTodolists("finished", true);
  } else {
    btnInsertRow.disabled = false;
    labelSwitch.innerHTML = "Not Finished";
    loadTodolists("notFinished");
  }
}
