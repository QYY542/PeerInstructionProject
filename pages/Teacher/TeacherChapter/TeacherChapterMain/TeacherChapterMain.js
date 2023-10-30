Page({
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

  goToFileMain: function(e) {
    wx.navigateTo({
      url: '/pages/Teacher/TeacherFile/TeacherFileMain/TeacherFileMain'
    });
  },

  goToForumMain: function() {
    wx.navigateTo({
      url: '/pages/Teacher/TeacherForum/TeacherForumMain/TeacherForumMain'
    });
  },

  goToQuestionChoose: function(e) {
    wx.navigateTo({
      url: '/'
    });
  },
  
  goToQuestionMain: function(e) {
    wx.navigateTo({
      url: '/'
    });
  },
});
