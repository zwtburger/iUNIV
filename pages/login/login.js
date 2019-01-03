// pages/login/login.js
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onShow: function () {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            lang: 'zh_CN',
            success: function (res) {
              //从数据库获取用户信息
              that.queryUserInfo(res.userInfo);
              //用户已经授权过
              wx.switchTab({
                url: '../index/index'
              })
            }
          });
        }
      }
    })
  },

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //插入登录的用户的相关信息到数据库
      wx.request({
        url: getApp().globalData.server + '/create',
        data: {
          nickName: e.detail.userInfo.nickName,
          avatarUrl: e.detail.userInfo.avatarUrl,
          province: e.detail.userInfo.province,
          city: e.detail.userInfo.city
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          //从数据库获取用户信息
          that.queryUserInfo(res.data.userInfo);
        }
      });
      //授权成功后，跳转进入小程序首页
      wx.switchTab({
        url: '../index/index'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '提示',
        content: '拒绝授权，无法进入小程序',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {}
      })
    }
  },

  //获取用户信息接口
  queryUserInfo: function (userInfo) {
    wx.request({
      url: getApp().globalData.server + '/login',
      data: {
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl,
        province: userInfo.province,
        city: userInfo.city
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        getApp().globalData.userInfo = res.data.userInfo;
      }
    })
  },
})
