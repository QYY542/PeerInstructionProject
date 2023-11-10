Page({
  data: {
    className: '',
    classPassword: ''
  },
  
  // 当用户输入课程名称时调用的函数
  inputClassName: function(e) {
    this.setData({
      className: e.detail.value
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
    if (this.data.className && this.data.classPassword) {
      // 在这里添加你的代码来处理“下一步”操作
      wx.request({
        url: 'http://127.0.0.1:5000/NewClass/',
        data: {class_name:this.data.className, class_pw:this.data.classPassword},
        method: 'GET',
        success: (result) => {
          //回报成功
        },
        fail: (err) => {
          //汇报错误原因（有必要的话）
        },
        complete: (res) => {},
      })
      wx.redirectTo({
        url: '/pages/Teacher/TeacherChapter/TeacherChapterList/TeacherChapterList'  // 假设你有一个名为'nextPage'的页面
      });
    } else {
      wx.showToast({
        title: '请填写所有字段',
        icon: 'none'
      });
    }

    console.log('===创建新课程===');
    console.log('课程名称:', this.data.className);
    console.log('课程密码:', this.data.classPassword);
  }
});
