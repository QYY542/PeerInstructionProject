// pages/question/question.js
Page({
  data: {
    questionText: '',
    imageSrc: '', // 若有相关示意图，可放置图片URL
    remainingTime: 60, // 剩余答题时间（秒）
    correctAnswer: ['A','B'], // 正确答案选项
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
        text: '',
        selected: false,
        firstPercentage: 25,
        firstVotes: 50,
        secondPercentage: 30,
        secondVotes: 60,
        correct:false,
      },
      {
        option: 'B',
        text: '',
        selected: false,
        firstPercentage: 50,
        firstVotes: 100,
        secondPercentage: 40,
        secondVotes: 80,
        correct:false,
      },
      {
        option: 'C',
        text: '',
        selected: false,
        firstPercentage: 15,
        firstVotes: 30,
        secondPercentage: 20,
        secondVotes: 40,
        correct:false,
      },
      {
        option: 'D',
        text: '',
        selected: false,
        firstPercentage: 10,
        firstVotes: 20,
        secondPercentage: 10,
        secondVotes: 20,
        correct:false,
      }
    ]
  },

  setCorrectAnswers: function() {
    const correctAnswers = this.data.correctAnswer; // 正确答案列表
    const options = this.data.options.map((item) => {
      if (correctAnswers.includes(item.option)) {
        item.correct = true;
      } else {
        item.correct = false;
      }
      return item;
    });
    this.setData({
      options: options
    });
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
        wx.request({
          url: getApp().globalData.ip + 'class/OpenQuestion',
          data: {course_id:getApp().globalData.current_course_id,question_id:getApp().globalData.current_question_id,
          time_limit:this.data.openTime,chapter_id:getApp().globalData.current_chapter_id},//向后端传递当前课程id与题目id章节id与开放时间
          method: 'POST',
          timeout: 0,
          success: (result) => {
            console.log(result)
          },
          fail: (err) => {},
          complete: (res) => {},
        })
      } else if (this.data.buttonText === '停止作答') {
        //从后端接收反馈
        wx.request({
          url: getApp().globalData.ip + 'url',//todo
          data: {question_id:getApp().globalData.current_question_id,course_id:getApp().globalData.current_course_id},
          method: 'GET',
          timeout: 0,
          success: (result) => {
            
          },
          fail: (err) => {},
          complete: (res) => {},
        })
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
    //向后端传递该题的id，课程id,将改题目开放
    wx.request({
      url: getApp().globalData.ip + 'url',
      data: {question_id:getApp().globalData.current_question_id, course_id:getApp().globalData.current_course_id},
      method: 'POST',
      timeout: 0,
      success: (result) => {},
      fail: (err) => {},
      complete: (res) => {},
    })
  },

  previewImage(){
    wx.previewMedia({
      sources: [{url:this.data.imageSrc,type:'image'}],
    })
  },

  onLoad() {
    this.markCorrectAnswer();
    this.countDown(); // 开始倒计时
    this.setCorrectAnswers();
    wx.request({
      url: getApp().globalData.ip + 'question/GetQuestion',
      data: {question_id:getApp().globalData.current_question_id,course_id:getApp().globalData.current_course_id, chapter_id:getApp().globalData.current_chapter_id},
      method: 'GET',
      timeout: 0,
      success: (result) => {
        console.log(result)
        var res = JSON.stringify(result.data)
              var regex = /#answer:(.*?),answer_visibility:(.*?),creator_user_id:(\d+),difficulty:(\d+),open_time:(.*?),options:(.*?),question_id:(\d+),question_status:(\d+),question_text:(.*?),round_count:(\d+),shared:(.*?),statistics:(.*?),tags:(.*?),time_limit:(\d+),type_:(\d+),update_time:(.*?)/g;
              var match;
              match = regex.exec(res)
              console.log(match)
              var question_text = match[9]
              var answer = match[1]
              answer = answer.replace(/'/g, '"')
              answer = JSON.parse(answer)
              var options = match[6]
              options = options.replace(/'/g, '"')
              var options_list = JSON.parse(options)
              var round_count = parseInt(match[10])
              console.log('question_text:' + question_text)
              console.log('answer:' + answer)
              console.log('options_list:' + options_list['A'])
              console.log('round_count:' + round_count)
              //设置题目文本
              var option = []
              var input = {
                option: 'A',
                text: options_list['A'],
                firstPercentage: 0,
                firstVotes: 0,
                secondPercentage: 0,
                secondVotes: 0,
                correct:false,
              }
              option.push(input)
              var input = {
                option: 'B',
                text: options_list['B'],
                firstPercentage: 0,
                firstVotes: 0,
                secondPercentage: 0,
                secondVotes: 0,
                correct:false,
              }
              option.push(input)
              var input = {
                option: 'C',
                text: options_list['C'],
                firstPercentage: 0,
                firstVotes: 0,
                secondPercentage: 0,
                secondVotes: 0,
                correct:false,
              }
              option.push(input)
              var input = {
                option: 'D',
                text: options_list['D'],
                firstPercentage: 0,
                firstVotes: 0,
                secondPercentage: 0,
                secondVotes: 0,
                correct:false,
              }
              option.push(input)
              console.log(option)
              this.setData({
                questionText:question_text,
                options:option,
                currentAttempt:round_count
              })
              this.data.correctAnswer = answer
              this.setCorrectAnswers();
      },
      fail: (err) => {},
      complete: (res) => {},
    })
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
