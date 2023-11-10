Page({
  data: {
    email: '',
    password: ''
  },
  
  inputEmail(e) {
    this.setData({
      email: e.detail.value
    });
  },

  inputPassword(e) {
    this.setData({
      password: e.detail.value
    });
  },
  handleLogin: function() {
    console.log(this.data.email)
    console.log(this.data.password)
    /*
    向后端传递邮箱与密码，返回判断结果：
    学生登录成功
    教师登录成功
    密码错误
    邮箱不存在
    */
    wx.request({
      url: 'http://127.0.0.1:5000/login/',// 后端接口地址
      data: {email:this.data.email, password:this.data.password},
      dataType: String,//传递给后端的数据类型
      method: 'GET',
      header: {'Content-Type': 'application/json;charset=utf-8'},
      timeout: 0,
      success: (result) => {
        console.log(result)
        var get = JSON.parse(result.data)
        console.log(JSON.parse(result.data).msg)
        if(get.msg == '登录成功'){
          if(get.is_teacher == 'is_teacher'){
            getApp().globalData.user_id = get.user_id
            console.log(getApp().globalData.email)
            wx.redirectTo({
              url: '/pages/Teacher/TeacherMain/TeacherClass/TeacherClass'
            });
          }else if(get.is_teacher == 'is_student'){
            getApp().globalData.user_id = get.user_id
            wx.redirectTo({
              url: '/pages/Student/StudentMain/StudentClass/StudentClass'
            });
          }
        }else if(get.msg == '登录失败'){
        }
      },
      fail: (err) => {},
      complete: (res) => {},
    })
},

  handleWeChatLogin(){
    wx.showToast({
      title: '请求微信登录',
      icon: 'none',
      duration: 2000
    });
  },

  forgotPassword() {
    // 这里添加忘记密码的操作，例如跳转到重设密码页面
    wx.navigateTo({
      url: '/pages/RetrievePassword/RetrievePassword'
    });
  },

  registerAccount() {
    // 这里添加注册新账号的操作，例如跳转到注册页面
    wx.navigateTo({
      url: '/pages/Register/Register'
    });
  }
});
