// pages/question/question.js
Page({
  data: {
    questionText: '一辆质量为1.5吨的汽车以10米/秒的速度行驶在水平路面上。当司机看到前方有障碍物时，立即踩下刹车。如果刹车后汽车以2米/秒²的加速度均匀减速，假设路面光滑且没有摩擦力，请计算汽车完全停下来前行驶的距离。',
    imageSrc: 'http://tmp/PGoUDrBHjgar43b1e0596076b7889cb264753a2fe141.jpg', // 若有相关示意图，可放置图片URL

    remainingTime: 60, // 剩余答题时间（秒）


    correctAnswer: 'A', // 正确答案选项
    openTime: 0, // 默认题目开放时间
    timeLeft: 0, // 实际剩余时间
    buttonText: '开放题目', // 按钮文本
    countdownInterval: null, // 存储倒计时的interval
    currentAttempt: 0, // 当前尝试次数
    maxAttempts: 2, // 最大开放次数
    canOpenQuestion: true, // 是否可以开放题目
    canSetTime: true, // 是否可以设置时间
    canRevealAnswer: false, // 是否可以开放答案

    options: [
      { 
        option: 'A', 
        text: '25米', 
        selected: false, 
        firstPercentage: 25, 
        firstVotes: 50,
        secondPercentage: 30,
        secondVotes: 60 
      },
      { 
        option: 'B', 
        text: '30米', 
        selected: false, 
        firstPercentage: 50, 
        firstVotes: 100,
        secondPercentage: 40,
        secondVotes: 80 
      },
      { 
        option: 'C', 
        text: '40米', 
        selected: false, 
        firstPercentage: 15, 
        firstVotes: 30,
        secondPercentage: 20,
        secondVotes: 40 
      },
      { 
        option: 'D', 
        text: '50米假设这是长答案假设这是长答案假设这是长答案假设这是长答案假设这是长答案', 
        selected: false, 
        firstPercentage: 10, 
        firstVotes: 20,
        secondPercentage: 10,
        secondVotes: 20 
      }
    ]
  },
     // 更新时间设置
     updateTime: function(e) {
      this.setData({
        openTime: e.detail.value,
        timeLeft: e.detail.value,
        canOpenQuestion: e.detail.value > 0 // 只有时间大于0时才能开放题目
      });
    },

  // 处理开放题目和停止作答逻辑
  handleQuestionAction: function() {
console.log(this.data.canOpenQuestion)

    if (this.data.canOpenQuestion) {
      if (this.data.buttonText === '开放题目' || this.data.buttonText === '再次开放') {
        this.openQuestion();
      } else if (this.data.buttonText === '停止作答') {
        this.stopCountdown();
      }
    }
  },

  // 开放题目
  openQuestion: function() {
    if (this.data.openTime <= 0) { // 如果设置的时间为0或不合理，则不允许开放题目
      wx.showToast({
        title: '请设置时间',
        icon: 'none'
      });
      return;
    }
    this.setData({
      buttonText: '停止作答',
      currentAttempt: this.data.currentAttempt + 1,
      timeLeft: this.data.openTime, // 重置时间
      canSetTime: false, // 禁止修改时间
      canRevealAnswer: true // 允许开放答案
    });
    this.startCountdown();
  },

  // 开始倒计时
  startCountdown: function() {
    this.clearCountdownInterval();
    let interval = setInterval(() => {
      if (this.data.timeLeft > 0) {
        this.setData({
          timeLeft: this.data.timeLeft - 1
        });
      } else {
        this.completeCountdown();
      }
    }, 1000);
    this.setData({ countdownInterval: interval });
  },

  // 完成倒计时
  completeCountdown: function() {
    this.clearCountdownInterval();
    if (this.data.currentAttempt < this.data.maxAttempts) {
      this.setData({
        buttonText: '再次开放',
        canOpenQuestion: true
      });
    } else {
      this.setData({
        canOpenQuestion: false
      });
    }
    this.setData({
      canSetTime: true
    });
  },

  // 清除倒计时
  clearCountdownInterval: function() {
    if (this.data.countdownInterval) {
      clearInterval(this.data.countdownInterval);
      this.setData({
        countdownInterval: null
      });
    }
  },

  // 停止倒计时
  stopCountdown: function() {
    this.clearCountdownInterval();
    this.setData({
      buttonText: this.data.currentAttempt < this.data.maxAttempts ? '再次开放' : '开放完成',
      canOpenQuestion: this.data.currentAttempt < this.data.maxAttempts,
      canSetTime: true,
      canRevealAnswer: true,
      timeLeft:0
    });
  },

  // 开放答案
  revealAnswer: function() {
    // 添加显示答案的逻辑
    wx.showToast({
      title: '开放答案',
      icon: 'none'
    });
  },





  previewImage(){
    wx.previewMedia({
      sources: [{url:this.data.imageSrc,type:'image'}],
    })
  },

  onLoad() {
    this.markCorrectAnswer();
    this.countDown(); // 开始倒计时
    // 其他 onLoad 逻辑
  },
  markCorrectAnswer() {
    const correctAnswer = this.data.correctAnswer;
    const options = this.data.options.map(item => {
      item.correct = item.option === correctAnswer;
      return item;
    });

    this.setData({ options });
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
});
