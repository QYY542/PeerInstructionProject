// pages/Teacher/TeacherQuestion/TeacherQuestionChoose/TeacherQuestionBank/TeacherQuestionBank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTag: '',
    tags: [],
    items: [
      { 
        name: '描述并解释欧姆定律及其在简单电路中的应用。考虑一个电压为12V的电池和一个电阻为2Ω的电阻器，求流过电阻器的电流。',
        image: '' 
      },
      { 
        name: '一个物体从静止开始下落，当它下落了5秒时，其速度是多少？（假设重力加速度为\(9.8m/s^2\)，并忽略空气阻力）',
        image: '' 
      },
      { 
        name: '定义动能，并解释其与速度的关系。一个质量为5kg的物体以10m/s的速度移动，其动能是多少？',
        image: '' 
      },
      { 
        name: '解释霍克定律并描述弹簧的应力-应变图。一个弹簧的劲度系数为250N/m，当它被压缩1cm时，它会产生多大的恢复力？',
        image: '' 
      },
      { 
        name: '物体在液体中的浮力是如何产生的？一个体积为200cm^3、密度为800kg/m^3的物体完全浸入水中，受到的浮力是多少？',
        image: '' 
      },
      { 
        name: '描述光的折射和反射。当光线从水传入空气，并与法线成30度角时，它的折射角是多少？（假设水的折射率为1.33，空气的折射率为1.00）',
        image: '' 
      },
      { 
        name: '解释电磁感应和法拉第定律。一个线圈在1秒内的磁通量从0增加到0.02Wb，线圈的电感应应是多少？',
        image: '' 
      },
      { 
        name: '描述波的干涉和衍射。当两个相干的波源的频率为500Hz，它们的相位差为π/2，它们产生的结果波的幅度和频率是多少？',
        image: '' 
      }
  ],
    courseCount: 2 ,  // 初始值设置为2，因为目前有两个课程
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
goToOriginalQuestion(){
  wx.navigateTo({
    url: '/pages/Teacher/TeacherQuestion/TeacherQuestionChoose/TeacherOriginalQuestion/TeacherOriginalQuestion'
  });
}
 
})