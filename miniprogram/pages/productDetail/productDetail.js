// miniprogram/pages/productDetail/productDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    img: '',
    name: '',
    count: 0,
    username: '',
    isCollected: false,
    price: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取来自导航页的参数
    console.log(options);
    this.setData({
      img: options.img,
      name: options.name,
      id: options.id,
      price: options.price
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
        if(res.data) {
          wx.getStorage({
            key: 'name',
            success: function (res) {
              console.log(res)
              that.setData({
                username: res.data
              })
              var name = that.data.username;
              var id = that.data.id;
              //判断当前商品是否是用户收藏过的商品
              wx.request({
                url: `${app.globalData.URL}getItemInCollect?name=${name}&id=${id}`,
                success: function (res) {
                  console.log(res);
                  if (res.data.length) {
                    that.setData({
                      isCollected: true
                    })
                  } else {
                    that.setData({
                      isCollected: false
                    })
                  }
                }
              })
              //同步购物车中的商品数量
              wx.request({
                url: `${app.globalData.URL}getCart?name=${name}`,
                success: function (res) {
                  console.log(res);
                  that.setData({
                    count: res.data.length
                  })
                }
              })
            },
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
  redirectToShopCar: function () {
    console.log('test')
    wx.switchTab({
      url: '../shopping/shopping'
    })
  },
  //加入购物车
  add_shop: function () {
    var that = this;
    //确保只有在登录状态才可以进行加入购物车操作
    wx.getStorage({
      key: 'logined',
      success: function(res) {
        if(res.data) {

          var name = that.data.username;
          var id = that.data.id;
          var number = that.data.count;

          //请求接口，判断当前商品是否在购物车中存在
          wx.request({
            url: `${app.globalData.URL}isInCart?name=${name}&id=${id}`,
            success: function (res) {
              console.log(res);
              if(res.data.length) {
                wx.showToast({
                  title: "该商品已经在购物车中",
                  icon: 'none',
                  duration: 2000
                })
              } else {
                //将购物车信息写入数据库表
                wx.request({
                  url: `${app.globalData.URL}addToshoppingCart?name=${name}&id=${id}&number=${number}`,
                  success: function (res) {
                    console.log(res);
                    wx.showToast({
                      title: "加入购物车成功",
                      icon: 'success',
                      duration: 2000
                    })
                  }
                })
              }
            }
          })
        }else {
          wx.showToast({
            title: "请登录后操作",
            icon: 'none',
            duration: 2000
          })
        }
      },
    })
  },
  //收藏商品
  collected : function () {
     var that = this;
    //确保只有在登录状态才可以进行商品收藏操作
    wx.getStorage({
      key: 'logined',
      success: function(res) {
        console.log(res);
        if(res.data) {
          
          //获取当前账户名，商品id
          var name = that.data.username;
          var id = that.data.id;

          that.setData({
            isCollected: !that.data.isCollected
          })
          if (that.data.isCollected) {

            wx.request({
              url: `${app.globalData.URL}addToCollect?name=${name}&id=${id}`,
              success: function(res) {
                wx.showToast({
                  title: "收藏成功",
                  icon: 'success',
                  duration: 2000
                })
              }
            })

          } else {
            wx.request({
              url: `${app.globalData.URL}removeItemFromCollect?name=${name}&id=${id}`,
              success: function (res) {
                wx.showToast({
                  title: "取消收藏",
                  icon: 'none',
                  duration: 2000
                })
              }
            })
          }
        }else {
          wx.showToast({
            title: "请登录后操作",
            icon: 'none',
            duration: 2000
          })
        }
      },
    })
    
  },
  //跳转至聊天界面
  goToChat: function () {

    wx.getStorage({
      key: 'logined',
      success: function (res) {
        console.log(res);
        if (res.data) { //只有在登录状态下才可以与客服进行聊天
          console.log('跳转至聊天界面');
          wx.navigateTo({
            url: '../chat/chat',
          })
        }else {
          wx.showToast({
            title: "请登录后操作",
            icon: 'none',
            duration: 2000
          })
        }
       }
    })
  },
  //点击立即购买按钮
  directToBuy: function (e) {
    var self = this;
    wx.getStorage({
      key: 'logined',
      success: function (res) {
        console.log(res);
        if (res.data) { //只有在登录状态下才可以进行立即购买的操作
          var totalPrice = self.data.price;
          var productData = [{
            name: self.data.name,
            number: 1,
            price: self.data.price,
            id: self.data.id
          }]

          var productDataJSON = JSON.stringify(productData);

          wx.navigateTo({
            url: `../pay/pay?goods=${productDataJSON}&totalPrice=${totalPrice}`,
          })

        } else {
          wx.showToast({
            title: "请登录后操作",
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  }
})