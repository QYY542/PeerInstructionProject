Page({
  data: {
    className: '',
    classPassword: '',
    course_id:'',
    course_pw:''
  },
  
  // 当用户输入课程名称时调用的函数
  inputClassName: function(e) {
    this.setData({
      className: e.detail.value
    });
  },
  
  
  // 当用户点击“下一步”按钮时调用的函数
  nextStep: function() {
    if (this.data.className) {
      wx.request({
        url: getApp().globalData.ip + 'course/NewCourse',
        data: {course_name:this.data.className, user_id:getApp().globalData.user_id},
        method: 'GET',
        success: (result) => {
          console.log(result.data)
          //得到课程id和课程密码
          var res = result.data         
          console.log(res.course_id)
          this.data.course_id = res.course_id;
          getApp().globalData.current_course_id = res.course_id;
          console.log(getApp().globalData.current_course_id)
          console.log(res.course_pw)
          this.data.classPassword = res.course_pw;
          wx.showModal({
            title: '创建成功',
            content: '课程id: ' + this.data.course_id +'选课密码：'+ this.data.classPassword,
            complete: (res) => {
              if (res.cancel) {
              }
              if (res.confirm) {
              }
            }
          })
        },
        fail: (err) => {
        },
        complete: (res) => {},
      })
      wx.redirectTo({
        url: '/pages/Teacher/TeacherChapter/TeacherChapterList/TeacherChapterList?course_id='+ this.data.course_id +'&course_pw=' + this.data.course_pw 
      });
    } else {
      wx.showToast({
        title: '请填写所有字段',
        icon: 'none'
      });
    }

    console.log('===创建新课程===');
    console.log('课程id:', this.data.className);
    console.log('课程密码:', this.data.classPassword);
  }
});
