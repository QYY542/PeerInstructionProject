Page({
  data: {
    items: [
      { name: '帖子1' },
      { name: '帖子2' },
      { name: '帖子3' },
      { name: '帖子4' },
    ],
    courseCount: 2 ,  // 初始值设置为2，因为目前有两个课程
  },

  addNewPost: function(e) {
    wx.navigateTo({
      url: '/pages/Teacher/TeacherForum/TeacherNewPost/TeacherNewPost'
    });
  },

  goToPostDetil: function() {
    wx.navigateTo({
      url: '/pages/Forum/PostDetil/PostDetil'
    });
  },
});
