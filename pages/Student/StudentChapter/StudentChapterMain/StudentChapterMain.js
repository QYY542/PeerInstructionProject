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
              var regex = /#answer:(.*?),answer_visibility:(.*?),creator_user_id:(\d+),difficulty:(\d+),open_time(.*?),options:(.*?),question_id:(\d+),question_status:(\d+),question_text:(.*?),round_count:(\d+),shared:(.*?),statistics:(.*?),tags:(.*?),time_limit:(\d+),type_:(\d+),update_time:(.*?)/g;
              var match;
              var resultList = [];
              while ((match = regex.exec(res)) !== null) {
                var question_text = match[9];
                var questionId = parseInt(match[7]);
                var round_count = parseInt(match[10])
                var courseObject = {
                  'question_text': question_text,
                  'question_id': questionId,
                  'round_count': round_count
                };
                resultList.push(courseObject);
              }
              var show_list = []
              var i = 0
              while(resultList[i] != null){
                if(resultList[i].round_count != 0){
                  console.log(resultList[i].round_count)
                  show_list.push(resultList[i])
                }
                i++
              }
              this.setData({
                items: show_list,
                courseCount: show_list.length  // 更新题目列表
              });
              console.log(show_list)
              getApp().globalData.question_list = show_list//赋给全局变量
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
      url: getApp().globalData.ip + 'chapter/ChapterMenu',
      data: {course_id:getApp().globalData.current_course_id, chapter_id:getApp().globalData.current_chapter_id},//发送对应课程章节id索引题目列表
      method: 'GET',
      success: (result) => {
        var res = JSON.stringify(result.data)
              var regex = /#answer:(.*?),answer_visibility:(.*?),creator_user_id:(\d+),difficulty:(\d+),open_time(.*?),options:(.*?),question_id:(\d+),question_status:(\d+),question_text:(.*?),round_count:(\d+),shared:(.*?),statistics:(.*?),tags:(.*?),time_limit:(\d+),type_:(\d+),update_time:(.*?)/g;
              var match;
              var resultList = [];
              while ((match = regex.exec(res)) !== null) {
                var question_text = match[9];
                var questionId = parseInt(match[7]);
                var round_count = parseInt(match[10])
                var courseObject = {
                  'question_text': question_text,
                  'question_id': questionId,
                  'round_count': round_count
                };
                resultList.push(courseObject);
              }
              var show_list = []
              var i = 0
              while(resultList[i] != null){
                if(resultList[i].round_count != 0){
                  show_list.push(resultList[i])
                }
                i++
              }
              this.setData({
                items: show_list,
                courseCount: show_list.length  // 更新题目列表
              });
              getApp().globalData.question_list = show_list//赋给全局变量
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
    getApp().globalData.current_question_id = this.data.items[index].question_id
    wx.navigateTo({
      url: '/pages/Student/StudentQuestion/StudentQuestion'
    });
  },
});
