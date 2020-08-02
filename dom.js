let variable = {
    bool: true,
}

function show1(element) {
    // console.log(element.dataset.index);
    let index = element.dataset.index;
    let b = document.querySelectorAll(".head_music");
    let a = b[index];
    this.change(a, element);
}

function change(a, element) {
    // console.log(element.parentElement);
    if (a.style.display === "none" || a.style.display === "") {
        a.style.display = "inline-block";
        element.src = "img/尖括号下.png";
    } else {
        a.style.display = "none";
        element.src = "img/尖括号右.png";
    }
}

// let bool = true;
// let move_id;

// function move(event, element) {
//     console.log(event);
//     console.log(element);
//     console.log(element.id);
//     move_id = element.id;
//     event.dataTransfer.setData("Text", event.target.id);
// }
function move(event) {
    // console.log(window.screen.availHeight);
    // // console.log(clientHeight);
    // console.log(window.screen.height);
    // console.log(window.screen.width);
    // console.log(event);
    event.dataTransfer.setData("Text", event.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    // console.log(data);
    // console.log(ev.target);
    // console.log(ev.target.children);
    // console.log(ev.target.childElementCount);
    // console.log(ev.target.children.length);
    // if (ev.target.children.length > 0) {
    //     console.log("a");
    // } else {
    // console.log(variable.bool);
    if (variable.bool) {
        ev.target.appendChild(document.getElementById(data));
        variable.bool = false;
    }
    // }
    // let a = document.getElementById(data);
    // a.style.cssText = "width: 500px;height: 400px";
}

function drop2(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    // console.log(ev.target);
    // console.log(ev.target.dataset.id);
    let data_id = ev.target.dataset.id;
    // console.log(data);
    // console.log(variable.bool);
    if (!variable.bool && data === data_id) {
        ev.target.appendChild(document.getElementById(data));
        variable.bool = true;
    }
}
// 设置一个全局互斥变量，以防止多次拖动的bug

// function drop2(ev) {
//     ev.preventDefault();
//     var data = ev.dataTransfer.getData("Text");
//     ev.target.appendChild(document.getElementById(data));
//     console.log(data);
//     // let a = document.getElementById(data);
//     // a.style.cssText = "width: 140px;height: 100px";
// }

function show2(element) {
    // console.log(element.dataset.index2);
    let index2 = element.dataset.index2;
    let b = document.querySelectorAll(".head_end_video");
    let a = b[index2];
    // console.log(a.parentElement.children[0]);
    // console.log(a.parentElement.children[0].children[1]);
    let c = a.parentElement.parentElement.children[0].children[1];
    // let s = a.parentElement;
    // let c = document.querySelector(s.children);
    // console.log(c);
    this.change2(a, c);
}

function change2(a, element) {
    // console.log(element.parentElement);
    if (a.style.display === "none" || a.style.display === "") {
        a.style.display = "inline-block";
        element.src = "img/尖括号下.png";
    } else {
        a.style.display = "none";
        element.src = "img/尖括号左.png";
    }
}


function playaudio(event) {
    let arr = document.querySelectorAll("audio");
    // console.log(arr);
    // if (event.keyCode === 81) {
    //     arr[0].play();
    // }
    for (i = 0; i < arr.length; i++) {
        arr[i].currentTime = 0;
        arr[i].pause();
    }
    for (i = 0; i < arr.length; i++) {
        // console.log(i);
        // console.log(arr[i].dataset.keynub);
        // console.log(typeof (arr[i].dataset.keynub));
        // console.log(typeof (event.keyCode));
        if (parseInt(arr[i].dataset.keynub) === event.keyCode) {
            // console.log(arr[i]);
            arr[i].play();
        }
    }
}


