// pages/showpay/showpay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  showqr: function(){
    wx.previewImage({
      current: 'http://05.imgmini.eastday.com/mobile/20170821/20170821113806_20503c72900a733831b83f4d1fee9f10_3.jpeg', // 当前显示图片的http链接
      urls: ['http://05.imgmini.eastday.com/mobile/20170821/20170821113806_20503c72900a733831b83f4d1fee9f10_3.jpeg']
    })
    console.log('111')
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