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

### 4
修改一个data中变量名称需要修改如下位置
1.wxml里<input>2处(中文、inputXXX)
2.js里inputXXX
3.js里console.log(XXX)
4.其他部分

### 5
测试新分支
