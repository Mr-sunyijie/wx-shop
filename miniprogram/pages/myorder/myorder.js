// miniprogram/pages/myorder/myorder.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: []
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

    var that = this;

    wx.getStorage({
      key: 'name',
      success: function (res) {
        that.setData({
          username: res.data
        })

        var username = that.data.username;

        //获取个人信息
        wx.request({
          url: `${app.globalData.URL}getOrdersForUser?username=${username}`,
          success: function (res) {
            console.log(res);
            for(var i = 0; i < res.data.length; i++) {
              //处理订单详情
              res.data[i].ids = res.data[i].ids.split(',');
              //处理下单时间
              var ordertime = parseInt(res.data[i].time);
              res.data[i].times = new Date(ordertime).toLocaleString();
              //处理订单状态
              if(res.data[i].status == 0) {
                res.data[i].status = '待发货';
              } else if(res.data[i].status == 1) {
                res.data[i].status = '发货中';
              } else if(res.data[i].status == 2) {
                res.data[i].status = '已签收'
              }
            }
            that.setData({
              orders: res.data
            })
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
  //确认收货
  confirmOrder: function (e){
    //获取订单的下单时间
    var time = e.currentTarget.dataset.time;
    wx.request({
      url: `${app.globalData.URL}confirm?time=${time}`,
      success: function (res) {
        wx.showToast({
          title: "订单签收成功",
          icon: 'success',
          duration: 2000
        })
      }
    })

  }
})