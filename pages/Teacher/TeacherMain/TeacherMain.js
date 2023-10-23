Page({
  data: {
    items: [
      { name: '课程1' },
      { name: '课程2' }
    ]
  },

  deleteItem: function(e) {
    let index = e.currentTarget.dataset.index;
    let items = this.data.items;
    items.splice(index, 1);
    this.setData({
      items: items
    });
  },

  addItem: function() {
    // 这里你可以加入添加课程的逻辑
    let items = this.data.items;
    items.push({ name: '新的课程xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' });
    this.setData({
      items: items
    });
  }
});
