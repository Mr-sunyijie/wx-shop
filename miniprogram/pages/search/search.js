// miniprogram/pages/search/search.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: [],
    start: 0,
    content: '',
    isSearch: false,
    noresult: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var self = this;
    var start = self.data.start;
    //来自分类页面的搜索关键字数据
    var keyword = options.keyword;
    if (keyword) {
      self.setData({
        start: 0,
        content: keyword,
        isSearch: true
      })
      wx.request({
        url: `${app.globalData.URL}search?start=${this.data.start}&keyword=${this.data.content}`,
        success: function (res) {
          console.log(res);
          self.setData({
            productList: res.data
          })
        }
      })
    }
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
    var self = this;
    console.log('到底了');
    //更新分页偏移量的值，上拉加载更多数据
    this.setData({
      start: this.data.start += 10
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `${app.globalData.URL}search?start=${this.data.start}&keyword=${this.data.content}`,
      success: function (res) {
        console.log(res);
        if(res.data.length) {
          self.setData({
            productList: self.data.productList.concat(res.data)
          })
        }else {
          wx.showToast({
            title: "没有更多数据了",
            icon: 'none',
            duration: 2000
          })
        }
        // wx.hideLoading()
        setTimeout(function(){
          wx.hideLoading()
        }, 1000)
      }
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //跳转至商品详情页
  redirectToDetail: function (e) {
    var img = e.currentTarget.dataset.img;
    var imgArr = img.split('/');
    imgArr[3] = 'n1';
    imgArr[4] = 's450x450_jfs';
    img = imgArr.join('/');
    //商品名
    var name = e.currentTarget.dataset.name;
    //商品id
    var id = e.currentTarget.dataset.id;
    //商品价格
    var price = e.currentTarget.dataset.price;
    wx.navigateTo({
      url: "../productDetail/productDetail?name=" + name + "&img=" + img + "&id="+ id + "&price=" + price
    })
    console.log(e);
  },
  //监听搜索输入框输入事件
  inputKeyword: function (e) {
    this.setData({
      content: e.detail.value
    })
    if(!e.detail.value) {
      this.setData({
        isSearch: false,
        noresult: false
      })
    }
  },
  search: function () {
    var self = this;
    var keyword = self.data.content;
    //重置分页偏移量start
    self.setData({
      start: 0,
      isSearch: true
    })
    //请求接口数据
    wx.request({
      url: `${app.globalData.URL}search?start=${this.data.start}&keyword=${this.data.content}`,
      success: function (res) {
        console.log(res);
        self.setData({
          productList: res.data
        })
        if(!res.data.length) {
          self.setData({
            noresult: true
          })
        }
      }
    })
  }
})