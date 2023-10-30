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


  goToFileDetil(){
    wx.navigateTo({
      url: '/pages/Student/StudentFile/StudentFileDetil/StudentFileDetil'
    });
  },

  downloadItem(){

  },
  deleteItem(){
    
  },
})