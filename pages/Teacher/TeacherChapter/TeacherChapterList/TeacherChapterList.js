Page({
  data: {
    items: [
      { name: '章节1' ,id:""},
      { name: '章节2' ,id:""}
    ],
    courseCount: 2 ,  // 初始值设置为2，因为目前有两个课程
    isClassStarted: false, // 初始课堂状态为未开始
    classBtnStyle:'greenBtn',
    classBtnText:'开始上课'
  },

  computed: {
    classBtnStyle: function() {
      return this.data.isClassStarted ? 'redBtn' : 'greenBtn';
    },
  
    classBtnText: function() {
      return this.data.isClassStarted ? '停止课堂' : '开始上课';
    },
  },

  onShow: function(){
    //页面加载时向后端请求该教师目前课程章节进行页面初始化
    wx.request({
      url: getApp().globalData.ip + 'course/CourseMenu',
      data: {course_id: getApp().globalData.current_course_id},//传递该课程id以索引
      method: 'GET',
      timeout: 0,
      success: (result) => {
        console.log(result)
        var res = JSON.stringify(result.data)
        console.log(res)
        var regex = /#chapter_description:(.*?),chapter_id:(\d+),chapter_name:(.*?),course_id:(\d+)/g;
        var match;
        var resultList = [];
        while ((match = regex.exec(res)) !== null) {
          var chapterName = match[3];
          var chapterId = parseInt(match[2]);      
          // 构造字典对象并添加到结果列表
          var courseObject = {
            'name': chapterName,
            'chapter_id': chapterId
          };
          resultList.push(courseObject);
        }
        // 打印结果列表
        console.log(resultList);
        this.setData({
          items: resultList,
          courseCount: resultList.length  // 更新课程数量
        });
        this.data.items = resultList
        getApp().globalData.chapter_list = resultList
        console.log("全局变量")
        console.log(getApp().globalData.chapter_list)
      },
      fail: (err) => {},
      complete: (res) => {},
    })
      },

  onLoad: function(){
//页面加载时向后端请求该教师目前课程章节进行页面初始化
wx.request({
  url: getApp().globalData.ip + 'course/CourseMenu',
  data: {course_id: getApp().globalData.current_course_id},//传递该课程id以索引
  method: 'GET',
  timeout: 0,
  success: (result) => {
    console.log(result)
    var res = JSON.stringify(result.data)
    console.log(res)
    var regex = /#chapter_description:(.*?),chapter_id:(\d+),chapter_name:(.*?),course_id:(\d+)/g;
    var match;
    var resultList = [];
    while ((match = regex.exec(res)) !== null) {
      var chapterName = match[3];
      var chapterId = parseInt(match[2]);
      // 构造字典对象并添加到结果列表
      var courseObject = {
        'name': chapterName,
        'chapter_id': chapterId
      };
      resultList.push(courseObject);
    }
    // 打印结果列表
    console.log(resultList);
    this.setData({
      items: resultList,
      courseCount: resultList.length  // 更新课程数量
    });
    this.data.items = resultList
    getApp().globalData.chapter_list = resultList
    console.log(getApp().globalData.chapter_list)
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
    wx.request({
      url: getApp().globalData.ip + 'course/NewChapter',
      data: {chapter_name:"新章节", course_id:getApp().globalData.current_course_id},
      timeout: 0,
      success: (result) => {
        var res = JSON.parse(result.data)
        console.log( getApp().globalData.current_course_id)
        getApp().globalData.current_chapter_id = res.chapter_id
        //添加成功，直接跳转到相应的章节界面
        wx.navigateTo({
          url: '/pages/Teacher/TeacherChapter/TeacherChapterMain/TeacherChapterMain'
        });
      },
      fail: (err) => {},
      complete: (res) => {},
    })
  },

  goToChapterMain: function(e) {
    let index = e.currentTarget.dataset.index;
    getApp().globalData.current_chapter_id = this.data.items[index].chapter_id
    wx.navigateTo({
      url: '/pages/Teacher/TeacherChapter/TeacherChapterMain/TeacherChapterMain'
    });
  },

  startClass: function() {
    const isClassStarted = this.data.isClassStarted;

    if (isClassStarted) {
      // 处理停止课堂的逻辑，弹出确认停止课堂的模态框
      wx.showModal({
        title: '确认停止课堂',
        content: '你确定要停止课堂吗？',
        success: (res) => {
          if (res.confirm) {
            // 用户点击了确认按钮，执行停止课堂的逻辑
            // 可以在这里添加相应的代码
            this.setData({
              isClassStarted: !isClassStarted,
              classBtnStyle: 'greenBtn',
              classBtnText: '开始上课',
            });
          }
        },
      });
    } else {
      wx.showToast({
        title: '现在开始上课',
        icon: 'none',
        duration: 1000
      });
      // 处理开始上课的逻辑，可以在这里添加相应的代码
      this.setData({
        isClassStarted: !isClassStarted,
        classBtnStyle: 'redBtn',
        classBtnText: '停止课堂',
      });
    }
  },


});
