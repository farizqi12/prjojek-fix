function add() {
  // mengambil nilai dari ul dengan ID todo dan 
  // di masukkan kedalam variabel const todo
  const todo = document.getElementById("todo");
  //mengambil nilai dari text-box
  let newText = document.getElementById("new-text");

  // menambah list kedalam ul
  let newtodo = "<li> <span>" + newText.value + "</span>" +
  "<span> [x] </span>" + 
  "</li>";

  
  // insertAdjacentHTML sebuah metode penempatan HTML ke dalam elemen HTML
  // "afterbegin" parameter yang digunakan untuk menambahkan list pada urutan paling atas
  todo.insertAdjacentHTML('afterbegin', newtodo)

//   mengosongkan box
  newText.value = ""
}