Page({
  data: {
    items: [],
    courseCount: 2 ,  // 初始值设置为2，因为目前有两个课程
  },
  //载入该学生该课程该章节的题目列表
  onLoad: function() {
    //拉取该章节题目列表
    wx.request({
      url: getApp().globalData.ip + 'chapter/ChapterMenu',
      data: {course_id:getApp().globalData.current_course_id, chapter_id:getApp().globalData.current_chapter_id},//发送对应课程章节id索引题目列表
      method: 'GET',
      success: (result) => {
        var res = JSON.stringify(result.data)
              var regex = /#answer:(.*?),creator_id:(\d+),difficulty:(\d+),question_id:(\d+),question_text:(.*?),statistics:(.*?),tags:(.*?),type_:(\d+),update_time:(.*?)/g;
              var match;
              var resultList = [];
              while ((match = regex.exec(res)) !== null) {
                var question_text = match[5];
                console.log(courseName)
                var questionId = parseInt(match[4]);
                var answer = JSON.parse(match[1])
                console.log(courseId)
                // 构造字典对象并添加到结果列表,todo:是否扩展
                var courseObject = {
                  'question_text': question_text,
                  'question_id': questionId,

                };
                resultList.push(courseObject);
              }
              var show_list = []
              var i = 0
              while(resultList[i] != null){


              }
              this.setData({
                items: resultList,
                courseCount: resultList.length  // 更新题目列表
              });
      },
      fail: (err) => {},
      complete: (res) => {},
    })
    this.setData({
      show:false
    })
  },
  onShow: function() {
    //拉取该章节题目列表
    wx.request({
      url: getApp().globalData.ip + '',//todo:确定地址
      data: {course_id:getApp().globalData.current_course_id, chapter_id:getApp().globalData.current_chapter_id},//发送对应课程章节id索引题目列表
      method: 'GET',
      success: (result) => {
        var res = JSON.stringify(result.data)
              var regex = /#answer:(.*?),creator_id:(\d+),difficulty:(\d+),question_id:(\d+),question_text:(.*?),statistics:(.*?),tags:(.*?),type_:(\d+),update_time:(.*?)/g;
              var match;
              var resultList = [];
              while ((match = regex.exec(res)) !== null) {
                var question_text = match[5];
                console.log(courseName)
                var questionId = parseInt(match[4]);
                var answer = JSON.parse(match[1])
                console.log(courseId)
                // 构造字典对象并添加到结果列表,todo:是否扩展
                var courseObject = {
                  'question_text': question_text,
                  'question_id': questionId
                };
                resultList.push(courseObject);
              }
              this.setData({
                items: resultList,
                courseCount: resultList.length  // 更新题目列表
              });
      },
      fail: (err) => {},
      complete: (res) => {},
    })
    this.setData({
      show:false
    })
  },
  onPullDownRefresh: function () {
    //下拉刷新题目列表,与onload一致

  },
  goToFileMain: function(e) {
    wx.navigateTo({
      url: '/pages/Student/StudentFile/StudentFileMain/StudentFileMain'
    });
  },

  goToForumMain: function() {
    wx.navigateTo({
      url: '/pages/Student/StudentForum/StudentForumMain/StudentForumMain'
    });
  },
  
  goToQuestionMain: function(e) {
    var index = e.currentTarget.dataset.index;
    //将对应参数赋给全局变量供后续调用
    getApp().globalData.current_question_id = this.data.items[index].questionId
    wx.navigateTo({
      url: '/pages/Student/StudentQuestion/StudentQuestion'
    });
  },
});
