Page({
  data: {
    post: {
      title: '',
      content: '',
      time: ''
    },
    comments: [
      {
        author: '程序员小张',
        content: '非常有用的指南，谢谢分享！非常有用的指南，谢谢分享！非常有用的指南，谢谢分享！非常有用的指南，谢谢分享！非常有用的指南，谢谢分享！非常有用的指南，谢谢分享！非常有用的指南，谢谢分享！',
        time: '2023-10-25 09:00'
      },
      {
        author: '开发者小李',
        content: '请问有相关的进阶教程吗？',
        time: '2023-10-25 09:30'
      },
      {
        author: '学生小王',
        content: '感谢，解决了我很多问题！',
        time: '2023-10-25 10:00'
      },
      {
        author: '前端小赵',
        content: '@开发者小李 写得很清楚，点赞！',
        time: '2023-10-25 10:30'
      },
      {
        author: '小程序小吴',
        content: '很期待下一篇教程！',
        time: '2023-10-25 11:00'
      },
      {
        author: '产品小马',
        content: '从产品的角度也收获很多，谢谢！',
        time: '2023-10-25 11:30'
      }
    ],
    replyContent: '',
    replyTo: '', // 用于保存被回复的作者
  },

  replyToComment: function (event) {
    const index = event.currentTarget.dataset.index;
    const author = event.currentTarget.dataset.author;
  
    // 获取已有的 replyContent，如果没有则设为空字符串
    const existingContent = this.data.replyContent || '';
  
    // 判断 replyContent 中是否已经包含 @${author}，如果已包含，则不重复添加
    if (!existingContent.includes(`@${author}`)) {
      // 将被回复的作者添加到输入框中，并在已有内容前面加上 @${author}
      this.setData({
        replyTo: author,
        replyContent: `@${author} ${existingContent}`,
      });
    }
  },
  onLoad: function (option) {
    this.data.post.title = option.title
    this.data.post.time = option.time
    this.data.post.content = option.text
    this.setData({
      post:this.data.post
    })
    wx.request({
      url: getApp().globalData.ip + 'lesson/GetComments',
      data: {post_id:getApp().globalData.current_forum_id},
      method: 'GET',
      timeout: 0,
      success: (result) => {
        var res = JSON.stringify(result.data)
        var regex = /#chapter_id:(\d+),comments:(\d+),course_id:(\d+),level:(\d+),likes:(\d+),post_content:(.*?),post_id:(\d+),post_time:(.*?),post_user_id:(.*?),question_id:(.*?),quoted_post_id:(.*?),root_post_id:(.*?),type_:(\d+)/g;
        var match;
        var resultList = [];
        while ((match = regex.exec(res)) !== null) {
          console.log(match)
          var forum_id = parseInt(match[7])
          var content = match[6]
          var time = match[8]
          var name = match[9]
          // 构造字典对象并添加到结果列表
          var courseObject = {
            author:name,
            content:content,
            time: time, 
          };
          resultList.push(courseObject);
        }
        this.setData({
          comments:resultList,
        })
        console.log(resultList)
        getApp().globalData.forum_comment_list = resultList
      },
      fail: (err) => {},
      complete: (res) => {},
    })
  },
  inputChange: function (event) {
    // 处理输入框的值变化，更新 replyContent
    this.setData({
      replyContent: event.detail.value,
    });
  },
  submitComment: function () {
    //处理发帖文本，成功后更新界面
    if(this.data.replyContent != ''){
      wx.request({
        url: getApp().globalData.ip + 'lesson/MakeComment',
        data: {user_id:getApp().globalData.user_id, post_id:getApp().globalData.current_forum_id, content:this.data.replyContent},
        method: 'POST',
        timeout: 0,
        success: (result) => {
          this.setData({
            replyContent:''
          })
          this.onLoad({
            title:this.data.post.title,
            text:this.data.post.content,
            time:this.data.post.time
          })
        },
        fail: (err) => {},
        complete: (res) => {},
      })
    }
  }

});
