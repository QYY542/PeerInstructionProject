Page({
  data: {
    email: '',        // 用户输入的邮箱地址
    verificationCode: '', // 用户输入的验证码
    newPassword: '',  // 用户输入的新密码
    confirmPassword: '', // 用户再次输入的密码
  },
  
  bindInput: function(e) {
    let field = e.currentTarget.dataset.field;
    this.setData({
      [field]: e.detail.value
    });
  },
  getVerificationCode: function() {
    // 获取验证码的逻辑
    // 您可以使用 this.data.email 来访问用户输入的邮箱地址
    console.log('===获取验证码===');
    console.log('邮箱:', this.data.email);
  },
  
  verifyCode: function() {
    // 验证码确认的逻辑
    // 您可以使用 this.data.verificationCode 来访问用户输入的验证码
    console.log('===确认验证码===');
    console.log('验证码:', this.data.verificationCode);
  },
  
  confirmChange: function() {
    // 确认修改密码的逻辑
    // 您可以使用 this.data.newPassword 和 this.data.confirmPassword 来访问用户输入的新密码和确认密码
    console.log('===确认修改===');
    console.log('新密码:', this.data.newPassword);
    console.log('再次输入新密码:', this.data.confirmPassword);
  }
});
