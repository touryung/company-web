// 导航的动画与固定, 返回顶部按钮出现的时机
window.addEventListener("scroll", () => {
  /* 
        getBoundingClientRect用于获取元素相对与浏览器视口的位置
            top: '元素顶部相对于视口顶部的距离',
            bottom: '元素底部相对于视口顶部的距离',
            left: '元素左边相对于视口左边的距离',
            right: '元素右边相对于视口左边的距离',
            height: '元素高度',
            width: '元素宽度'
    */
  let height = headerEl.getBoundingClientRect().height;
  if (window.pageYOffset - height > 800) {
    // classList.contains( oldClassName ) 确定元素中是否包含指定的类名
    if (!headerEl.classList.contains("sticky")) {
      headerEl.classList.add("sticky");
    }
  } else {
    headerEl.classList.remove("sticky");
  }
  scrollTop.style.display = window.pageYOffset > 2000 ? "block" : "none";
});

// 数据部分视差动画
window.addEventListener("scroll", () => {
  const bottom = dataSectionEl.getBoundingClientRect().bottom;
  const top = dataSectionEl.getBoundingClientRect().top;
  if (bottom >= 0 && top <= window.innerHeight) {
    dataSectionEl.style.backgroundPosition = `center calc(50% - ${
      bottom / 3
    }px)`;
  }
});

// 头部导航轮播
const glide = new Glide(".glide");
glide.on(["mount.after", "run.after"], () => {
  const caption = captionsEl[glide.index];
  // 调用anime库中的方法
  anime({
    autoplay: true,
    // 执行对象,这里是caption的所有子元素
    targets: caption.children,
    // 透明度从0到变化
    opacity: [0, 1],
    // 动画执行时间400毫秒
    duration: 400,
    easing: "linear",
    // 每个元素出现之间间隔400毫秒, 第一个元素要等待300毫秒之后出现
    delay: anime.stagger(400, { start: 300 }),
    // 第一个元素向下移动40px,最后一个元素向下移动10px,中间的元素向下移动像素值为40~10之间,最后都移动到0
    translateY: [anime.stagger([40, 10]), 0],
  });
});
glide.on("run.before", () => {
  document.querySelectorAll(".slide-caption > *").forEach((el) => {
    el.style.opacity = 0;
  });
});
// 加载轮播组件
glide.mount();

// 成功案例删选动画
const isotope = new Isotope(".cases", {
  // 行模式布局,会把每一行都占满之后才换下一行
  layoutMode: "fitRows",
  // 每一个案例
  itemSelector: ".case-item",
});
filterBtns.addEventListener("click", (e) => {
  let { target } = e;
  const filterOption = target.getAttribute("data-filter");
  if (filterOption) {
    // 把所有按钮的active样式移除
    document.querySelectorAll(".filter-btn.active").forEach((btn) => {
      btn.classList.remove("active");
    });
    // 为当前点击的按钮添加active样式
    target.classList.add("active");
    isotope.arrange({ filter: filterOption });
  }
});

// 滑到可见区缓慢出现
const staggeringOption = {
  delay: 300,
  distance: "50px",
  duration: 500,
  easing: "ease-in-out",
  origin: "bottom",
};
ScrollReveal().reveal(".feature", { ...staggeringOption, interval: 350 });
ScrollReveal().reveal(".service-item", { ...staggeringOption, interval: 350 });
ScrollReveal().reveal(".data-section", {
  beforeReveal: () => {
    anime({
      targets: ".data-piece .num",
      innerHTML: (el) => {
        return [0, el.innerHTML];
      },
      duration: 2000,
      round: 1,
      easing: "easeInExpo",
    });
    dataSectionEl.style.backgroundPosition = `center calc(50% - ${
      dataSectionEl.getBoundingClientRect().bottom / 3
    }px)`;
  },
});

// 点击导航平滑滚动
const scroll = new SmoothScroll('nav a[href*="#"], .scroll-top a[href*="#"]', {
  header: "header",
  offset: 0,
});
// 点击全屏导航之后关闭全屏导航
document.addEventListener("scrollStart", () => {
  if (headerEl.classList.contains("open")) {
    headerEl.classList.remove("open");
  }
});
// 点击探索按钮导航到关于我们
exploreBtnEl.forEach((el) => {
  el.addEventListener("click", () => {
    scroll.animateScroll(document.querySelector("#about-us"));
  });
});
// 小导航按钮点击添加类名
burgerEl.addEventListener("click", () => {
  headerEl.classList.toggle("open");
});
