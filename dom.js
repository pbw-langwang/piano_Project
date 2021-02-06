const variable = {
        bool: true,
        pli: '', //不能只写一个pli，必须赋值，即使是空
        array: [],
    }
    //es6的命名空间

function show1(element) {
    const index = element.dataset.index;
    const b = document.querySelectorAll(".head_music");
    const a = b[index];
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
    ev.stopPropagation();
}

function drop(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    // 阻止浏览器对拖动的默认处理，但是firefox有点小bug
    // 加上ev.stopPropagation();已解决firefox的bug
    const data = ev.dataTransfer.getData("Text");
    if (variable.bool) {
        ev.target.appendChild(document.getElementById(data));
        variable.bool = false;
        // 添加元素后，设置互斥变量，防止其它再次拖入造成bug
    }
}

function drop2(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const data = ev.dataTransfer.getData("Text");
    const data_id = ev.target.dataset.id;
    if (!variable.bool && data === data_id) {
        // 通过id 和 data-id的对应关系，来确定是否可以移入
        ev.target.appendChild(document.getElementById(data));
        variable.bool = true;
    }
}
// 设置一个全局互斥变量，以防止多次拖动的bug

function show2(element) {
    const index2 = element.dataset.index2;
    const b = document.querySelectorAll(".head_end_video");
    const a = b[index2];
    const c = a.parentElement.children[0].children[1];
    // c是获取到video父元素中的img
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
    const arr = document.querySelectorAll("audio");
    if (variable.pli) { //把variable换成this也可以
        // 如果有变了颜色的，就改回其颜色
        variable.pli.style.setProperty("background-color", "white");
    }
    for (let i = 0; i < variable.array.length; i++) {
        // 判断最近5个中有没有按到的和正在按的相同，如果有就暂停并归零
        if (variable.array[i] === event.keyCode) {
            for (let j = 0; j < arr.length; j++) {
                if (parseInt(arr[j].dataset.keynub) === event.keyCode) {
                    arr[j].currentTime = 0; //设置时间为0，并暂停全部
                    arr[i].pause();
                }
            }
        }
    }
    for (let i = 0; i < arr.length; i++) {
        if (parseInt(arr[i].dataset.keynub) === event.keyCode) {
            //通过keynub和keyCode的对应关系，判断哪一个播哦
            arr[i].play();
            // 保存最近按的5个，如果超过就删除前一个在末尾加上新来的
            if (variable.array.length < 6) {
                variable.array.push(parseInt(arr[i].dataset.keynub));
            } else {
                variable.array.shift();
                variable.array.push(parseInt(arr[i].dataset.keynub));
            };
            // console.log(variable.array);
            variable.pli = arr[i].parentElement;
            variable.pli.style.setProperty("background-color", "rgb(128, 128, 128)");
        }
    }
}