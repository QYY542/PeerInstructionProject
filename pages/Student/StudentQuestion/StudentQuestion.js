// pages/question/question.js
Page({
  data: {
    questionText: '一辆质量为1.5吨的汽车以10米/秒的速度行驶在水平路面上。当司机看到前方有障碍物时，立即踩下刹车。如果刹车后汽车以2米/秒²的加速度均匀减速，假设路面光滑且没有摩擦力，请计算汽车完全停下来前行驶的距离。',
    imageSrc: 'http://tmp/PGoUDrBHjgar43b1e0596076b7889cb264753a2fe141.jpg', // 若有相关示意图，可放置图片URL
    options: [
      { option: 'A', text: '25米', selected: false },
      { option: 'B', text: '30米', selected: false },
      { option: 'C', text: '40米', selected: false },
      { option: 'D', text: '50米假设这是长答案假设这是长答案假设这是长答案假设这是长答案假设这是长答案假设这是长答案假设这是长答案假设这是长答案假设这是长答案假设这是长答案假设这是长答案假设这是长答案', selected: false },
    ],
    remainingTime: 60, // 剩余答题时间（秒）
    correctAnswer: 'A', // 正确答案选项
  },
  onOptionTap(e) {
    const index = e.currentTarget.dataset.index;
    const options = this.data.options.map((item, idx) => {
      item.selected = idx === index;
      return item;
    });

    this.setData({ options });
  },

  onSubmit() {
    // 提交答案的处理
    const selectedOptions = this.data.options.filter(option => option.selected);
    console.log('提交的答案是：', selectedOptions);
  },
  
  // 倒计时函数，需要在onLoad或其他生命周期函数中启动
  countDown() {
    let timer = setInterval(() => {
      let time = this.data.remainingTime;
      time--;
      if (time <= 0) {
        clearInterval(timer);
        // 倒计时结束的处理逻辑
        this.onSubmit(); // 可以直接提交答案，或者提醒用户时间已到
      }
      this.setData({ remainingTime: time });
    }, 1000);
  },

  onLoad() {
    this.countDown(); // 开始倒计时
  }
});
