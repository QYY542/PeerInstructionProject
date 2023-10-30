// pages/Teacher/TeacherFile/TeacherFileUpload/TeacherFileUpload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      show:false,
      src:'',
      fileTitle:'',
      items:[
        {
          name:"课程目录.docx",
          src:1
        },
        {
          name:"课程细节.pptx",
          src:2
        },
        {
          name:"课堂成员.xlsx",
          src:3
        },
      ],
      buttons:[
        {
          type:'default',
          classname:'',
          text:'下载文件',
          value:0
        },
        {
          type:'primary',
          classname:'',
          text:'查看文件',
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

  showMore(e){
    this.setData({
      show:true,
      src:e.currentTarget.id
    })
    const src = e.currentTarget.id
    console.log(src)
  },

  buttontap(e){
    console.log(e.detail.index)
    //查看文件
    if(e.detail.index == 1){
      wx.downloadFile({
        url: this.data.src,
        success:(res =>{
          const filePath = res.filePath
          wx.openDocument({
            filePath: filePath,
            showMenu:true,
            success(res){
              console.log("打开文档成功")
            }
          })
        })
      })
    }else{
      wx.downloadFile({
        url: this.data.src,
        success:(res =>{
          console.log(res)
          const tempFilePaths = res.tempFilePath
          wx.saveFileToDisk({
            filePath: tempFilePaths,
            success(res) {
              console.log(res)
            },
            fail(res) {
              console.error(res)
            }
          })
        })
      })
    }

  }
  
})