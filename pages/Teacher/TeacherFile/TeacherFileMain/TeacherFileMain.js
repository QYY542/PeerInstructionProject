// pages/Teacher/TeacherFile/TeacherFileMain/TeacherFileMain.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '题目1' },
      { name: '题目2' },
      { name: '题目3' },
      { name: '题目4' },
      { name: '题目5' },
      { name: '题目6' },
    ],
    courseCount: 2 ,  // 初始值设置为2，因为目前有两个课程
  },
  onLoad:function (){
    //页面启动时加载初始文件列表
    wx.request({
      url: getApp().globalData.ip + '',//todo:确定地址
      data: {user_id:getApp().globalData.user_id,course_id:getApp().globalData.current_course_id, chapter_id:getApp().globalData.current_chapter_id},//传递用户id,课程id,章节id
      method: 'GET',
      timeout: 0,
      success: (result) => {
        console.log(result)
        var res = JSON.stringify(result.data)
        console.log(res)
        var regex = /#admin_user_id:(\d+),course_id:(\d+),creation_time:(.*?),description:(.*?),enrollment_count:(\d+),name:(.*?),on_air:(.*?),passwprd:(\d+),popularity:(\d+)/g;//todo:确定传递格式与文件列表需要的信息，应该包括文件id
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
        // 打印结果列表
        console.log(resultList);
        this.setData({
          items: resultList,
          courseCount: resultList.length  // 更新课程数量
        });
        getApp().globalData.course_list = resultList
        console.log("全局变量")
        console.log(getApp().globalData.course_list)
      },
      fail: (err) => {},
      complete: (res) => {},
    })
  },


  addNewFile(){
    wx.navigateTo({
      url: '/pages/Teacher/TeacherFile/TeacherFileUpload/TeacherFileUpload'
    });
  },

  goToFileUpload(e){
    var index = e.currentTarget.dataset.index
    //todo:确定传递格式后将打开文件的id赋给全局变量
    wx.navigateTo({
      url: '/pages/Teacher/TeacherFile/TeacherFileUpload/TeacherFileUpload'
    });
  },

  downloadItem(){

  },
  deleteItem(){
    
  },
})