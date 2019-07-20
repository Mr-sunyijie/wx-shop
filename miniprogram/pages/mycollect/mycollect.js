// miniprogram/pages/mycollect/mycollect.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
        goods: []
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
    that.setData({
      goods: []
    })

    wx.getStorage({
      key: 'name',
      success: function (res) {
        var name = res.data;
        //获取当前用户的商品收藏数据
        wx.request({
          url: `${app.globalData.URL}getCollect?name=${name}`,
          success: function (res) {
            console.log(res);
            for (var i = 0; i < res.data.length; i++) {
              var id = res.data[i].id;
              console.log(id);
              wx.request({
                url: `${app.globalData.URL}getProduct?id=${id}`,
                success: function (res1) {
                  console.log(res1);
                  // for (var i = 0; i < res.data.length; i++) {
                  //   if (res1.data[0].id === res.data[i].id) {
                  //     res1.data[0].number = res.data[i].number;
                  //   }
                  // }
                  var newgoods = that.data.goods.concat(res1.data[0]);
                  that.setData({
                    goods: newgoods
                  })
                }
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
  redirectToDetail: function (e) {
    var img = e.currentTarget.dataset.img;
    var imgArr = img.split('/');
    imgArr[3] = 'n1';
    imgArr[4] = 's450x450_jfs';
    img = imgArr.join('/');
    var name = e.currentTarget.dataset.name;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../productDetail/productDetail?name=" + name + "&img=" + img + "&id=" + id
    })
    console.log(e);
  }
})