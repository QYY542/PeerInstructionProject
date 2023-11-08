Page({
  data: {
    items: [
      { 
        title: '作业疑问', 
        time: '2023-11-08 10:30', 
        content: '关于最近的数学作业，第五题的解题方法能否详细讲解一下？关于最近的数学作业，第五题的解题方法能否详细讲解一下？关于最近的数学作业，第五题的解题方法能否详细讲解一下？关于最近的数学作业，第五题的解题方法能否详细讲解一下？' 
      },
      { 
        title: '期中考试安排', 
        time: '2023-11-07 14:20', 
        content: '期中考试将在下周一开始。' 
      },
      { 
        title: '关于实验课程的通知', 
        time: '2023-11-06 09:00', 
        content: '下周三的物理实验课程将调整到周五进行，请大家注意时间变化。' 
      },
      { 
        title: '图书馆学习资源', 
        time: '2023-11-05 16:45', 
        content: '图书馆新增了一批学习资源，涉及物理、化学等科目，欢迎借阅。' 
      }
    ],
    courseCount: 4  // Assuming that each post is related to a different course
  },

  goToPostDetil: function() {
    wx.navigateTo({
      url: '/pages/Forum/PostDetil/PostDetil'
    });
  },
});
