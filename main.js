//Membuat objek Date yang merepresentasikan waktu saat ini
var dt = new Date();
//Mengonversi waktu menjadi string dengan format tanggal lokal dan kemudian memasukkannya ke dalam elemen HTML dengan ID "waktu".
document.getElementById("waktu").innerHTML = dt.toLocaleDateString();

// Menggunakan metode toggle pada properti classList dari elemen el.
// Ini akan menambahkan kelas "done" ke elemen jika tidak ada, atau menghapusnya jika sudah ada.
// Jika elemen sudah memiliki kelas "done", baris ini akan menghapusnya.
// Jika elemen belum memiliki kelas "done", baris ini akan menambahkannya
function toggle(el) {
  el.classList.toggle("done");
}

function remove(el) {
  //Mendapatkan elemen induk (parent) dari elemen tombol hapus (el). Dalam konteks ini, tombol hapus tersebut berada di dalam elemen tugas (<li>).
  const taskElement = el.parentElement;
  //Mendapatkan nilai atribut "data-deadline" dari elemen tugas. Atribut ini digunakan untuk mengidentifikasi tugas yang akan dihapus.
  const deadlineAttribute = taskElement.getAttribute("data-deadline");

  //Menggunakan metode filter untuk membuat array baru (tasks) yang tidak mengandung tugas yang memiliki tanggal deadline sesuai dengan deadlineAttribute
  //Dengan kata lain, tugas dengan tanggal deadline yang sesuai akan dihapus dari array.
  tasks = tasks.filter((task) => task.deadline !== deadlineAttribute);

  //Mengurutkan array tugas yang sudah dimodifikasi menggunakan fungsi bubbleSort dan kemudian memperbarui antarmuka pengguna (UI)
  //dengan memanggil fungsi updateUI dengan array tugas yang sudah diurutkan.
  const sortedTasks = bubbleSort(tasks);
  updateUI(sortedTasks);

  // Menghapus elemen tugas (<li>) dari DOM setelah menghapusnya dari array tugas dan memperbarui UI
  //Ini menghilangkan elemen tugas dari tampilan.
  taskElement.remove();
}
//Deklarasi variabel array bernama tasks
var tasks = [];

function bubbleSort(tasks) {
  //Mendeklarasikan variabel len yang menyimpan panjang (jumlah elemen) dari array tasks
  const len = tasks.length;

  //Loop pertama digunakan untuk melakukan iterasi sebanyak len - 1 kali.
  //Ini mengontrol jumlah perulangan dan membantu menukar elemen-elemen yang perlu diurutkan.
  for (let i = 0; i < len - 1; i++) {
    //Loop kedua melakukan iterasi untuk membandingkan dan menukar pasangan elemen berurutan dalam array.
    for (let j = 0; j < len - 1 - i; j++) {
      //Menggunakan objek Date untuk mengambil tahun, bulan, dan hari dari tanggal deadline setiap tugas.
      const dateA = new Date(tasks[j].deadline);
      const dateB = new Date(tasks[j + 1].deadline);

      const yearA = dateA.getFullYear();
      const monthA = dateA.getMonth();
      const dayA = dateA.getDate();

      const yearB = dateB.getFullYear();
      const monthB = dateB.getMonth();
      const dayB = dateB.getDate();

      //Melakukan pembandingan berdasarkan tanggal deadline menggunakan logika kondisional.
      //Jika tugas A memiliki tanggal deadline yang lebih besar daripada tugas B, maka pertukaran dilakukan.
      if (
        yearA > yearB ||
        (yearA === yearB &&
          (monthA > monthB || (monthA === monthB && dayA > dayB)))
      ) {
        //Melakukan pertukaran elemen menggunakan variabel sementara (temp).
        const temp = tasks[j];
        tasks[j] = tasks[j + 1];
        tasks[j + 1] = temp;
      }
    }
  }
  //Mengembalikan array yang sudah diurutkan dan membalik urutan elemennya.
  //Karena algoritma Bubble Sort mengurutkan dari yang terkecil ke yang terbesar, perlu membalik urutan untuk mendapatkan urutan yang benar
  return tasks.reverse();
}

function add() {
  //Mengambil elemen dengan ID "todo" (daftar tugas)
  //dan nilai dari elemen input untuk teks baru (newText) dan tanggal deadline baru (newDeadline)
  const todo = document.getElementById("todo");
  let newText = document.getElementById("new-text");
  let newDeadline = document.getElementById("deadline").value;

  // Validasi: Pastikan teks dan tanggal diisi sebelum menambahkan tugas baru
  //Melakukan validasi untuk memastikan bahwa teks dan tanggal diisi sebelum menambahkan tugas baru.
  //Jika salah satu input kosong setelah di-trim (menghilangkan spasi di awal dan akhir), tampilkan pesan peringatan dan hentikan eksekusi fungsi dengan return.
  if (newText.value.trim() === "" || newDeadline.trim() === "") {
    alert("Harap isi teks dan tanggal dengan benar!");
    return;
  }

  //Menambahkan objek tugas baru ke dalam array tasks dengan properti title (judul) dan deadline (tanggal deadline) sesuai dengan nilai dari input.
  tasks.push({ title: newText.value, deadline: newDeadline });

  //Menggunakan fungsi bubbleSort untuk mengurutkan array tasks berdasarkan tanggal deadline.
  //Memperbarui antarmuka pengguna (UI) dengan memanggil fungsi updateUI dengan array tugas yang sudah diurutkan.
  const sortedTasks = bubbleSort(tasks);
  updateUI(sortedTasks);

  //Setelah menambahkan tugas,
  //mengosongkan nilai dari input teks dan tanggal untuk mempersiapkan input untuk tugas berikutnya.
  newText.value = "";
  document.getElementById("deadline").value = "";
}

function updateUI(sortedTasks) {
  //Mendapatkan elemen HTML dengan ID "todo" dan menyimpannya dalam variabel todo
  const todo = document.getElementById("todo");
  //Mengosongkan isi dari elemen dengan ID "todo".
  //Hal ini dilakukan agar tugas-tugas yang ada sebelumnya dapat dihapus sebelum memasukkan tugas-tugas yang baru.
  todo.innerHTML = "";

  //Menggunakan metode forEach untuk melakukan iterasi melalui setiap tugas yang sudah diurutkan dalam array sortedTasks
  sortedTasks.forEach(function (task) {
    //Membuat string HTML baru (newtodo) yang mencakup elemen daftar (<li>) dengan atribut data-deadline yang berisi tanggal deadline dari tugas.
    //Menambahkan elemen-elemen lain seperti judul tugas (<span>${task.title}</span>) dan tombol hapus (<span onclick='remove(this)'> [x] </span>).
    //Menggunakan sintaks template string pada JavaScript untuk menyusun string dengan lebih mudah.
    let newtodo =
      `<b><li data-deadline="${task.deadline}"><span onclick='toggle(this)'>${task.title}</span>` +
      `<span onclick='remove(this)'> [x] </span> Deadline: ${task.deadline}</li></b>`;

    //Memasukkan string HTML baru ke dalam elemen dengan ID "todo" pada bagian awal (setelah elemen sebelumnya). 
    //Dengan kata lain, tugas-tugas baru akan ditampilkan di bagian atas daftar tugas yang sudah ada.
    todo.insertAdjacentHTML("afterbegin", newtodo);
  });
}
