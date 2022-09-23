function loadTodolists(type = "", checked = false) {
  table.innerHTML = "";
  todolist.forEach(function (todo) {
    if (todo.status === type) {
      insertRow(todo.id, todo.name, false, checked);
    }
  });
}

function deleteTodolists() {
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
  todoIndex = todolist.findIndex((todo) => todo.id === id);
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
  cell1.setAttribute("class", "text-center");

  cell1.innerHTML =
    checked === false
      ? `<input type="checkbox" id="checkbox${id}" onclick="hideRow(this, ${id})">`
      : `<input type="checkbox" id="checkbox${id}" onclick="hideRow(this, ${id})" checked>`;
  cell2.setAttribute("contenteditable", true);
  cell2.innerHTML = `<input type="input" class="input-todolist" id="input-todolist${id}" value="${name}" oninput="editTodolist(${id})">`;
}

function hideRow(checkbox, id) {
  todoIndex = todolist.findIndex((todo) => todo.id === id);
  todolist[todoIndex].status = checkbox.checked === false ? "notFinished" : "finished";
  localStorage.setItem("todolist", JSON.stringify(todolist));
  document.getElementById(`todolist${id}`).className = "d-none";
}
