let variable = {
  bool: true,
  pli: "", //不能只写一个pli，必须赋值，即使是空
  array: [],
};
//es6的命名空间

function show1(element) {
  let index = element.dataset.index;
  let b = document.querySelectorAll(".head_music");
  let a = b[index];
  // 通过data-index来知道点击的是哪一个
  this.change(a, element);
}

function change(a, element) {
  //   console.log(a, element.childNodes);
  if (a.style.display === "none" || a.style.display === "") {
    a.style.display = "inline-block";
    element.childNodes[1].style.transform = "rotate(90deg)";
  } else {
    a.style.display = "none";
    element.childNodes[1].style.transform = "rotate(0deg)";
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
  var data = ev.dataTransfer.getData("Text");
  if (variable.bool) {
    ev.target.appendChild(document.getElementById(data));
    variable.bool = false;
    // 添加元素后，设置互斥变量，防止其它再次拖入造成bug
  }
}

function drop2(ev) {
  ev.preventDefault();
  ev.stopPropagation();
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
  let c = a.parentElement.children[0].children[1];
  // c是获取到video父元素中的img
  this.change2(a, c);
}

function change2(a, element) {
  if (a.style.display === "none" || a.style.display === "") {
    // 第一次a.style.display是空值
    a.style.display = "inline-block";
    element.style.transform = "rotate(-90deg)";
  } else {
    a.style.display = "none";
    element.style.transform = "rotate(0deg)";
  }
}

// 音频可视化
const cvs = document.querySelector("canvas");
const ctx = cvs.getContext("2d");
// 初始化canvas
function initCvs() {
  cvs.width = window.innerWidth * devicePixelRatio;
  cvs.height = (window.innerHeight / 5) * devicePixelRatio;
}
initCvs();
let dataArr, analyser;
let cache1 = new WeakMap();
let cache3 = new WeakMap();

// 把波形画上canvas
function draw() {
  requestAnimationFrame(draw);
  // 清空画布
  const { width, height } = cvs;
  ctx.clearRect(0, 0, width, height);
  if (analyser) {
    // 分析器节点分析出数据到数组中
    analyser.getByteFrequencyData(dataArr);
    // 后端数据几乎没有，放大前面
    const len = dataArr.length / 2;
    // 画对称的，所以还要除以2
    const barwidth = width / len / 2;
    ctx.fillStyle = "red";
    for (let i = 0; i < len; i++) {
      const data = dataArr[i];
      const barheight = (data / 255) * height;
      const x1 = i * barwidth + width / 2;
      const x2 = width / 2 - (i + 1) * barwidth;
      const y = height - barheight;
      ctx.fillRect(x1, y, barwidth - 2, barheight);
      ctx.fillRect(x2, y, barwidth - 2, barheight);
    }
  }
}
draw();

function playaudio(event) {
  let arr = document.querySelectorAll("audio");
  if (variable.pli) {
    //把variable换成this也可以
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
      //通过keynub和keyCode的对应关系，判断哪一个播放
      arr[i].play();
      arr[i].onplay = function () {
        // 初始化
        // cache3防止报错 Failed to execute 'connect' on 'AudioNode': cannot connect to an AudioNode belonging to a different audio context.
        let audCtx;
        if (cache3.has(arr[i])) {
          audCtx = cache3.get(arr[i]);
        } else {
          audCtx = new AudioContext(); // 创建音频上下文
          cache3.set(arr[i], audCtx);
        }
        // cache1防止报错，重复创建createMediaElementSource
        let source;
        if (cache1.has(arr[i])) {
          source = cache1.get(arr[i]);
        } else {
          source = audCtx.createMediaElementSource(arr[i]); // 创建音频源 节点
          cache1.set(arr[i], source);
        }
        analyser = audCtx.createAnalyser(); // 创建分析器
        analyser.fftSize = 512; // 必须是2的n次幂，默认是2048，较大
        // 创建数组，接收分析器节点分析的数据
        dataArr = new Uint8Array(analyser.frequencyBinCount); // 不用512是因为分析器输出的是两个对称的数据
        source.connect(analyser); // 将音频源给分析器 --》 分析器节点可以把音频转化为频率图
        analyser.connect(audCtx.destination); // 给输出设备
      };
      // 保存最近按的5个，如果超过就删除前一个在末尾加上新来的
      if (variable.array.length < 6) {
        variable.array.push(parseInt(arr[i].dataset.keynub));
      } else {
        variable.array.shift();
        variable.array.push(parseInt(arr[i].dataset.keynub));
      }
      // console.log(variable.array);
      variable.pli = arr[i].parentElement;
      variable.pli.style.setProperty("background-color", "rgb(128, 128, 128)");
    }
  }
}
