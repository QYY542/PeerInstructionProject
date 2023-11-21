Page({
  data: {
    items: [
      { 
        name: '课程1',
        teacher: '王老师',
        isOnGoing: false
      },
      { 
        name: '课程2',
        teacher: '李老师',
        isOnGoing: true
      }
    ],
    courseCount: 2 ,  // 初始值设置为2，因为目前有两个课程
    username: "王子建"
  },
  onShow:function (){
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
  onLoad:function (){
    //页面加载时向后端请求该教师目前的课程数据进行页面初始化
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
  deleteItem: function(e) {
    let index = e.currentTarget.dataset.index;
    let that = this;  // 保存当前的上下文

    wx.showModal({
      title: '确认删除',
      content: '你确定要删除这个课程吗？',
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
    wx.navigateTo({
      url: '/pages/Student/StudentMain/StudentNewClass/StudentNewClass'
    });

  },

  goToChapterList: function(e) {
    let index = e.currentTarget.dataset.index;
    let itemName = this.data.items[index].name;
    wx.navigateTo({
      url: '/pages/Student/StudentChapter/StudentChapterList/StudentChapterList'
    });
  },
  goToPersonalInfo: function(e) {
    wx.navigateTo({
      url: '/pages/PersonalInfo/PersonalInfo'
    });
  }
});
