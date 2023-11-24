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
    user_id:"",//用于后端索引用户
    current_course_id:"",//当前课程id
    current_chapter_id:"",//当成章节id
    current_question_id:"",//当前题目id
    current_file_id:"",//当前文件id
    current_forum_id:"",//当前帖子id
    course_list:[],//维护的课程列表，学生老师形式一致
    chapter_list:[],//维护的章节列表
    file_list:[],//维护的文件列表
    question_list:[],//维护的题目列表
    forum_comment_list:[],//章节内帖子列表
    forum_list:[],//维护的帖子列表
    ip:"http://10.63.239.47:5080/"
  }
})
