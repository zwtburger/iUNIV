// pages/administrator/administrator.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    beginDate: '2019-01-01',
    beginTime: '00:00',
    endDate: '2019-01-01',
    endTime: '00:00'
  },

  bindBeginDateChange: function (e) {
    this.setData({
      beginDate: e.detail.value
    })
  },

  bindBeginTimeChange: function (e) {
    this.setData({
      beginTime: e.detail.value
    })
  },

  bindEndDateChange: function (e) {
    this.setData({
      endDate: e.detail.value
    })
  },

  bindEndTimeChange: function (e) {
    this.setData({
      endTime: e.detail.value
    })
  },

  submit: function(e){
    var that = this;
    wx.showModal({
      title: '确认提交？',
      content: '活动提交后无法修改！',
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
        } else {
          //点击确定
          wx.request({
            url: getApp().globalData.server + '/newActivity',
            data: {
              name: e.detail.value.name,
              date: that.data.beginDate + ' ' + that.data.beginTime + ' - ' + that.data.endDate + ' ' + that.data.endTime,
              place: e.detail.value.place,
              introduction: e.detail.value.introduction,
              fee: e.detail.value.fee
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              wx.switchTab({
                url: '../../pages/index/index'
              });
            }
          });
        }
      }
    });
  },

  upload:function(){
    wx.chooseImage({
      success: function(res) {},
    })
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
