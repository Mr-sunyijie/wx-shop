// pages/category/category.js
const app = getApp();
var categoryCache = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    brandList: [],
    category: [{
        name: '男装',
        selected: false,
        isLoaded: false
      }, {
        name: '女装',
        selected: false,
        isLoaded: false
      },{
        name: '图书',
        selected: false,
        isLoaded: false
      },{
        name: '美妆',
        selected: false,
        isLoaded: false
      }, {
        name: '家电',
        selected: false,
        isLoaded: false
      }, {
        name: '食品',
        selected: false,
        isLoaded: false
      },{
        name: '特产',
        selected: false,
        isLoaded: false
      },{
        name: '钟表',
        selected: false,
        isLoaded: false
      }, {
        name: '饰品',
        selected: false,
        isLoaded: false
      }, {
        name: '酒水',
        selected: false,
        isLoaded: false
      }, {
        name: '鲜花',
        selected: false,
        isLoaded: false
      }, {
        name: '奢侈品',
        selected: false,
        isLoaded: false
      }, {
        name: '手机',
        selected: false,
        isLoaded: false
      }
    ],
    id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    //页面初始化，默认加载第一个分类
    wx.request({
      url: `${app.globalData.URL}category?category=男装`,
      success: function (res) {
        console.log(res);
        self.setData({
          brandList: res.data
        })
        //缓存
        categoryCache[0] = res.data;
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

  select: function (e) {
    var self = this;

    var index = e.target.dataset.id;
    console.log(index);
    self.setData({
      id: index
    })
    var selectItem = self.data.category[index];
    var categoryName = selectItem.name;
    console.log(categoryName);
    if(!categoryCache[index]) {
      wx.request({
        url: `${app.globalData.URL}category?category=${categoryName}`,
        success: function (res) {
          console.log(res);
          self.setData({
            brandList: res.data
          })
          //缓存
          categoryCache[index] = res.data;
          console.log(categoryCache);
        }
      })
    } else {
      self.setData({
        brandList: categoryCache[index]
      })
    }
  },
  //点击分类，跳转到指定的搜索页
  navigateToSearch: function (e) {
    
    var keyword = e.currentTarget.dataset.name;
    //跳转到搜索页
    wx.navigateTo({
      url: '/pages/search/search?keyword=' + keyword
    })

  }
})