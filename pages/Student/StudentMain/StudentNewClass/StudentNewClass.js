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
      wx.request({
        url: getApp().globalData.ip + 'course/JoinCourse',
        data: {course_id:this.data.classID, course_pw:this.data.classPassword, user_id: getApp().globalData.user_id},
        method: 'POST',
        timeout: 0,
        success: (result) => {
          if(result.statusCode == 200){
            var get = JSON.parse(result.data)            
            wx.showToast({
              title: '加入成功',
              duration: 2000
            })
            wx.redirectTo({
              url: '/pages/Student/StudentChapter/StudentChapterList/StudentChapterList' 
            });
          }else{
            wx.showToast({
              title: '加入失败',
              icon: 'error'
            })
          }
        },
        fail: (err) => {},
        complete: (res) => {},
      })

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
