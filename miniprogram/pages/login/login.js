// miniprogram/pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    pwd: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  login: function () {
    //用户名
    var name = this.data.name;
    //密码
    var pwd = this.data.pwd;
    //登陆验证
    wx.request({
      url: `${app.globalData.URL}userLogin?name=${name}&pwd=${pwd}`,
      success: function (res) {
        console.log(res);
        //若从数据库中查询不到匹配数据则提示
        if(!res.data.length) {
          wx.showToast({
            title: "用户名/密码错误",
            icon: 'none',
            duration: 2000
          })
        } else {
          //在缓存中存储用户登陆状态
          wx.setStorage({
            key: 'logined',
            data: true,
          })
          //在缓存中存储用户的账户名
          wx.setStorage({
            key: 'name',
            data: name,
          })
          //跳转至登陆成功页面
          wx.switchTab({
            url: '../me/me'
          })

        }
      }
    })
  },
  inputName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  inputPwd: function (e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  //注册新账号
  register: function () {

    var that = this;
    var name = that.data.name;
    var pwd = that.data.pwd;

    wx.request({
      url: `${app.globalData.URL}registerAccount?name=${name}&pwd=${pwd}`,
      success: function (res) {
        wx.showToast({
          title: "注册成功",
          icon: 'success',
          duration: 2000
        })
      }
    })
  }
})