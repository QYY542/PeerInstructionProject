Page({
  data: {
    items: [
      { 
        name: '课程1',
        teacher: '王老师'
      },
      { 
        name: '课程2',
        teacher: '李老师'
      }
    ],
    courseCount: 2 ,  // 初始值设置为2，因为目前有两个课程
  },
  
  onLoad:function (){
    //页面加载时向后端请求该教师目前的课程数据进行页面初始化
    wx.request({
      url: 'http://127.0.0.1:5000/TeacherClass/',
      data: {email:getApp().globalData.email},//传递该用户邮箱以索引
      method: 'GET',
      timeout: 0,
      success: (result) => {
        console.log(result)
        var res = JSON.stringify(result.data)
        var tc = res.split('')
        console.log(res)
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
    let items = this.data.items;
    items.push({ name: '新的课程xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' });
    this.setData({
      items: items,
      courseCount: items.length  // 更新课程数量
    });
    wx.navigateTo({
      url: '/pages/Teacher/TeacherMain/TeacherNewClass/TeacherNewClass'
    });
  },

  goToChapterList: function(e) {
    let index = e.currentTarget.dataset.index;
    let itemName = this.data.items[index].name;
    wx.navigateTo({
      url: '/pages/Teacher/TeacherChapter/TeacherChapterList/TeacherChapterList'
    });
  }
});
