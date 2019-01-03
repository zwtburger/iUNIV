// pages/actInfo/actInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    date: '',
    place: '',
    introduction: '',
    partList: [],
    status: '',
    ifJoin: false,
    aid: ''
  },

  refresh: function () {
    var that = this;
    wx.request({
      url: getApp().globalData.server + '/actInfo',
      data: {
        uid: getApp().globalData.userInfo.uid,
        aid: that.data.aid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          name: res.data.actInfo.name,
          date: res.data.actInfo.date,
          place: res.data.actInfo.place,
          introduction: res.data.actInfo.introduction,
          partList: res.data.actInfo.joinList,
          status: res.data.actInfo.status,
          ifJoin: res.data.actInfo.ifJoin
        });
      }
    });
  },

  joinActivity: function (e) {
    var that = this;
    if (that.data.ifJoin) {
      wx.request({
        url: getApp().globalData.server + '/unjoin',
        data: {
          uid: getApp().globalData.userInfo.uid,
          aid: that.data.aid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          wx.showToast({
            title: '取消报名',
            duration: 500,
            mask: true
          });
          that.setData({
            ifJoin: false
          });
          that.refresh();
        }
      })
    } else {
      wx.request({
        url: getApp().globalData.server + '/join',
        data: {
          uid: getApp().globalData.userInfo.uid,
          aid: that.data.aid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          wx.showToast({
            title: '报名成功',
            duration: 500,
            mask: true
          });
          that.setData({
            ifJoin: true
          });
          that.refresh();
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      aid: options.aid
    });
    that.refresh();
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

  }
})
