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
        {
          name:"课堂成员.xlsx",
          src:3
        },
        {
          name:"课堂成员.xlsx",
          src:3
        },
        {
          name:"课堂成员.xlsx",
          src:3
        },
        {
          name:"课堂成员.xlsx",
          src:3
        },
        {
          name:"课堂成员.xlsx",
          src:3
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

  },
  addNewFileDisk(){
    const that = this;
    wx.getFileSystemManager()
  },
  addNewFileMessage(){
    const that = this;  // 保存当前页面的this对象，以便在回调函数中使用
    wx.chooseMessageFile({
      count: 1,  // 允许用户选择的最大文件数
      type: 'file',  // 文件类型
      success(res) {
        console.log(res)
        const { tempFiles } = res;  // 获取选择的文件列表
        if (tempFiles && tempFiles.length > 0) {
          const file = tempFiles[0];  // 获取第一个文件（因为count设置为1，所以只有一个文件）
          const newItem = {
            name: file.name,  // 文件名
            fileId: Math.random().toString(36).substring(2),  // 生成一个随机的文件ID
            // 其他你想要保存的文件信息...
          };
          const items = that.data.items.concat(newItem);  // 将新文件添加到items数组中
          that.setData({
            items,  // 更新页面数据，以显示新文件
          });
        }
      },
      fail(err) {
        console.error('选择文件失败:', err);
      }
    });
  },
  saveOperation(){

  }
  
})