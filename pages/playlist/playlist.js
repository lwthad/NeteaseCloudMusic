// pages/playlist/playlist.js
import url from '../../utils/config.js';

Page({

  data: {
    list: [],
    data: [],
    val: '义勇军进行曲'
  },

  onLoad: function (options) {
    var id = options.id;
    var status = options.status;
    // console.log(status)
    var that = this;
    var requestURL;
    if (status == '每日推荐') {
      requestURL = url.list + '?id=' + id;
    } else {
      requestURL = url.list2 + '?idx=' + id;
    }
    // console.log(requestURL)
    wx.request({
      url: requestURL,
      success: function (res) {
        // console.log(res)
        that.setData({
          list: res.data.playlist.tracks
        })
      }
    })
  },

  audio(e) {
    // console.log(e)
    //传入歌曲详细信息 自写
    var name = e._relatedInfo.anchorRelatedText;
    name = e.currentTarget.dataset.text;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../play/play?id=' + id + "&name=" + name,
    })
  },

  //input失去焦点
  blur(e) {
    // console.log(e)
    this.setData({
      val: e.detail.value == '' ? '义勇军进行曲':e.detail.value
    })
  },

  //搜索
  search() {
    var that = this;
    // console.log("点击了搜索")
    // console.log(that.data.val)
    wx.navigateTo({
      url: '../searchlist/searchlist?name=' + that.data.val,
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