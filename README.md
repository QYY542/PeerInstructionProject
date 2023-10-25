# PeerInstructionProject
卓越工程课程--同伴教学法平台微信小程序

开发人员：覃英瑜、王梓臣
### 1
app.wxss里设计整体的样式
页面的wxss一般设计特殊的样式

### 2
<input>输入框模板：
```
      <input class="input-field" placeholder="用户名"  bindinput="inputUsername"/>
```

### 3
每个按钮点击事件写一段控制台输出
```
      console.log('===登录===');
      console.log('邮箱:', this.data.email);
      console.log('密码:', this.data.password);
```

需要检测每个输入框是否空白
```
  nextStep: function() {
    if (this.data.className && this.data.classPassword) {
      // 在这里添加你的代码来处理“下一步”操作
      // 例如，你可能想要导航到另一个页面或者做一些其他的事情
      wx.navigateTo({
        url: '/pages/Teacher/TeacherClass/TeacherNewChapter/TeacherNewChapter'  // 假设你有一个名为'nextPage'的页面
      });
    } else {
      wx.showToast({
        title: '请填写所有字段',
        icon: 'none'
      });
    }

    console.log('===创建新课程===');
    console.log('课程名称:', this.data.className);
    console.log('课程密码:', this.data.classPassword);
  }
});
```

### 4
修改一个data中变量名称需要修改如下位置
1.wxml里<input>2处(中文、inputXXX)
2.js里inputXXX
3.js里console.log(XXX)
4.其他部分

### 5
颜色规范
#ff4c4c;红--删除按钮颜色

### 6
测试账号密码：1,1（测试教师版界面）
测试账号密码：2,2（测试学生版界面）

### 7
添加页面需要在app.json里调整顺序

### 8
现在没有关于学生加入和退出课程的管理，退出课程应不应该保留他的学习数据？
