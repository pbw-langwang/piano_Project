let variable = {
    bool: true,
    pli: ''//不能只写一个pli，必须赋值，即使是空
}
//es6的命名空间

function show1(element) {
    let index = element.dataset.index;
    let b = document.querySelectorAll(".head_music");
    let a = b[index];
    // 通过data-index来知道点击的是哪一个
    this.change(a, element);
}

function change(a, element) {
    if (a.style.display === "none" || a.style.display === "") {
        a.style.display = "inline-block";
        element.src = "img/尖括号下.png";
    } else {
        a.style.display = "none";
        element.src = "img/尖括号右.png";
    }
}


function move(event) {
    event.dataTransfer.setData("Text", event.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    // 阻止浏览器对拖动的默认处理，但是firefox有点小bug
    var data = ev.dataTransfer.getData("Text");
    if (variable.bool) {
        ev.target.appendChild(document.getElementById(data));
        variable.bool = false;
        // 添加元素后，设置互斥变量，防止其它再次拖入造成bug
    }
}

function drop2(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    let data_id = ev.target.dataset.id;
    if (!variable.bool && data === data_id) {
        // 通过id 和 data-id的对应关系，来确定是否可以移入
        ev.target.appendChild(document.getElementById(data));
        variable.bool = true;
    }
}
// 设置一个全局互斥变量，以防止多次拖动的bug

function show2(element) {
    let index2 = element.dataset.index2;
    let b = document.querySelectorAll(".head_end_video");
    let a = b[index2];
    let c = a.parentElement.parentElement.children[0].children[1];
    // c是获取到video父元素的父元素中的img
    this.change2(a, c);
}

function change2(a, element) {
    if (a.style.display === "none" || a.style.display === "") {
        // 第一次a.style.display是空值
        a.style.display = "inline-block";
        element.src = "img/尖括号下.png";
    } else {
        a.style.display = "none";
        element.src = "img/尖括号左.png";
    }
}


function playaudio(event) {
    let arr = document.querySelectorAll("audio");
    for (i = 0; i < arr.length; i++) {
        arr[i].currentTime = 0; //设置时间为0，并暂停全部
        arr[i].pause();
        if (variable.pli) {//把variable换成this也可以
            variable.pli.style.setProperty("background-color", "white");
        }
    }
    for (i = 0; i < arr.length; i++) {
        if (parseInt(arr[i].dataset.keynub) === event.keyCode) {
            //通过keynub和keyCode的对应关系，判断哪一个播哦
            arr[i].play();
            variable.pli = arr[i].parentElement;
            variable.pli.style.setProperty("background-color", "rgb(128, 128, 128)");
        }
    }
}


