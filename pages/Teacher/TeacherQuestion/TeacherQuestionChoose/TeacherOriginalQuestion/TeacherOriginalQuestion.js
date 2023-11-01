Page({
  data: {
    currentTag: '',
    tags: [],
    question: '',
    imageSrc: '',
    options: {A: '', B: '', C: '', D: ''},
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
          imageSrc:res.tempFiles[0].tempFilePath
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
    this.setData({ answer: e.detail.value });
  },
  //是否共享
  radioChange(e) {
    this.setData({ shared: e.detail.value === 'yes' });
},

  submit() {
    console.log('题目数据：', this.data);
    // 这里可以编写提交数据到服务器的代码
  }
});
