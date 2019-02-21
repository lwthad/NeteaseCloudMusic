// pages/searchlist/searchlist.js
import url from '../../utils/config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: [],
    imgSrc: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    var mname = options.name;
    var that = this;
    wx.request({
      url: url.search + '?keywords=' + mname,
      success: function (res) {
        that.setData({
          data: res.data.result.songs
        })
        wx.request({
          url: url.pic + '?ids=' + res.data.result.songs[0].id,
          success: function (res) {
            // console.log(res.data.songs[0].al)
            if (res.statusCode == 200) {
              that.setData({
                imgSrc: res.data.songs[0].al.picUrl
              })
            }
          }
        })
      }
    })
  },
  //input失去焦点
  blur(e) {
    this.setData({
      val: e.detail.value
    })
  },
  //用户点击了搜索按钮
  search() {
    var that = this;
    wx.request({
      url: url.search + '?keywords=' + that.data.val,
      success: function (res) {
        that.setData({
          data: res.data.result.songs
        })
        wx.request({
          url: url.pic + '?ids=' + res.data.result.songs[0].id,
          success: function (res) {
            // console.log(res.data.songs[0].al)
            if (res.statusCode == 200) {
              that.setData({
                imgSrc: res.data.songs[0].al.picUrl
              })
            }
          }
        })
      }
    })
  },
  //跳到播放页面
  toPlay(e) {
    var id = e.currentTarget.dataset.id;
    var name = e._relatedInfo.anchorRelatedText;
    name = e.currentTarget.dataset.text;
    wx.navigateTo({
      url: '../play/play?id=' + id + "&name=" + name,
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

  }
})