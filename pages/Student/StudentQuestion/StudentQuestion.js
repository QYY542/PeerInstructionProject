// pages/question/question.js
Page({
  data: {
    timeup:false,
    choosed:false,
    questionText: '',
    imageSrc: '', // 若有相关示意图，可放置图片URL
    options: [
      { 
        option: 'A', 
        text: '', 
        selected: false,
        correct:false,
       },
      { 
        option: 'B', 
        text: '', 
        selected: false,
        correct:false,
        },
      { 
        option: 'C', 
        text: '', 
        selected: false,
        correct:false,
        },
      { 
        option: 'D', 
        text: '', 
        selected: false,
        correct:false,  
      },
    ],
    remainingTime: 60, // 剩余答题时间（秒）
    correctAnswer: ['A','C'], // 正确答案选项
    selectedAnswer: [],
    isAnswerPublished:true,
    isAnswerPaused:false,
    currentAttempt:1
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
  //todo:改为多选
  onOptionTap(e) {
      const index = e.currentTarget.dataset.index;
      const options = this.data.options.map((item, idx) => {
        if(!item.selected){
          item.selected = idx === index;
        }else{
          item.selected = !(idx === index);
        }
        return item;
      });
      const selectedOptions = options.filter(item => item.selected);
      const selectedAnswer = selectedOptions.map(item => item.option);
    
      this.setData({
        options,
        selectedAnswer
      });
      console.log(selectedAnswer)
  },

  onSubmit() {
    // 提交答案的处理
    const selectedOptions = this.data.selectedAnswer;
    console.log('提交的答案是：', selectedOptions);
    wx.request({
      url: getApp().globalData.ip + 'lesson/SubmitQuestion',
      data: {question_id:getApp().globalData.current_question_id, user_id:getApp().globalData.user_id, question_choice:selectedOptions,course_id:getApp().globalData.current_course_id, chapter_id:getApp().globalData.current_chapter_id},
      timeout: 0,
      method:'POST',
      success: (result) => {
        this.setData({
          choosed:true
        })

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
      if (time <= 0 ) {
        clearInterval(timer);
        this.setData({
          timeup:true
        })
        if(this.data.choosed == false){
          this.onSubmit(); // 可以直接提交答案，或者提醒用户时间已到
        }
        wx.showToast({
          title: '时间到',
        })
      }else{
        this.setData({
          timeup:false
        })
      }
      this.setData({ remainingTime: time });
    }, 1000);
  },

  onLoad() {
    this.setCorrectAnswers();
    wx.request({
      url: getApp().globalData.ip + 'question/StudentGetQuestion',
      data: {question_id:getApp().globalData.current_question_id,course_id:getApp().globalData.current_course_id, chapter_id:getApp().globalData.current_chapter_id, user_id:getApp().globalData.user_id},
      method: 'GET',
      timeout: 0,
      success: (result) => {
        console.log(result)
        var res = JSON.stringify(result.data)
              var regex = /#answer:(.*?),answer_visibility:(.*?),creator_user_id:(\d+),difficulty:(\d+),open_time:(.*?),options:(.*?),question_id:(\d+),question_status:(\d+),question_text:(.*?),round_count:(\d+),shared:(.*?),statistics:(.*?),submitted:(.*?),tags:(.*?),time_limit:(\d+),type_:(\d+),update_time:(.*?)/g;
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
              var visibility = match[2]
              var limit = parseInt(match[15])
              var open_time = match[5]
              var start_time = new Date(open_time)
              var current_time = new Date()
              var rest_time = limit - Math.floor((current_time - start_time)/1000)
              if(match[13] == 'True'){
                var choosed = true
              }else{
                var choosed = false
              }
              console.log('question_text:' + question_text)
              console.log('answer:' + answer)
              console.log('options_list:' + options_list['A'])
              console.log('round_count:' + round_count)
              console.log('visibility:' + visibility)
              console.log('submmited:' + match[13])
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
                currentAttempt:round_count,
                isAnswerPublished:visibility,
                remainingTime:rest_time,
                choosed:choosed
              })
              this.data.correctAnswer = answer
              this.setCorrectAnswers();
      },
      fail: (err) => {},
      complete: (res) => {},
    })
    this.countDown(); 
  },
  onPullDownRefresh: function () {
    onload()
  },
  previewImage(){
    wx.previewMedia({
      sources: [{url:this.data.imageSrc,type:'image'}],
    })
  },
});
