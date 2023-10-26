Page({
  data: {
    items: [
      { name: '章节1' },
      { name: '章节2' }
    ],
    courseCount: 2 ,  // 初始值设置为2，因为目前有两个课程
  },

  goToChapterMain: function(e) {
    wx.navigateTo({
      url: '/pages/Student/StudentChapter/StudentChapterMain/StudentChapterMain'
    });
  }

});
