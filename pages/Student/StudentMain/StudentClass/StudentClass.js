Page({
  data: {
    items: [
      { name: '课程1' },
      { name: '课程2' }
    ],
    courseCount: 2 ,  // 初始值设置为2，因为目前有两个课程
  },

  deleteItem: function(e) {
    let index = e.currentTarget.dataset.index;
    let items = this.data.items;
    items.splice(index, 1);
    this.setData({
      items: items,
      courseCount: items.length  // 更新课程数量
    });
  },

  addItem: function() {
    let items = this.data.items;
    items.push({ name: '新的课程xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' });
    this.setData({
      items: items,
      courseCount: items.length  // 更新课程数量
    });
    wx.navigateTo({
      url: '/pages/Student/StudentMain/StudentNewClass/StudentNewClass'
    });

  }
});
