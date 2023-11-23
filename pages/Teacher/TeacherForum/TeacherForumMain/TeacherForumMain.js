Page({
  data: {
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

  onShow: function () {
    //向后端拉取帖子列表
    wx.request({
      url: getApp().globalData.ip + 'url',//todo:确定地址
      data: {chapter_id:getApp().globalData.current_chapter_id},//传递章节id
      method: 'GET',
      timeout: 0,
      success: (result) => {
        var res = JSON.stringify(result.data)
        var regex = /#admin_user_id:(\d+),course_id:(\d+),creation_time:(.*?),description:(.*?),enrollment_count:(\d+),name:(.*?),on_air:(.*?),passwprd:(\d+),popularity:(\d+)/g;//todo:确定传递格式与列表格式
        var match;
        var resultList = [];
        while ((match = regex.exec(res)) !== null) {
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
  onLoad: function () {
    //向后端拉取帖子列表
    wx.request({
      url: getApp().globalData.ip + 'url',//todo:确定地址
      data: {chapter_id:getApp().globalData.current_chapter_id},//传递章节id
      method: 'GET',
      timeout: 0,
      success: (result) => {
        var res = JSON.stringify(result.data)
        var regex = /#admin_user_id:(\d+),course_id:(\d+),creation_time:(.*?),description:(.*?),enrollment_count:(\d+),name:(.*?),on_air:(.*?),passwprd:(\d+),popularity:(\d+)/g;//todo:确定传递格式与列表格式
        var match;
        var resultList = [];
        while ((match = regex.exec(res)) !== null) {
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

  addNewPost: function(e) {
    wx.navigateTo({
      url: '/pages/Teacher/TeacherForum/TeacherNewPost/TeacherNewPost'
    });
  },

  goToPostDetail: function() {
    wx.navigateTo({
      url: '/pages/Forum/PostDetil/PostDetil'
    });
  },

  showMoreOptions: function (e) {
    let index = e.currentTarget.dataset.index;
    let items = this.data.items;

    // 弹出操作菜单
    wx.showActionSheet({
      itemList: ['置顶','删除'],
      success: (res) => {
        if (res.tapIndex === 0) {
          // 删除操作
          // 例如：items.splice(index, 1);
        } else if (res.tapIndex === 1) {
          // 置顶操作
          // 例如：items[index].isTop = true;
        }

        // 更新数据
        this.setData({
          items: items,
        });
      },
    });
  },
});
