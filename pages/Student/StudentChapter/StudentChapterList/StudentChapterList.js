Page({
  data: {
    items: [
      { name: '章节1' },
      { name: '章节2' }
    ],
    courseCount: 2 ,  // 初始值设置为2，因为目前有两个课程
  },

  onShow: function(){
    
    //页面加载时向后端请求该教师目前课程章节进行页面初始化
    wx.request({
      url: getApp().globalData.ip + '',//todo:确定地址
      data: {course_id: getApp().globalData.current_course_id},//传递该课程id以索引
      method: 'GET',
      timeout: 0,
      success: (result) => {
        console.log(result)
        var res = JSON.stringify(result.data)
        console.log(res)
        var regex = /#chapter_description:(.*?),chapter_id:(\d+),chapter_name:(.*?),course_id:(\d+)/g;//todo:确定传递格式与后续处理
        var match;
        var resultList = [];
        while ((match = regex.exec(res)) !== null) {
          var chapterName = match[3];
          var chapterId = parseInt(match[2]);      
          // 构造字典对象并添加到结果列表
          var courseObject = {
            'name': chapterName,
            'chapter_id': chapterId
          };
          resultList.push(courseObject);
        }
        // 打印结果列表
        console.log(resultList);
        this.setData({
          items: resultList,
          courseCount: resultList.length  // 更新课程数量
        });
        getApp().globalData.chapter_list = resultList
        console.log("全局变量")
        console.log(getApp().globalData.chapter_list)
      },
      fail: (err) => {},
      complete: (res) => {},
    })
      },

      onLoad: function(){
        //页面加载时向后端请求该教师目前课程章节进行页面初始化
        wx.request({
          url: getApp().globalData.ip + '',//todo:确定地址
          data: {course_id: getApp().globalData.current_course_id},//传递该课程id以索引
          method: 'GET',
          timeout: 0,
          success: (result) => {
            console.log(result)
            var res = JSON.stringify(result.data)
            console.log(res)
            var regex = /#chapter_description:(.*?),chapter_id:(\d+),chapter_name:(.*?),course_id:(\d+)/g;//todo:确定传递格式与后续处理
            var match;
            var resultList = [];
            while ((match = regex.exec(res)) !== null) {
              var chapterName = match[3];
              var chapterId = parseInt(match[2]);
              // 构造字典对象并添加到结果列表，todo:是否扩展
              var courseObject = {
                'name': chapterName,
                'chapter_id': chapterId
              };
              resultList.push(courseObject);
            }
            // 打印结果列表
            console.log(resultList);
            this.setData({
              items: resultList,
              courseCount: resultList.length  // 更新课程数量
            });
            this.data.items = resultList
            getApp().globalData.chapter_list = resultList
            console.log(getApp().globalData.chapter_list)
          },
          fail: (err) => {},
          complete: (res) => {},
        })
          },
  goToChapterMain: function(e) {
    var index = e.currentTarget.dataset.index;
    //保存至全局变量方便后续页面调用
    getApp().globalData.current_chapter_id = this.data.items[index].chapter_id
    wx.navigateTo({
      url: '/pages/Student/StudentChapter/StudentChapterMain/StudentChapterMain'
    });
  }

});
