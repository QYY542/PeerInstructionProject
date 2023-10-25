Page({
  data: {
    classID: '',
    classPassword: ''
  },
  
  // 当用户输入课程名称时调用的函数
  inputClassID: function(e) {
    this.setData({
      classID: e.detail.value
    });
  },
  
  // 当用户输入课程密码时调用的函数
  inputClassPassword: function(e) {
    this.setData({
      classPassword: e.detail.value
    });
  },
  
  // 当用户点击“下一步”按钮时调用的函数
  nextStep: function() {
    if (this.data.classID && this.data.classPassword) {
      // 在这里添加你的代码来处理“下一步”操作
      // 例如，你可能想要导航到另一个页面或者做一些其他的事情
      wx.redirectTo({
        url: '/pages/Student/StudentChapter/StudentChapter'  // 假设你有一个名为'nextPage'的页面
      });
    } else {
      wx.showToast({
        title: '请填写所有字段',
        icon: 'none'
      });
    }

    console.log('===加入新课程===');
    console.log('课程名称:', this.data.classID);
    console.log('课程密码:', this.data.classPassword);
  }
});
