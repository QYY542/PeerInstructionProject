Page({
  data: {
      username: '',
      studentID: '',
      password: '',
      confirmPassword: '',
      email: '',
      phone: '',
      is_teacher: 'is_student'
  },

  //处理输入
  inputUsername(e) {
    this.setData({
      username: e.detail.value
    });
  },

  inputStudentID(e) {
    this.setData({
      studentID: e.detail.value
    });
  },

  inputPassword(e) {
    this.setData({
      password: e.detail.value
    });
  },

  inputConfirmPassword(e) {
    this.setData({
      confirmPassword: e.detail.value
    });
  },

  inputEmail(e) {
    this.setData({
      email: e.detail.value
    });
  },

  inputPhone(e) {
    this.setData({
      phone: e.detail.value
    });
  },

  // 添加注册函数逻辑，例如验证输入和发送注册请求等
  handleRegister: function() {
    /*
    向后端传递注册信息，返回注册结果：
    注册成功
    邮箱已注册
    前后密码不一致
    参数缺失
    */
    wx.request({
      url: 'http://127.0.0.1:5000/register/',
      data: {name:this.data.username, stu_id:this.data.studentID, password:this.data.password, verify_pw:this.data.confirmPassword, email:this.data.email, tel_num:this.data.phone, is_teacher:this.data.is_teacher},
      dataType: String,
      method: 'POST',
      timeout: 0,
      success: (result) => {
        var get = JSON.parse(result.data)
        if(get.msg == '注册成功'){
          wx.navigateTo({
            url: '/pages/Login/Login',
        })
      }else{
        wx.showToast({
          title: get.msg,
          duration:2000
        })
      }
    },
      fail: (err) => {},
      complete: (res) => {},
    })
    // 展示输入的所有数据
    console.log('===注册===');
    console.log('用户名:', this.data.username);
    console.log('学号:', this.data.studentID);
    console.log('密码:', this.data.password);
    console.log('确认密码:', this.data.confirmPassword);
    console.log('邮箱地址:', this.data.email);
    console.log('手机号:', this.data.phone);
    console.log('是否为老师',this.data.is_teacher)
}

});
