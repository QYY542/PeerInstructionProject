Page({
  data: {
    currentTag: '',
    tags: [],
    question: '',
    imageSrc: '',
    options: {A: '', B: '', C: '', D: ''},
    difficulty:'',
    answer: [],  // 答案是一个数组
    shared: true, // 默认为'是'
  },
  //标签
  inputTag(e) {
    let value = e.detail.value;
    // 检查用户是否按下删除键，并且输入框为空
    if (this.data.currentTag === '' && e.detail.cursor === 0 && e.detail.keyCode === 8) {
      this.deleteLastTag();
      return;
    }
    if (value.endsWith(' ') || value.endsWith('\n')) {
      this.addTag(value.trim());
      value = '';
    }
    this.setData({ currentTag: value });
},

  handleConfirm() {
    this.addTag(this.data.currentTag.trim());
    this.setData({ currentTag: '' });
  },

  addTag(tag) {
    if (tag && this.data.tags.indexOf(tag) === -1) {
      this.data.tags.push(tag);
      this.setData({ tags: this.data.tags });
    }
  },

  deleteTag(e) {
    const index = e.currentTarget.dataset.index;
    this.data.tags.splice(index, 1);
    this.setData({ tags: this.data.tags });
  },

  // 新增函数来删除最后一个标签
deleteLastTag() {
  const tags = this.data.tags;
  if (tags.length) {
    tags.pop();
    this.setData({ tags });
  }
},

  //输入文本

  inputQuestion(e) {
    this.setData({ question: e.detail.value });
  },

  //选择图片
  chooseImage(){
    wx.chooseMedia({
      count:1,
      mediaType:['image'],
      sourceType:['album','camera'],
      camera: 'back',
      success:(res => {
        console.log("获取图片成功");
        console.log(res.tempFiles[0]);
        this.setData({
          imageSrc:res.tempFiles[0].tempFilePath
        })
      }),
      fail:(err => {
        console.log("获取图片失败",err);
      })
    })
  },
  chooseRecordImage(){ 
    wx.chooseMessageFile({
      count: 1,
      type:'image',
      success:(res =>{
        console.log("获取图片成功");
        console.log(res.tempFiles[0]);
        this.setData({
          imageSrc:res.tempFiles[0].path
        })
      }),
      fail:(err =>{
        console.log("获取图片失败",err);
      })
    })
   },
   deleteImage(){
    this.setData({
      imageSrc:''
    })
   },
  previewImage(){
    wx.previewMedia({
      sources: [{url:this.data.imageSrc,type:'image'}],
    })
  },

  //输入选项文本
  inputOptionA(e) {
    let options = this.data.options;
    options.A = e.detail.value;
    this.setData({ options: options });
  },

  inputOptionB(e) {
    let options = this.data.options;
    options.B = e.detail.value;
    this.setData({ options: options });
  },

  inputOptionC(e) {
    let options = this.data.options;
    options.C = e.detail.value;
    this.setData({ options: options });
  },

  inputOptionD(e) {
    let options = this.data.options;
    options.D = e.detail.value;
    this.setData({ options: options });
  },

  //选择正确答案
checkboxChange(e) {
  const sortedAnswers = e.detail.value.sort();
  // 获取checkbox的value值，这是一个数组
  console.log('checkbox发生change事件，携带value值为：', e.detail.value);
  // 更新数据
  this.setData({ answer: sortedAnswers });
  console.log('answer：', this.data.answer);
},
  //是否共享
  radioChange(e) {
    this.setData({ shared: e.detail.value === 'yes' });
},

  submit: function() {
    const difficulty = this.data.difficulty;
    const year = new Date().getFullYear();
    const subject = '科目';
  
    const tags = [...this.data.tags]; // 创建 tags 数组的副本
  
    // 删除前三个标签
    if (tags.length >= 3) {
      tags.splice(0, 3);
    }
  
    // 在数组开头添加新的标签
    tags.unshift(difficulty, year, subject);
  
    // 更新 difficulty 和 tags
    this.setData({
      tags: tags
    });
  
    // 打印选择的难度和标签
    console.log('标签:', this.data.tags);


    console.log('题目数据：', this.data);
    // 这里可以编写提交数据到服务器的代码,两个
    wx.uploadFile({
      filePath: this.data.imageSrc,
      name: 'question_img',
      url: getApp().globalData.ip + 'chapter/NewQuestion',
    })
    wx.request({
      url: getApp().globalData.ip + 'chapter/NewQuestion',
      data: {user_id:getApp().globalData.user_id, course_id:getApp().globalData.current_course_id, chapter_id:getApp().globalData.current_chapter_id, tags:this.data.tags, question:this.data.question,  imageSrc:this.data.imageSrc, options:this.data.options, answer:this.data.answer, shared:this.data.shared},
      dataType: String,
      method: 'POST',
      timeout: 0,
      success: (result) => {
        wx.showToast({
          title: '创建成功',
        })
      },
      fail: (err) => {},
      complete: (res) => {},
    })

    //退回到上一界面
    // wx.navigateTo({
    //   url: 'pages/Teacher/TeacherChapter/TeacherChapterMain/TeacherChapterMain',
    // })
  },
  radioChangeDifficulty(e) {
    const value = e.detail.value;

  
  
    // 更新 difficulty 和 tags
    this.setData({
      difficulty: value,
    });
  
    // 打印选择的难度和标签
    console.log('选择的难度:', value);
  }
});
