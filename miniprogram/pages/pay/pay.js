// miniprogram/pages/pay/pay.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    username: '',
    totalPrice: '',
    name: '',
    tel: '',
    address: '',
    message: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(JSON.parse(options.goods))
    this.setData({
      goods: JSON.parse(options.goods),
      totalPrice: options.totalPrice
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
      key: 'name',
      success: function (res) {
        console.log(res)
        var name = res.data;
        that.setData({
          username: name
        })
        //获取个人信息
        wx.request({
          url: `${app.globalData.URL}getUserinfo?username=${name}`,
          success: function (res) {
            console.log(res);
            if (res.data.length) {
              that.setData({
                name: res.data[0].name,
                tel: res.data[0].tel,
                address: res.data[0].address
              })
            }
          }
        })
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
  //提交订单
  placeOrder: function () {
    console.log('提交订单')
    var ids = [];
    var goods = this.data.goods;
    var username = this.data.username;
    var time = Date.now();
    var price = this.data.totalPrice;
    var name = this.data.name;
    var tel = this.data.tel;
    var address = this.data.address;
    var info = `收件人:${name}; 收件人电话:${tel}; 收货地址:${address}`;
    for(var i = 0; i < goods.length; i++) {
      var detail = goods[i].name + "*" + goods[i].number
      ids.push(detail);
    }
    ids.push(info);
    if(this.data.message) {
      ids.push(`买家留言:${this.data.message}`);
    }
    console.log(JSON.stringify(ids))
    var idsJSON = JSON.stringify(ids);
    wx.request({
      url: `${app.globalData.URL}placeOrder?time=${time}&name=${username}&price=${price}&ids=${ids}`,
      success: function (res) {
        console.log(res);
      }
    })
    wx.navigateTo({
      url: '../orderComplete/orderComplete',
    })
  },
  //用户订单留言
  leaveMsg: function (e) {
    this.setData({
      message: e.detail.value
    })
  }
})