Page({
  data: {
    items: [
      { name: '题目1' },
      { name: '题目2' },
      { name: '题目3' },
      { name: '题目4' },
    ],
    courseCount: 2 ,  // 初始值设置为2，因为目前有两个课程
  },

  goToFileMain: function(e) {
    wx.navigateTo({
      url: '/pages/Student/StudentFile/StudentFileMain/StudentFileMain'
    });
  },

  goToForumMain: function() {
    wx.navigateTo({
      url: '/pages/Student/StudentForum/StudentForumMain/StudentForumMain'
    });
  },
  
  goToQuestionMain: function(e) {
    wx.navigateTo({
      url: '/'
    });
  },
});
