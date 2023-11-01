Page({
  data: {
    show:false,
    items: [
      { name: '题目1' },
      { name: '题目2' },
      { name: '题目3' },
      { name: '题目4' },
      { name: '题目5' },
      { name: '题目6' },
    ],
    courseCount: 2 ,  // 初始值设置为2，因为目前有两个课程
    buttons:[
      {
        type:'primary',
        classname:'',
        text:'从题库中添加',
        value:0
      },
      {
        type:'primary',
        classname:'',
        text:'创建原创题目',
        value:1
      }
    ]
  },

  onLoad(options) {
    this.setData({
      show:false
    })
  },
  onReady() {
    this.setData({
      show:false
    })
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
    this.setData({
      show:true
    })
  },
  
  goToQuestionMain: function(e) {
    wx.navigateTo({
      url: '/'
    });
  },

  buttontap(e){
    console.log(e.detail.index)
    //查看文件
    if(e.detail.index == 1){
      wx.navigateTo({
        url: '/pages/Teacher/TeacherQuestion/TeacherQuestionChoose/TeacherOriginalQuestion/TeacherOriginalQuestion'
      });
    }else{
      wx.navigateTo({
        url: '/pages/Teacher/TeacherQuestion/TeacherQuestionChoose/TeacherQuestionBank/TeacherQuestionBank'
      });
    }
  },

});
