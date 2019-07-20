// miniprogram/pages/me/me.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    logined: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    wx.setStorage({
      key: 'logined',
      data: false,
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

    var that = this;

    wx.getStorage({
      key: 'logined',
      success: function(res) {
        console.log(res)
        if(res.data) {
          that.setData({
            logined: true
          })
        }
      },
    })

    wx.getStorage({
      key: 'name',
      success: function (res) {
        console.log(res)
        if (res.data) {
          that.setData({
            name: res.data
          })
        }
      },
    })
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
  //登陆
  login: function () {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  //登出
  logout: function () {
    //清空用户的登陆状态
    wx.setStorage({
      key: 'logined',
      data: false,
    })
    this.setData({
      logined: false
    })
    //提示退出登录
    wx.showToast({
      title: "退出登录",
      icon: 'none',
      duration: 2000
    })
  },
  //点击进入我的订单页面
  toMyOrder: function () {
    wx.navigateTo({
      url: '../myorder/myorder',
    })
  },
  //点击进入我的收藏页面
  toMyCollect: function () {
    wx.navigateTo({
      url: '../mycollect/mycollect',
    })
  },
  //点击进入我的个人信息页面
  toMyInfo: function () {
    wx.navigateTo({
      url: '../myinfo/myinfo',
    })
  },
  //点击进入关于页面
  toAbout: function () {
    wx.navigateTo({
      url: '../about/about',
    })
  }
})