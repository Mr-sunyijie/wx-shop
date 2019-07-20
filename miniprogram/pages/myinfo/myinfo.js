// miniprogram/pages/myinfo/myinfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    tel: '',
    email: '',
    address: '',
    username: ''
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
      success: function(res) {
        that.setData({
          username: res.data
        })

        var username = that.data.username;

        //获取个人信息
        wx.request({
          url: `${app.globalData.URL}getUserinfo?username=${username}`,
          success: function (res) {
            console.log(res);
            if(res.data.length) {
              that.setData({
                name: res.data[0].name,
                tel: res.data[0].tel,
                email: res.data[0].email,
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
  inputInfo: function (e) {
    console.log(e)
    var target = e.currentTarget.dataset.type;
    var value = e.detail.value;

    switch(target) {
      case 'name':
        this.setData({
          name: value
        });
        break;
      case 'tel':
        this.setData({
          tel: value
        });
        break;
      case 'email':
        this.setData({
          email: value
        });
        break;
      case 'address': 
        this.setData({
          address: value
        })
    }
  },
  //保存个人信息
  saveInfo: function () {

    var that = this;
    //获取个人信息
    var username = that.data.username;
    var name = that.data.name;
    var tel = that.data.tel;
    var address = that.data.address;
    var email = that.data.email;

    //确保所有输入项用户都已填入
    if(this.data.name && this.data.tel && this.data.email && this.data.address) {
      wx.request({
        url: `${app.globalData.URL}saveUserinfo?name=${name}&username=${username}&tel=${tel}&address=${address}&email=${email}`,
        success: function (res) {
          console.log(res);
        }
      })
      //保存到数据库中
      wx.showToast({
        title: "信息保存成功",
        icon: 'success',
        duration: 2000
      })
    }else {
      wx.showToast({
        title: "所有项目均为必填项",
        icon: 'none',
        duration: 2000
      })
    }
  }
})