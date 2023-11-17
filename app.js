// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    //定义一些全局变量方便各页面初始化调用
    uer_id:"",//用于后端索引用户
    current_course_id:"",//当前课程id
    current_chapter_id:"",//当成章节id
    course_list:[],//维护的课程列表，学生老师形式一致
    chapter_list:[],//维护的章节列表
    ip:"http://10.62.165.3:5080/"
  }
})
