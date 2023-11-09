Page({
  data: {
    chapterName: '', // 保存章节名称
    editMode: false, // 编辑模式
    editSaveBtnText: '修改', // 按钮文本
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
    this.setData({
      show:false
    })
    wx.navigateTo({
      url: '/pages/Teacher/TeacherFile/TeacherFileMain/TeacherFileMain'
    });
  },

  goToForumMain: function() {
    this.setData({
      show:false
    })
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
    this.setData({
      show:false
    })
    wx.navigateTo({
      url: '/pages/Teacher/TeacherQuestion/TeacherQuestion/TeacherQuestion'
    });
  },

  buttontap(e){
    console.log(e.detail.index)
    //查看文件
    if(e.detail.index == 1){
      this.setData({
        show:false
      })
      wx.navigateTo({
        url: '/pages/Teacher/TeacherQuestion/TeacherQuestionChoose/TeacherOriginalQuestion/TeacherOriginalQuestion'
      });
    }else{
      this.setData({
        show:false
      })
      wx.navigateTo({
        url: '/pages/Teacher/TeacherQuestion/TeacherQuestionChoose/TeacherQuestionBank/TeacherQuestionBank'
      });
    }
  },

  // 输入框输入事件
  onChapterNameInput(event) {
    this.setData({
      chapterName: event.detail.value
    });
  },

  // 切换编辑模式
  toggleEditMode() {
    const currentEditMode = this.data.editMode;
    if (!currentEditMode) {
      // 进入编辑模式
      this.setData({
        editMode: true,
        editSaveBtnText: '保存'
      });
    } else {
      // 保存章节名称
      const newChapterName = this.data.chapterName;
      // 执行保存章节名称的操作
      console.log('New chapter name:', newChapterName);

      // 退出编辑模式
      this.setData({
        editMode: false,
        editSaveBtnText: '修改'
      });
    }
  }
});
