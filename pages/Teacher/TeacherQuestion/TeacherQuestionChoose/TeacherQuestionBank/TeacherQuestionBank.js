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
        image: '',
        tags: ['2023', '物理', '中等', '欧姆定律', '电路', '电阻器', '电流']
      },
      { 
        name: '一个物体从静止开始下落，当它下落了5秒时，其速度是多少？（假设重力加速度为9.8m/s^2，并忽略空气阻力）',
        image: '',
        tags: ['2023', '物理', '简单', '下落', '速度', '重力', '时间']
      },
      { 
        name: '定义动能，并解释其与速度的关系。一个质量为5kg的物体以10m/s的速度移动，其动能是多少？',
        image: '',
        tags: ['2023', '化学', '中等', '动能', '速度', '质量']
      },
      { 
        name: '解释霍克定律并描述弹簧的应力-应变图。一个弹簧的劲度系数为250N/m，当它被压缩1cm时，它会产生多大的恢复力？',
        image: '',
        tags: ['2023', '化学', '困难', '霍克定律', '弹簧', '劲度系数', '恢复力']
      },
      { 
        name: '物体在液体中的浮力是如何产生的？一个体积为200cm^3、密度为800kg/m^3的物体完全浸入水中，受到的浮力是多少？',
        image: '',
        tags: ['2023', '生物', '中等', '浮力', '液体', '浸入', '密度']
      },
      { 
        name: '描述光的折射和反射。当光线从水传入空气，并与法线成30度角时，它的折射角是多少？（假设水的折射率为1.33，空气的折射率为1.00）',
        image: '',
        tags: ['2023', '生物', '简单', '折射', '反射', '光线', '折射率']
      },
      { 
        name: '解释电磁感应和法拉第定律。一个线圈在1秒内的磁通量从0增加到0.02Wb，线圈的电感应应是多少？',
        image: '',
        tags: ['2023', '生物', '困难', '电磁感应', '法拉第定律', '线圈', '磁通量']
      },
      { 
        name: '描述波的干涉和衍射。当两个相干的波源的频率为500Hz，它们的相位差为π/2，它们产生的结果波的幅度和频率是多少？',
        image: '',
        tags: ['2023', '物理', '中等', '波', '干涉', '衍射', '频率']
      }
    ],
    itemsShow:[],
    courseCount: 2 ,  // 初始值设置为2，因为目前有两个课程

    subjects: ['无','数学分析', '物理', '化学', '生物'],  // 学科选择器的选项
    selectedSubjectIndex: 0,    // 选择的学科索引
    selectedSubject: '',        // 选择的学科

    difficulties: ['无','简单', '中等', '困难'],  // 难度选择器的选项
    selectedDifficultyIndex: 0,    // 选择的难度索引
    selectedDifficulty: '',        // 选择的难度

    yearRange: [],           // 年份范围数组
    selectedYearIndex: 0,    // 选择的年份索引
    selectedYear: '',        // 选择的年份
  },

  onLoad: function () {
    const currentYear = new Date().getFullYear(); // 获取当前年份
    const yearRange = [];
    const items = this.data.items;
  
    yearRange.push('无');
    for (let i = currentYear; i >= 1990; i--) {
      yearRange.push(i.toString());
    }
    this.setData({
      yearRange: yearRange,
      itemsShow:items,
    });
    // ... 其他初始化逻辑
    //todo:向后端拉取所有共享题目表
    wx.request({
      url: getApp().globalData.ip + '',
      data: data,
      method: 'GET',
      timeout: 0,
      success: (result) => {},
      fail: (err) => {},
      complete: (res) => {},
    })
  },

  updateItemsShow: function () {
    const tags = this.data.tags;
    const selectedYear = this.data.selectedYear;
    const selectedSubject = this.data.selectedSubject;
    const selectedDifficulty = this.data.selectedDifficulty;
  
    // 根据条件过滤 items
    const filteredItems = this.data.items.filter(item => {
      // 判断题目内容或题目的标签是否包含输入的标签
      const hasTags = tags.length === 0 || tags.some(tag => item.name.includes(tag)) || item.tags.some(tag => tags.includes(tag));
  
      // 判断题目的标签是否包含选定的年份、科目和难度
      const hasSelectedYear = !selectedYear || item.tags.includes(selectedYear);
      const hasSelectedSubject = !selectedSubject || item.tags.includes(selectedSubject);
      const hasSelectedDifficulty = !selectedDifficulty || item.tags.includes(selectedDifficulty);
  
      return hasTags && hasSelectedYear && hasSelectedSubject && hasSelectedDifficulty;
    });
  
    // 更新 itemsShow
    this.setData({
      itemsShow: filteredItems,
    });
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
    this.updateItemsShow(); // 在更新 tags 后调用 updateItemsShow
  }
},

deleteTag(e) {
  const index = e.currentTarget.dataset.index;
  this.data.tags.splice(index, 1);
  this.setData({ tags: this.data.tags });
  this.updateItemsShow(); // 在更新 tags 后调用 updateItemsShow
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
},
// 选择年份的回调函数
bindYearChange: function (e) {
  const selectedYearIndex = e.detail.value;
  const selectedYear = this.data.yearRange[selectedYearIndex];

  this.setData({
    selectedYearIndex: selectedYearIndex,
    selectedYear: selectedYear,
  });

  if(selectedYear == '无'){
    this.setData({
      selectedYearIndex: selectedYearIndex,
      selectedYear: '',
    });
  }

  this.updateItemsShow(); // 在更新时间后调用 updateItemsShow
},

// 选择学科的回调函数
bindSubjectChange: function (e) {
  const selectedSubjectIndex = e.detail.value;
  const selectedSubject = this.data.subjects[selectedSubjectIndex];

  this.setData({
    selectedSubjectIndex: selectedSubjectIndex,
    selectedSubject: selectedSubject,
  });

  if(selectedSubject == '无'){
    this.setData({
      selectedSubjectIndex: selectedSubjectIndex,
      selectedSubject: '',
    });
  }

  this.updateItemsShow(); // 在更新学科后调用 updateItemsShow
},


// 选择难度的回调函数
bindDifficultyChange: function (e) {
  const selectedDifficultyIndex = e.detail.value;
  const selectedDifficulty = this.data.difficulties[selectedDifficultyIndex];

  this.setData({
    selectedDifficultyIndex: selectedDifficultyIndex,
    selectedDifficulty: selectedDifficulty,
  });

  if(selectedDifficulty == '无'){
    this.setData({
      selectedDifficultyIndex: selectedDifficultyIndex,
      selectedDifficulty: '',
    });
  }

  this.updateItemsShow(); // 在更新难度后调用 updateItemsShow
},
})