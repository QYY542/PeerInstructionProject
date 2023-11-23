// pages/question/question.js
Page({
  data: {
    questionText: '一辆质量为1.5吨的汽车以10米/秒的速度行驶在水平路面上。当司机看到前方有障碍物时，立即踩下刹车。如果刹车后汽车以2米/秒²的加速度均匀减速，假设路面光滑且没有摩擦力，请计算汽车完全停下来前行驶的距离。',
    imageSrc: 'http://tmp/PGoUDrBHjgar43b1e0596076b7889cb264753a2fe141.jpg', // 若有相关示意图，可放置图片URL
    options: [
      { option: 'A', text: '25米', selected: false },
      { option: 'B', text: '30米', selected: false },
      { option: 'C', text: '40米', selected: true },
      { option: 'D', text: '50米假设这是长答案假设这是长答案假设这是长答案假设这是长答案假设这是长答案假设这是长答案假设这是长答案假设这是长答案假设这是长答案假设这是长答案假设这是长答案假设这是长答案', selected: false },
    ],
    remainingTime: 60, // 剩余答题时间（秒）
    correctAnswer: 'A', // 正确答案选项
    selectedAnswer: 'B',
    isAnswerPublished:true,
  },
  onPullDownRefresh: function () {
    //下拉重新获取改题目的状态信息，包括是否允许作答，答题情况等
    
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
    wx.request({
      url: getApp().globalData.ip + 'url',//todo:确定地址
      data: {question_id:this.data.question_id, uer_id:getApp().globalData.user_id, question_choice:this.data.selectedAnswer},
      timeout: 0,
      success: (result) => {

      },
      fail: (err) => {},
      complete: (res) => {},
    })
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
    wx.request({
      url: getApp().globalData.ip + 'chapter/GetQuestion',
      data: {question_id:getApp().globalData.current_question_id},//传递题目id
      method: 'GET',
      timeout: 0,
      success: (result) => {
        console.log(result)
        var res = JSON.stringify(result.data)
              var regex = /#answer:(.*?),creator_user_id:(\d+),difficulty:(\d+),options:(.*?),question_id:(\d+),question_text:(.*?),shared:(.*?),statistics:(.*?),tags:(.*?),type_:(\d+),update_time:(.*?)/g;
              var match;
              match = regex.exec(res)
              console.log(match)
              var question_text = match[6]
              var answer = match[1]
              answer = answer.slice(1, -1)
              var options = match[4]
              options = options.replace(/'/g, '"')
              options = options.slice(1, -1)
              var option_list = JSON.parse('{' + options + '}')
              var options_list = Object.keys(option_list).map(function(key) {
                return { key: key, value: obj[key] };
            });
              console.log(question_text)
              console.log(answer)
              console.log(options_list)
              //设置题目文本
              this.data.questionText = question_text
              this.data.correctAnswer = answer
              this.data.options[0].text = options_list['A']
              this.data.options[1].text = options_list['B']
              this.data.options[2].text = options_list['C']
              this.data.options[3].text = options_list['D']
      },
      fail: (err) => {},
      complete: (res) => {},
    })
  },
  previewImage(){
    wx.previewMedia({
      sources: [{url:this.data.imageSrc,type:'image'}],
    })
  },
});
