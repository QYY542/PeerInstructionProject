Page({
  data: {
    course_id:'',
    items: [],
    courseCount: 2 ,  // 初始值设置为2，因为目前有两个课程
  },

  onShow: function(){
    this.setData({
      course_id:getApp().globalData.current_course_id
    })
    //页面加载时向后端请求该教师目前课程章节进行页面初始化
    wx.request({
      url: getApp().globalData.ip + 'course/CourseMenu',
      data: {course_id: getApp().globalData.current_course_id},//传递该课程id以索引
      method: 'GET',
      timeout: 0,
      success: (result) => {
        console.log(result)
        var res = JSON.stringify(result.data)
        console.log(res)
        var regex = /#chapter_description:(.*?),chapter_id:(\d+),chapter_name:(.*?),course_id:(\d+)/g;
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
        this.setData({
          course_id:getApp().globalData.current_course_id
        })
        //页面加载时向后端请求该教师目前课程章节进行页面初始化
        wx.request({
          url: getApp().globalData.ip + 'course/CourseMenu',
          data: {course_id: getApp().globalData.current_course_id},//传递该课程id以索引
          method: 'GET',
          timeout: 0,
          success: (result) => {
            console.log(result)
            var res = JSON.stringify(result.data)
            console.log(res)
            var regex = /#chapter_description:(.*?),chapter_id:(\d+),chapter_name:(.*?),course_id:(\d+)/g;
            var match;
            var resultList = [];
            while ((match = regex.exec(res)) !== null) {
              var chapterName = match[3];
              var chapterId = parseInt(match[2]);
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
            console.log(getApp().globalData.chapter_list)
            console.log(this.data.items)
          },
          fail: (err) => {},
          complete: (res) => {},
        })
          },
  goToChapterMain: function(e) {
    var index = e.currentTarget.dataset.index;
    console.log(index)
    console.log(this.data.items[index].chapter_id)
    //保存至全局变量方便后续页面调用
    getApp().globalData.current_chapter_id = this.data.items[index].chapter_id
    wx.navigateTo({
      url: '/pages/Student/StudentChapter/StudentChapterMain/StudentChapterMain?chapterName=' + this.data.items[index].name
    });
    console.log('StudentList的传参：' + this.data.items[index].name )
  }

});
