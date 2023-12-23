var dt = new Date();
document.getElementById("waktu").innerHTML = dt.toLocaleDateString();

function add() {
  // mengambil nilai dari ul dengan ID todo dan 
  // di masukkan kedalam variabel const todo
  const todo = document.getElementById("todo");
  //mengambil nilai dari text-box
  let newText = document.getElementById("new-text");

  // menambah list kedalam ul
  // Membuka elemen span dengan atribut onclick yang memanggil fungsi 'toggle(this)' 
  let newtodo = "<b><li> <span onclick = 'toggle(this)'>" + newText.value + "</span>" +
  "<span onclick = 'remove(this)'> [x] </span>" + 
  "</li></b>";

  
  // insertAdjacentHTML sebuah metode penempatan HTML ke dalam elemen HTML
  // "afterbegin" parameter yang digunakan untuk menambahkan list pada urutan paling atas
  todo.insertAdjacentHTML('afterbegin', newtodo)

//   mengosongkan box
  newText.value = ""
}
// deklarasi fungsi bernama toggle dengan menerima parameter el yaitu value itu sendiri
function toggle(el){
  // done adalah nama class yang akan ditambahkan dalam file CSS
  el.classList.toggle('done')
}
// deklarasi fungsi bernama remove dengan menerima parameter el yaitu value itu sendiri
function remove(el){
  // menggunakan parentElement karena [x] adalah child dari span toggle
  // sehingga ketika click [x] yang terhapus x itu sendiri dan value dari toggle juga
  el.parentElement.remove();
}