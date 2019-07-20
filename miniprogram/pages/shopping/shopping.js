// miniprogram/pages/shopping/shopping.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectAll: false,
    goods: [],
    username: '',
    totalPrice: 0,
    isEdited: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
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
      goods: [],
      totalPrice: 0,
      selectAll: false
    })
      wx.getStorage({
        key: 'name',
        success: function(res) {
          console.log(res)
          var name = res.data;
          that.setData({
            username: name
          })
          wx.getStorage({
            key: 'logined',
            success: function(res) {
              console.log(res)
              if(res.data) {
                //获取当前用户的购物车购物车数据
                wx.request({
                  url: `${app.globalData.URL}getCart?name=${name}`,
                  success: function (res) {
                    console.log(res);
                    for (var i = 0; i < res.data.length; i++) {
                      var id = res.data[i].id;
                      console.log(id);
                      wx.request({
                        url: `${app.globalData.URL}getProduct?id=${id}`,
                        success: function (res1) {
                          console.log(res1);
                          for (var i = 0; i < res.data.length; i++) {
                            if (res1.data[0].id === res.data[i].id) {
                              res1.data[0].number = res.data[i].number;
                            }
                          }
                          var newgoods = that.data.goods.concat(res1.data[0]);
                          that.setData({
                            goods: newgoods
                          })
                        }
                      })
                    }
                  }
                })
              }
            },
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
    console.log('到底啦')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //商品数量-1
  subNumber: function (e) {
    console.log(e);
    that = this;
    var index = e.currentTarget.dataset.id;
    var product = that.data.goods[index];
    var id = product.id;
    var number = product.number;
    var name = that.data.username;
    console.log(product);
    //商品数量-1
    var copyGoods = that.data.goods;
    
    //请求后端接口，更新数据库
    if(number > 1) {

      number = number - 1;
      copyGoods[index].number = number;
      that.setData({
        goods: copyGoods
      })

      wx.request({
        url: `${app.globalData.URL}updateNumber?name=${name}&id=${id}&number=${number}`,
        success: function (res) {
          console.log(res);
        }
      })
    }
  },
  //商品数量+1
  addNumber: function (e) {
    console.log(e);
    that = this;
    var index = e.currentTarget.dataset.id;
    var product = that.data.goods[index];
    var id = product.id;
    var number = parseInt(product.number);
    var name = that.data.username;
    console.log(product);
    //商品数量-1
    var copyGoods = that.data.goods;

    //请求后端接口，更新数据库

      number = number + 1;
      copyGoods[index].number = number;
      that.setData({
        goods: copyGoods
      })

      wx.request({
        url: `${app.globalData.URL}updateNumber?name=${name}&id=${id}&number=${number}`,
        success: function (res) {
          console.log(res);
        }
      })
  },
  changeCondition: function (e) {
    var index = e.target.dataset.id;
    console.log(index)
    var goodsCopy = this.data.goods;
    var total = this.data.totalPrice;
    var price = parseInt(goodsCopy[index].price) * parseInt(goodsCopy[index].number);
    goodsCopy[index].condition = !goodsCopy[index].condition;
    this.setData({
      goods: goodsCopy,
    })
    if (!goodsCopy[index].condition) {
      total -= price;
      this.setData({
        totalPrice: total
      })
    } else {
      total += price;
      this.setData({
        totalPrice: total
      })
    }
  },
  selectAll: function (e) {
    var goodsCopy = this.data.goods;
    var total = 0;
    for (var i = 0; i < goodsCopy.length; i++) {
      if (this.data.selectAll) {
        goodsCopy[i].condition = false;
      } else {
        goodsCopy[i].condition = true;
      }
    }
    this.setData({
      selectAll: !this.data.selectAll,
      goods: goodsCopy
    })

    if(this.data.selectAll) {
      for (var i = 0; i < goodsCopy.length; i++) {
        total += parseInt(goodsCopy[i].price) * parseInt(goodsCopy[i].number);
      }
      this.setData({
        totalPrice: total
      })
    }else {
      this.setData({
        totalPrice: 0
      })
    }

  },
  //跳转至订单提交页面
  pay: function () {
    var goods = this.data.goods;
    var selectedGoods = [];
    for(var i = 0; i < goods.length; i++) {
      if(goods[i].condition) {
        selectedGoods.push(goods[i]);
      }
    }
    selectedGoodsJSON = JSON.stringify(selectedGoods);
    var totalPrice = this.data.totalPrice;
    wx.navigateTo({
      url: `../pay/pay?goods=${selectedGoodsJSON}&totalPrice=${totalPrice}` 
    })
  },
  //将选中的商品从购物车中移除
  removeProduct: function (e) {
    console.log(e)
    var that = this;
    var id = e.currentTarget.dataset.id;
    var name = that.data.username;
    var goodsCopy = that.data.goods;
    for(var i = 0; i < goodsCopy.length; i++) {
      if(goodsCopy[i].id === id) {
        goodsCopy.splice(i, 1);
        that.setData({
          goods: goodsCopy
        })
        
        break;
      }
    }
    wx.request({
      url: `${app.globalData.URL}deleteProduct?id=${id}&name=${name}`,
      success: function (res) {
        console.log(res);
      }
    })
  }
})