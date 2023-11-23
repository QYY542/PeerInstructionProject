Page({
  data: {
    chapterName: '', // 保存章节名称
    editMode: false, // 编辑模式
    editSaveBtnText: '修改', // 按钮文本
    show:false,
    placeholder_value:'',
    items: [],
    courseCount: 2 ,  // 初始值设置为2，因为目前有两个课程
    buttons:[
      {
        type:'primary',
        classname:'',
        text:'从题库中添加',
        value:0
      },
      {
        type:'primary',
        classname:'',
        text:'创建原创题目',
        value:1
      }
    ]
  },
  onShow: function() {
    //拉取该章节题目列表
    wx.request({
      url: getApp().globalData.ip + 'chapter/ChapterMenu',
      data: {course_id:getApp().globalData.current_course_id, chapter_id:getApp().globalData.current_chapter_id},//发送对应课程章节id索引题目列表
      method: 'GET',
      success: (result) => {
        console.log(result)
        var res = JSON.stringify(result.data)
              var regex = /#answer:(.*?),answer_visibility:(.*?),creator_user_id:(\d+),difficulty:(\d+),open_time(.*?),options:(.*?),question_id:(\d+),question_status:(\d+),question_text:(.*?),round_count:(\d+),shared:(.*?),statistics:(.*?),tags:(.*?),time_limit:(\d+),type_:(\d+),update_time:(.*?)/g;
              var match;
              var resultList = [];
              while ((match = regex.exec(res)) !== null) {
                var question_text = match[9];
                var questionId = parseInt(match[7]);
                var answer = match[1]
                var round_count = parseInt(match[10])
                // 构造字典对象并添加到结果列表
                var courseObject = {
                  'question_text': question_text,
                  'question_id': questionId,
                  'answer':answer,
                  'round_count':round_count
                };
                resultList.push(courseObject);
              }
              console.log(resultList)
              this.setData({
                items: resultList,
                courseCount: resultList.length  // 更新题目列表
              });
              getApp().globalData.question_list = resultList
      },
      fail: (err) => {},
      complete: (res) => {},
    })
    this.setData({
      show:false
    })
  },
  onLoad: function(options) {
    this.setData({
      placeholder_value:options.chaptername,
      chapterName:options.chaptername
    })
    //拉取该章节题目列表
    wx.request({
      url: getApp().globalData.ip + 'chapter/ChapterMenu',
      data: {course_id:getApp().globalData.current_course_id, chapter_id:getApp().globalData.current_chapter_id},//发送对应课程章节id索引题目列表
      method: 'GET',
      success: (result) => {
        console.log(result)
        var res = JSON.stringify(result.data)
              var regex = /#answer:(.*?),answer_visibility:(.*?),creator_user_id:(\d+),difficulty:(\d+),open_time(.*?),options:(.*?),question_id:(\d+),question_status:(\d+),question_text:(.*?),round_count:(\d+),shared:(.*?),statistics:(.*?),tags:(.*?),time_limit:(\d+),type_:(\d+),update_time:(.*?)/g;
              var match;
              var resultList = [];
              while ((match = regex.exec(res)) !== null) {
                var question_text = match[9];
                var questionId = parseInt(match[7]);
                var answer = match[1]
                var round_count = parseInt(match[10])
                // 构造字典对象并添加到结果列表
                var courseObject = {
                  'question_text': question_text,
                  'question_id': questionId,
                  'answer':answer,
                  'round_count':round_count
                };
                resultList.push(courseObject);
              }
              console.log(resultList.length)
              this.setData({
                items: resultList,
                courseCount: resultList.length  // 更新题目列表
              });
              getApp().globalData.question_list = resultList
      },
      fail: (err) => {},
      complete: (res) => {},
    })
    this.setData({
      show:false
    })
  },
  onReady() {
    this.setData({
      show:false
    })
  },
  goToFileMain: function(e) {
    this.setData({
      show:false
    })
    wx.navigateTo({
      url: '/pages/Teacher/TeacherFile/TeacherFileMain/TeacherFileMain'
    });
  },

  goToForumMain: function() {
    this.setData({
      show:false
    })
    wx.navigateTo({
      url: '/pages/Teacher/TeacherForum/TeacherForumMain/TeacherForumMain?chaptername=' + this.data.chapterName
    });
  },

  goToQuestionChoose: function(e) {
    this.setData({
      show:true
    })
  },
  
  goToQuestionMain: function(e) {
    this.setData({
      show:false
    })
    var index = e.currentTarget.dataset.index
    getApp().globalData.current_question_id = this.data.items[index].question_id
    console.log(getApp().globalData.current_question_id)
    wx.navigateTo({
      url: '/pages/Teacher/TeacherQuestion/TeacherQuestion/TeacherQuestion'
    });
  },

  buttontap(e){
    console.log(e.detail.index)
    //查看文件
    if(e.detail.index == 1){
      this.setData({
        show:false
      })
      wx.navigateTo({
        url: '/pages/Teacher/TeacherQuestion/TeacherQuestionChoose/TeacherOriginalQuestion/TeacherOriginalQuestion'
      });
    }else{
      this.setData({
        show:false
      })
      wx.navigateTo({
        url: '/pages/Teacher/TeacherQuestion/TeacherQuestionChoose/TeacherQuestionBank/TeacherQuestionBank'
      });
    }
  },

  // 输入框输入事件
  onChapterNameInput(event) {
    const chapter_name = event.detail.value
    this.setData({
      chapterName: chapter_name,
      placeholder_value: chapter_name
    });
  },

  // 切换编辑模式
  toggleEditMode() {
    const currentEditMode = this.data.editMode;
    if (!currentEditMode) {
      // 进入编辑模式
      this.setData({
        editMode: true,
        editSaveBtnText: '保存'
      });
    } else {
      // 保存章节名称
      const newChapterName = this.data.chapterName;
      // 执行保存章节名称的操作
      console.log('New chapter name:', newChapterName);
      wx.request({
        url: getApp().globalData.ip + 'course/EditChapter',
        data: {chapter_id:getApp().globalData.current_chapter_id,chapter_name:this.data.chapterName},
        method: 'POST',
        timeout: 0,
        success: (result) => {
          //下次拉取时已经更新
        },
        fail: (err) => {},
        complete: (res) => {},
      })

      // 退出编辑模式
      this.setData({
        editMode: false,
        editSaveBtnText: '修改'
      });
    }
  }
});
