Page({
  data: {
    post: {
      title: '微信小程序开发入门指南',
      content: '微信小程序是一种新的开放能力，开发者可以快速开发一个微信小程序。微信小程序为微信用户提供了更多便利，开发者可以为微信用户提供更多的服务。这篇指南将介绍如何开始微信小程序开发，包括环境准备、基础知识、项目实战等内容。',
      time: '2023-10-25 08:30'
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

    // 将被回复的作者添加到输入框中，并在已有内容前面加上 @${author}
    this.setData({
      replyTo: author,
      replyContent: `@${author} ${existingContent}`,
    });
  },

  onShow: function () {
    wx.request({
      url: getApp().globalData.ip + '',
      data: {user_id:getApp().globalData.user_id,forum_id:getApp().globalData.current_forum_id,reply_content:this.data.replyContent,reply_to:this.data.replyTo},//传递用户id，帖子id,回复消息，回复对象
      method: 'GET',
      timeout: 0,
      success: (result) => {
        console.log(result)
        var res = JSON.stringify(result.data)
        console.log(res)
        var regex = /#admin_user_id:(\d+),course_id:(\d+),creation_time:(.*?),description:(.*?),enrollment_count:(\d+),name:(.*?),on_air:(.*?),password:(\d+),popularity:(\d+)/g;
        var match;
        var resultList = [];
        while ((match = regex.exec(res)) !== null) {
          console.log(match[6])
          var courseName = match[6];
          console.log(courseName)
          var courseId = parseInt(match[2]);
          console.log(courseId)     
          var pw = parseInt(match[8]) 
          // 构造字典对象并添加到结果列表
          var courseObject = {
            'name': courseName,
            'course_id': courseId,
            'course_pw': pw
          };
          resultList.push(courseObject);
        }
        // 打印结果列表
        console.log(resultList);
        this.setData({
          items: resultList,
          courseCount: resultList.length  // 更新课程数量
        });
        getApp().globalData.forum_list = resultList
        console.log("全局变量")
        console.log(getApp().globalData.course_list)
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
    wx.request({
      url: getApp().globalData.ip + 'url',
      data: data,
      method: 'GET',
      timeout: 0,
      success: (result) => {

      },
      fail: (err) => {},
      complete: (res) => {},
    })
    
  }

});
