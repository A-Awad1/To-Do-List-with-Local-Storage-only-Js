let btnAdd = document.querySelector(".btnAdd");
let input = document.querySelector("input");
let sectionTasks = document.getElementsByClassName("section-tasks")[0];

var getLocal = [];

if (
  window.localStorage.getItem("tasks") &&
  window.localStorage.getItem("tasks") !== "[]"
) {
  getLocal = JSON.parse(window.localStorage.getItem("tasks"));
  var id = getLocal[getLocal.length - 1]["idValue"] + 1;
  var localValue = getLocal;
  addTasks();
} else {
  var id = 12345678101;
  var localValue = [];
}

function addTasks() {
  for (let i = 0; i < getLocal.length; i++) {
    let task = document.createElement("div");
    let p = document.createElement("p");
    let btnDelete = document.createElement("button");
    sectionTasks.appendChild(task);
    task.appendChild(p);
    task.appendChild(btnDelete);

    task.style.display = "flex";
    task.style.justifyContent = "space-between";
    task.style.alignItems = "center";
    task.style.backgroundColor = "#fff";
    task.style.padding = "5px";
    p.style.flex = "1";
    btnDelete.style.fontSize = "14px";
    btnDelete.style.padding = "2px 4px";
    btnDelete.innerHTML = "Delete";
    btnDelete.className = "btnDelete";

    p.innerHTML = getLocal[i]["title"];

    btnDelete.onclick = function () {
      for (let j = 0; j < sectionTasks.children.length; j++) {
        if (task === sectionTasks.children[j]) {
          var indexNumber = j;
          break;
        }
      }
      localValue.splice(indexNumber, 1);
      window.localStorage.setItem("tasks", JSON.stringify(localValue));
      task.remove();
    };
  }
}

btnAdd.onclick = function () {
  if (input.value.trim() !== "") {
    let taskValue = {
      idValue: id,
      title: input.value,
    };

    localValue.push(taskValue);
    window.localStorage.setItem("tasks", JSON.stringify(localValue));

    getLocal = JSON.parse(window.localStorage.getItem("tasks"));

    sectionTasks.innerHTML = "";

    addTasks();

    id++;
  }
};
