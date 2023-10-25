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
  
  handleLogin() {
      // 这里可以添加登录逻辑，如请求后端API进行登录验证
      console.log('===登录===');
      console.log('邮箱:', this.data.email);
      console.log('密码:', this.data.password);
      // 进入教师版界面 or 学生版界面
      if(this.data.email == '1' && this.data.password == '1'){
        wx.redirectTo({
          url: '/pages/Teacher/TeacherMain/TeacherClass/TeacherClass'
        });     
      }else if(this.data.email == '2' && this.data.password == '2'){
        wx.redirectTo({
          url: '/pages/Student/StudentMain/StudentClass/StudentClass'
        });  
      }
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
