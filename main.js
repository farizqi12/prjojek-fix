// menampilkan tanggal dalam navbar
var dt = new Date();
document.getElementById("waktu").innerHTML = dt.toLocaleDateString();

// deklarasi fungsi bernama toggle dengan menerima parameter el yaitu value itu sendiri
function toggle(el) {
  // done adalah nama class yang akan ditambahkan dalam file CSS
  el.classList.toggle("done");
}
// deklarasi fungsi bernama remove dengan menerima parameter el yaitu value itu sendiri
function remove(el) {
  // menggunakan parentElement karena [x] adalah child dari span toggle
  // sehingga ketika click [x] yang terhapus x itu sendiri dan value dari toggle juga
  el.parentElement.remove();

  const sortedTasks = bubbleSort(tasks);
  updateUI(sortedTasks);
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

      // Membandingkan tahun, bulan, dan hari secara terpisah
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
  // mengambil nilai dari ul dengan ID todo dan
  // di masukkan kedalam variabel const todo
  const todo = document.getElementById("todo");
  //mengambil nilai dari text-box
  let newText = document.getElementById("new-text");
  let newDeadline = document.getElementById("deadline").value;

  tasks.push({ title: newText.value, deadline: newDeadline });

  const sortedTasks = bubbleSort(tasks);
  updateUI(sortedTasks);

  //mengosongkan box
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

function remove(el) {
  el.parentElement.remove();
}
