// miniprogram/pages/home/home.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tags: [
      {
        name: '男装',
        category: 'man'
      },
      {
        name: '女装',
        category: 'women'
      },
      {
        name: '家电',
        category: 'EA'
      },
      {
        name: '美妆',
        category: 'makeup'
      },
      {
        name: '食品',
        category: 'food'
      },
      {
        name: '手机',
        category: 'phone'
      }
    ],
    selectID: 0,
    productList: [],
    start: 0,
    currentCategory: 'man'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var start = self.data.start;
    var category = self.data.currentCategory;
    wx.request({
      url: `${app.globalData.URL}channel?start=${start}&category=${category}`,
      success: function (res) {
        console.log(res);
        var data = res.data;
        for(var i = 0; i < data.length; i++) {
          var imgArr = data[i].img.split('/');
          imgArr[3] = 'n1';
          imgArr[4] = 's450x450_jfs';
          data[i].img = imgArr.join('/');
        }
        self.setData({
          productList: res.data
        })
      }
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
    console.log(app)
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
    var start = self.data.start;
    var category = self.data.currentCategory;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `${app.globalData.URL}channel?start=${start}&category=${category}`,
      success: function (res) {
        console.log(res);
        var data = res.data;
        for(var i = 0; i < data.length; i++) {
          var imgArr = data[i].img.split('/');
          imgArr[3] = 'n1';
          imgArr[4] = 's450x450_jfs';
          data[i].img = imgArr.join('/');
        }
        self.setData({
          productList: self.data.productList.concat(res.data)
        })
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
  navigateToSearch: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  //切换商品分类标签
  select: function (e) {
    var that = this;
    var index = e.target.dataset.id;
    var category = e.currentTarget.dataset.category;
    var start = this.data.start;
    this.setData({
      selectID: index,
      currentCategory: category,
      start: 0
    });
    console.log(e);
    //拉取商品列表数据
    wx.request({
      url: `${app.globalData.URL}channel?start=${start}&category=${category}`,
      success: function (res) {
        console.log(res);
        that.setData({
          productList: res.data
        })
      }
    })
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
      url: "../productDetail/productDetail?name=" + name + "&img=" + img + "&id=" + id + "&price=" + price
    })
    console.log(e);
  }
})