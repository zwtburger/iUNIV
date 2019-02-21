// pages/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: '',
    avatarUrl: '',
    actNum: '13',
    major: '生命科学学院',
    uid: '',
    ifFollow: false
  },

  goToAct: function (e) {
    wx.navigateTo({
      url: '../activity/activity?uid=' + this.data.uid,
    })
  },

  followUser: function (e) {
    var that = this;
    if (that.data.ifFollow) {
      wx.request({
        url: getApp().globalData.server + '/unfollow',
        data: {
          uid1: getApp().globalData.userInfo.uid,
          uid2: that.data.uid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          wx.showToast({
            title: '取消关注',
            duration: 500,
            mask: true
          })
          that.setData({
            ifFollow: false
          })
        }
      });
    } else {
      wx.request({
        url: getApp().globalData.server + '/follow',
        data: {
          uid1: getApp().globalData.userInfo.uid,
          uid2: that.data.uid
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          wx.showToast({
            title: '关注成功',
            duration: 500,
            mask: true
          })
          that.setData({
            ifFollow: true
          })
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      uid: options.uid
    });
    wx.request({
      url: getApp().globalData.server + '/userInfo',
      data: {
        uid1: getApp().globalData.userInfo.uid,
        uid2: that.data.uid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          nickName: res.data.userInfo.nickName,
          avatarUrl: res.data.userInfo.avatarUrl,
          ifFollow: res.data.userInfo.ifFollow
        });
      }
    });
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
