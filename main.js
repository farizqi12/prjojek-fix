var dt = new Date();
document.getElementById("waktu").innerHTML = dt.toLocaleDateString();

function toggle(el) {
  el.classList.toggle("done");
}

function remove(el) {
  const taskElement = el.parentElement;
  const deadlineAttribute = taskElement.getAttribute("data-deadline");

  // Remove the task from the tasks array
  tasks = tasks.filter(task => task.deadline !== deadlineAttribute);

  // Update the UI with the modified tasks array
  const sortedTasks = bubbleSort(tasks);
  updateUI(sortedTasks);

  // Remove the task element from the DOM
  taskElement.remove();
}

var tasks = [];

function bubbleSort(tasks) {
  const len = tasks.length;

  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      const dateA = new Date(tasks[j].deadline);
      const dateB = new Date(tasks[j + 1].deadline);

      const yearA = dateA.getFullYear();
      const monthA = dateA.getMonth();
      const dayA = dateA.getDate();

      const yearB = dateB.getFullYear();
      const monthB = dateB.getMonth();
      const dayB = dateB.getDate();

      if (yearA > yearB || (yearA === yearB && (monthA > monthB || (monthA === monthB && dayA > dayB)))) {
        const temp = tasks[j];
        tasks[j] = tasks[j + 1];
        tasks[j + 1] = temp;
      }
    }
  }

  return tasks.reverse();
}

function add() {
  const todo = document.getElementById("todo");
  let newText = document.getElementById("new-text");
  let newDeadline = document.getElementById("deadline").value;

  // Validasi: Pastikan teks dan tanggal diisi sebelum menambahkan tugas baru
  if (newText.value.trim() === "" || newDeadline.trim() === "") {
    alert("Harap isi teks dan tanggal dengan benar!");
    return;
  }

  tasks.push({ title: newText.value, deadline: newDeadline });

  const sortedTasks = bubbleSort(tasks);
  updateUI(sortedTasks);

  newText.value = "";
  document.getElementById("deadline").value = "";
}


function updateUI(sortedTasks) {
  const todo = document.getElementById("todo");
  todo.innerHTML = "";

  sortedTasks.forEach(function (task) {
    let newtodo =
      `<b><li data-deadline="${task.deadline}"><span onclick='toggle(this)'>${task.title}</span>` +
      `<span onclick='remove(this)'> [x] </span> Deadline: ${task.deadline}</li></b>`;

    todo.insertAdjacentHTML("afterbegin", newtodo);
  });
}

function toggle(el) {
  el.classList.toggle("done");
}

