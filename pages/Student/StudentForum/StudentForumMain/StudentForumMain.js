Page({
  data: {
    chaptername:'',
    items: [
      { 
        title: '作业疑问', 
        time: '2023/11/08 10:30', 
        content: '关于最近的数学作业，第五题的解题方法能否详细讲解一下？关于最近的数学作业，第五题的解题方法能否详细讲解一下？关于最近的数学作业，第五题的解题方法能否详细讲解一下？关于最近的数学作业，第五题的解题方法能否详细讲解一下？' ,
        isTop: true
      },
      { 
        title: '期中考试安排', 
        time: '2023/11/07 14:20', 
        content: '期中考试将在下周一开始。'  ,
        isTop: true
      },
      { 
        title: '关于实验课程的通知', 
        time: '2023/11/06 09:00', 
        content: '下周三的物理实验课程将调整到周五进行，请大家注意时间变化。'  ,
        isTop: false
      },
      { 
        title: '图书馆学习资源', 
        time: '2023/11/05 16:45', 
        content: '图书馆新增了一批学习资源，涉及物理、化学等科目，欢迎借阅。'  ,
        isTop: false
      },
      { 
        title: '图书馆学习资源', 
        time: '2023/11/05 16:45', 
        content: '图书馆新增了一批学习资源，涉及物理、化学等科目，欢迎借阅。'  ,
        isTop: true
      }
    ],
    courseCount: 4  // Assuming that each post is related to a different course
  },
  onShow: function (option) {
    //向后端拉取帖子列表
    wx.request({
      url: getApp().globalData.ip + 'lesson/GetPosts',
      data: {chapter_id:getApp().globalData.current_chapter_id,course_id:getApp().globalData.current_course_id},
      method: 'GET',
      timeout: 0,
      success: (result) => {
        console.log(result)
        var res = JSON.stringify(result.data)
        var regex = /#chapter_id:(\d+),comments:(\d+),course_id:(\d+),level:(\d+),likes:(\d+),post_content:(.*?),post_id:(\d+),post_time:(.*?),post_user_id:(.*?),question_id:(.*?),quoted_post_id:(.*?),root_post_id:(.*?),type_:(\d+)/g;
        var match;
        var resultList = [];
        while ((match = regex.exec(res)) !== null) {
          console.log(match)
          var forum_id = parseInt(match[7])
          var list = match[6].split('$')
          var title = list[0]
          var text = list[1]
          var time = match[8]
          var name = match[9]
          // 构造字典对象并添加到结果列表
          var courseObject = {
            title: title, 
            time: time, 
            content:text,
            forum_id:forum_id,
            name:name
          };
          resultList.push(courseObject);
        }
        console.log(resultList)
        this.setData({
          items:resultList,
          courseCount:resultList.length
        })
        getApp().globalData.forum_list = resultList
      },
      fail: (err) => {},
      complete: (res) => {},
    })
    // 页面加载时对 items 进行排序
    let items = this.data.items;

    items.sort((a, b) => {
      // 首先按照 isTop 字段降序排列
      if (b.isTop - a.isTop !== 0) {
        return b.isTop - a.isTop;
      }
      
      // 如果 isTop 相同，则按照 time 字段降序排列
      return new Date(b.time) - new Date(a.time);
    });

    // 更新数据
    this.setData({
      items: items,
    });
  },
  onLoad: function (option) {
    this.setData({
      chaptername:option.chaptername
    })
    //向后端拉取帖子列表
    wx.request({
      url: getApp().globalData.ip + 'lesson/GetPosts',
      data: {chapter_id:getApp().globalData.current_chapter_id,course_id:getApp().globalData.current_course_id},
      method: 'GET',
      timeout: 0,
      success: (result) => {
        console.log(result)
        var res = JSON.stringify(result.data)
        var regex = /#chapter_id:(\d+),comments:(\d+),course_id:(\d+),level:(\d+),likes:(\d+),post_content:(.*?),post_id:(\d+),post_time:(.*?),post_user_id:(.*?),question_id:(.*?),quoted_post_id:(.*?),root_post_id:(.*?),type_:(\d+)/g;
        var match;
        var resultList = [];
        while ((match = regex.exec(res)) !== null) {
          console.log(match)
          var forum_id = parseInt(match[7])
          var list = match[6].split('$')
          var title = list[0]
          var text = list[1]
          var time = match[8]
          var name = match[9]
          // 构造字典对象并添加到结果列表
          var courseObject = {
            title: title, 
            time: time, 
            content:text,
            forum_id:forum_id,
            name:name
          };
          resultList.push(courseObject);
        }
        console.log(resultList)
        this.setData({
          items:resultList,
          courseCount:resultList.length
        })
        getApp().globalData.forum_list = resultList
      },
      fail: (err) => {},
      complete: (res) => {},
    })
    // 页面加载时对 items 进行排序
    let items = this.data.items;

    items.sort((a, b) => {
      // 首先按照 isTop 字段降序排列
      if (b.isTop - a.isTop !== 0) {
        return b.isTop - a.isTop;
      }
      
      // 如果 isTop 相同，则按照 time 字段降序排列
      return new Date(b.time) - new Date(a.time);
    });

    // 更新数据
    this.setData({
      items: items,
    });
  },
  
  goToPostDetail: function(e) {
    var index = e.currentTarget.dataset.index
    getApp().globalData.current_forum_id = this.data.items[index].forum_id
    wx.navigateTo({
      url: '/pages/Forum/PostDetil/PostDetil?title=' + this.data.items[index].title + '&text=' + this.data.items[index].content + '&time=' + this.data.items[index].time
    });
  },
});
