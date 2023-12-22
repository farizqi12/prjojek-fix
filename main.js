
function add(){
    const todo = document.getElementById('todo')
    //mengambil nilai dari text-box
    let newText = document.getElementById('new-text');
    //menambah list kedalam ul
    // let li = document.createElement('li');
    // let txt = document.createTextNode(newText.value); 

    // li.appendChild(txt);
    // todo.appendChild(li)

    let newtodo = "<li> <span>" + newText.value + "</span></li>"
}