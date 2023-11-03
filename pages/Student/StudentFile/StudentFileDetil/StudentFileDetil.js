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
      wx.showLoading({
        title: '文件下载中...',
      });
      wx.downloadFile({
        url: this.data.src,
        success:(res =>{
          wx.hideLoading();
          const filePath = res.tempFilePath
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
      wx.showLoading({
        title: '文件下载中...',
      });
      wx.downloadFile({
        url: this.data.src,
        success:(res =>{
          wx.hideLoading();
          console.log(res)
          const tempFilePaths = res.tempFilePath
          wx.saveFileToDisk({
            filePath: tempFilePaths,
            success(res) {
              console.log(res)
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
    }

  }
  
})