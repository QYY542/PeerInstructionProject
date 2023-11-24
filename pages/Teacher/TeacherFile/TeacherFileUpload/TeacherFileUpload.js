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
          name:"Data.xlsx",
          src:"https://phys.fudan.edu.cn/_upload/article/files/12/88/9cc9a89e46ab83872d54bcedf948/a2365a7e-826c-4dd8-abbe-7fef6af179de.xlsx"
        },
        {
          name:"FinalExam.pdf",
          src:"https://basics.sjtu.edu.cn/~dominik/teaching/2018-cs499/homework/2017-final-exam.pdf"
        },
        {
          name:"PhysicalExperiment.docx",
          src:"https://spe.sysu.edu.cn/phylab/docs/2023-06/20230605150343742435.docx"
        },
        {
          name:"Thermodynamics.ppt",
          src:"https://www.chem.pku.edu.cn/wangy/docs/20210310194106310238.pptx"
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
  fileTitle(e){
    this.setData({
      fileTitle:e.detail.value
    })
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
    /*
    this.setData({
      show:true,
      src:e.currentTarget.id
    })
    const src = e.currentTarget.id
    console.log(src)
    */
   this.setData({
    src:e.currentTarget.id
  })
   const src = e.currentTarget.id
   console.log(src)
         //查看文件
         wx.showLoading({
          title: '文件下载中...',
        });
        wx.downloadFile({
          url: this.data.src,
          success:(res =>{
            wx.hideLoading();
            console.log(typeof(res))
            const filePath = res.tempFilePath
            console.log(filePath)
            wx.openDocument({
              filePath: filePath,
              fileType: '',
              showMenu:true,
              success(res){
                console.log("打开文档成功")
              },
              fail(res){
                wx.showToast({
                  title: '打开文档失败',
                  icon: 'none'
                });
              }
            })
          }),
          fail(err) {
            wx.hideLoading();
            wx.showToast({
              title: '下载文件失败',
              icon: 'none'
            });
            console.error("下载文件失败", err);
          }
        })
  },

  //可能弃用
  buttontap(e){
    console.log(e.detail.index)
    
    if(e.detail.index == 1){
      //查看文件
      wx.showLoading({
        title: '文件下载中...',
      });
      wx.downloadFile({
        url: this.data.src,
        success:(res =>{
          wx.hideLoading();
          console.log(typeof(res))
          const filePath = res.tempFilePath
          console.log(filePath)
          wx.openDocument({
            filePath: filePath,
            fileType: 'xlsx',
            showMenu:true,
            success(res){
              console.log("打开文档成功")
            },
            fail(res){
              wx.showToast({
                title: '打开文档失败',
                icon: 'none'
              });
            }
          })
        }),
        fail(err) {
          wx.hideLoading();
          wx.showToast({
            title: '下载文件失败',
            icon: 'none'
          });
          console.error("下载文件失败", err);
        }
      })
    }else{
      //下载文件
      wx.showLoading({
        title: '文件下载中...',
      });
      wx.downloadFile({
        url: this.data.src,
        success: (res) => {
          wx.hideLoading();
          console.log(res);
          if (res.statusCode === 200) {
            const tempFilePath = res.tempFilePath;
            wx.getFileSystemManager().saveFile({
              tempFilePath: tempFilePath,
              success: (res) => {
                console.log(res);
                const savedFilePath = res.savedFilePath;
                // 在此处进行文件保存成功后的操作，例如显示成功提示等

                wx.showToast({
                  title: '保存文件成功',
                  icon: 'none'
                });
              },
              fail: (res) => {
                wx.showToast({
                  title: '保存文件失败',
                  icon: 'none'
                });
                console.error("保存文件失败", res);
              }
            });
          } else {
            wx.showToast({
              title: '下载文件失败',
              icon: 'none'
            });
            console.error("下载文件失败", res);
          }
        },
        fail: (err) => {
          wx.hideLoading();
          wx.showToast({
            title: '下载文件失败',
            icon: 'none'
          });
          console.error("下载文件失败", err);
        }
      });
    }

  },

  //可能弃用
  addNewFileDisk(){
    const that = this;
    wx.chooseFile
  },

  addNewFileMessage() {
    const that = this; // 保存当前页面的this对象，以便在回调函数中使用
    wx.chooseMessageFile({
      count: 1,
      type: "file",
      success(res) {
        console.log(res);
        const { tempFiles } = res;
        if (tempFiles && tempFiles.length > 0) {
          const file = tempFiles[0];
          const newItem = {
            name: file.name,
            fileId: Math.random().toString(36).substring(2),
            // 其他你想要保存的文件信息...
          };
          const items = that.data.items.concat(newItem); // 将新文件
          that.setData({
            items,
          });
        }
      },
      fail(err) {
        console.error("选择文件失败:", err);
      },
    });
  },

  saveOperation(){

  }
  
})