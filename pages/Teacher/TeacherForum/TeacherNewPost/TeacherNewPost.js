// pages/Teacher/TeacherForum/TeacherNewPost/TeacherNewPost.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    forum_title:'',
    forum_text:'',
    is_top:''
  },
  inputTitle(e){
    this.setData({
      forum_title: e.detail.value
    });
  },
  inputContent(e){
    this.setData({
      forum_text: e.detail.value
    })
  },
  radioChange: function (e) {
    var selected = e.detail.value
    this.setData({
      is_top:selected
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  post: function() {
    //将内容传递给后端
    var content = this.data.forum_title + '$' + this.data.forum_text
    wx.request({
      url: getApp().globalData.ip + 'lesson/CreatePost',
      data: {chapter_id:getApp().globalData.current_chapter_id, course_id:getApp().globalData.current_course_id, user_id:getApp().globalData.user_id, content:content},
      method: 'POST',
      timeout: 0,
      success: (result) => {
        if(result.statusCode == 200){
          wx.showToast({
            title: '发帖成功',
          })
        }else{

        }
      },
      fail: (err) => {},
      complete: (res) => {},
    })
    
  },
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})