// miniprogram/pages/chat/chat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: [],
    inputContent: '',
    sendMsg: [],
    username: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    //建立websocket连接
    wx.connectSocket({
      url: 'ws://172.20.10.4:8080',
    })
    wx.onSocketOpen(function () {
      console.log('websocket连接建立成功');
    })

    wx.onSocketMessage(function(res){
      console.log(res);
      var data = JSON.parse(res.data);
      console.log(data);
      if(data.to == self.data.username) {
        var msgCopy = self.data.msg;
        msgCopy.push(data);
        self.setData({
          msg: msgCopy
        })
      }
    })

    //获取用户名
    wx.getStorage({
      key: 'name',
      success: function(res) {
        var name = res.data;
        self.setData({
          username: name
        })
      },
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //保存输入框中输入的内容
  saveInputValue:function (e) {
    console.log(e);
    this.setData({
      inputContent: e.detail.value
    })
  },
  //发送消息到客服
  sendMsg: function () {
    var data = {
      msg: this.data.inputContent,
      from: this.data.username,
      to: 'kefu'
    }

    wx.sendSocketMessage({
      data: JSON.stringify(data),
    })
    var msgCopy = this.data.msg;
    msgCopy.push(data);
    this.setData({
      inputContent: '',
      msg: msgCopy
    })

  }
})