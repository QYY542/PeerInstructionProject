Page({
  data: {
    items: [
      { name: '章节1' },
      { name: '章节2' }
    ],
    courseCount: 2 ,  // 初始值设置为2，因为目前有两个课程
    isClassStarted: false, // 初始课堂状态为未开始
    classBtnStyle:'greenBtn',
    classBtnText:'开始上课'
  },

  computed: {
    classBtnStyle: function() {
      return this.data.isClassStarted ? 'redBtn' : 'greenBtn';
    },
  
    classBtnText: function() {
      return this.data.isClassStarted ? '停止课堂' : '开始上课';
    },
  },

  deleteItem: function(e) {
    let index = e.currentTarget.dataset.index;
    let that = this;  // 保存当前的上下文

    wx.showModal({
      title: '确认删除',
      content: '你确定要删除这个章节吗？',
      success (res) {
        if (res.confirm) {
          let items = that.data.items;
          items.splice(index, 1);
          that.setData({
            items: items,
            courseCount: items.length  // 更新课程数量
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    });
  },

  addItem: function() {
    let items = this.data.items;
    items.push({ name: '新的章节xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' });
    this.setData({
      items: items,
      courseCount: items.length  // 更新课程数量
    });
  },

  goToChapterMain: function(e) {
    wx.navigateTo({
      url: '/pages/Teacher/TeacherChapter/TeacherChapterMain/TeacherChapterMain'
    });
  },

  startClass: function() {
    const isClassStarted = this.data.isClassStarted;

    if (isClassStarted) {
      // 处理停止课堂的逻辑，弹出确认停止课堂的模态框
      wx.showModal({
        title: '确认停止课堂',
        content: '你确定要停止课堂吗？',
        success: (res) => {
          if (res.confirm) {
            // 用户点击了确认按钮，执行停止课堂的逻辑
            // 可以在这里添加相应的代码
            this.setData({
              isClassStarted: !isClassStarted,
              classBtnStyle: 'greenBtn',
              classBtnText: '开始上课',
            });
          }
        },
      });
    } else {
      wx.showToast({
        title: '现在开始上课',
        icon: 'none',
        duration: 1000
      });
      // 处理开始上课的逻辑，可以在这里添加相应的代码
      this.setData({
        isClassStarted: !isClassStarted,
        classBtnStyle: 'redBtn',
        classBtnText: '停止课堂',
      });
    }
  },


});
