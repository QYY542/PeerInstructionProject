Page({
  data: {
    items: [
      { name: '章节1' },
      { name: '章节2' }
    ],
    courseCount: 2 ,  // 初始值设置为2，因为目前有两个课程
  },

  onShow: function(){
    //页面加载时向后端请求该教师目前课程章节进行页面初始化
    wx.request({
      url: getApp().globalData.ip + 'course/MainMenu',
      data: {user_id:getApp().globalData.user_id},//传递该用户id以索引
      method: 'GET',
      timeout: 0,
      success: (result) => {
        console.log(result)
        var res = JSON.stringify(result.data)
        console.log(res)
        var regex = /#admin_user_id:(\d+),course_id:(\d+),creation_time:(.*?),description:(.*?),enrollment_count:(\d+),name:(.*?),on_air:(.*?),popularity:(\d+)/g;
        var match;
        var resultList = [];
        while ((match = regex.exec(res)) !== null) {
          var courseName = match[6];
          console.log(courseName)
          var courseId = parseInt(match[2]);
          console.log(courseId)
        
          // 构造字典对象并添加到结果列表
          var courseObject = {
            'name': courseName,
            'course_id': courseId
          };
          resultList.push(courseObject);
        }
        // 打印结果列表
        console.log(resultList);
        this.setData({
          items: resultList,
          courseCount: resultList.length  // 更新课程数量
        });
        getApp().globalData.course_list = resultList
        console.log("全局变量")
        console.log(getApp().globalData.course_list)
      },
      fail: (err) => {},
      complete: (res) => {},
    })
      },

  onLoad: function(){
//页面加载时向后端请求该教师目前课程章节进行页面初始化
wx.request({
  url: getApp().globalData.ip + 'course/NewChapter',
  data: {course_id: getApp().globalData.current_course_id, user_id:getApp().globalData.user_id},//传递该用户id与课程id以索引
  method: 'GET',
  timeout: 0,
  success: (result) => {
    console.log(result)
    var res = JSON.stringify(result.data)
    console.log(res)
    var regex = /#admin_user_id:(\d+),course_id:(\d+),creation_time:(.*?),description:(.*?),enrollment_count:(\d+),name:(.*?),on_air:(.*?),popularity:(\d+)/g;
    var match;
    var resultList = [];
    while ((match = regex.exec(res)) !== null) {
      var courseName = match[6];
      console.log(courseName)
      var courseId = parseInt(match[2]);
      console.log(courseId)
    
      // 构造字典对象并添加到结果列表
      var courseObject = {
        'name': courseName,
        'course_id': courseId
      };
      resultList.push(courseObject);
    }
    // 打印结果列表
    console.log(resultList);
    this.setData({
      items: resultList,
      courseCount: resultList.length  // 更新课程数量
    });
    getApp().globalData.course_list = resultList
    console.log("全局变量")
    console.log(getApp().globalData.course_list)
  },
  fail: (err) => {},
  complete: (res) => {},
})
  },

  deleteItem: function(e) {
    let index = e.currentTarget.dataset.index;
    let that = this;  // 保存当前的上下文

    wx.showModal({
      title: '确认删除',
      content: '你确定要删除这个章节吗？',
      success (res) {
        if (res.confirm) {
          let items = that.data.items;
          items.splice(index, 1);
          that.setData({
            items: items,
            courseCount: items.length  // 更新课程数量
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },

  addItem: function() {
    let items = this.data.items;
    items.push({ name: '新的章节xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' });
    this.setData({
      items: items,
      courseCount: items.length  // 更新课程数量
    });
  },

  goToChapterMain: function(e) {
    wx.navigateTo({
      url: '/pages/Teacher/TeacherChapter/TeacherChapterMain/TeacherChapterMain'
    });
  }
});
