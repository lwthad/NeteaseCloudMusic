import url from '../../utils/config.js';
Page({

	/**
	 * 页面的初始数据'http://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'
	 */
  data: {
    val: '义勇军进行曲',
    data: [],
    imgSrc:[]
  },

	/**
	 * 生命周期函数--监听页面加载
	 */
  onLoad: function (options) {

  },

  //input失去焦点
  blur(e) {
    this.setData({
      val: e.detail.value == '' ? '义勇军进行曲' : e.detail.value
    })
  },

  //用户点击了搜索按钮
  search() {
    var that = this;
    wx.request({
      url: url.search + '?keywords=' + that.data.val,
      success: function (res) {
        // console.log("请求的歌曲信息： ")
        // console.log(res)
        that.setData({
          data: res.data.result.songs,
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
        //获取图片
        // console.log(res.data.result.songs.length)
        // var length = res.data.result.songs.length;
        // var i;
        // for(i=0;i<length;i++){
        //   wx.request({
        //     url: url.pic + '?ids=' + res.data.result.songs[i].id,
        //     success: function (res) {
        //       // console.log(res.data.songs[0].al)
        //       if (res.statusCode == 200) {
        //         that.setData({
        //           imgSrc: res.data.songs[0].al
        //         })
        //         that.data.imgSrc[i] = that.data.imgSrc;
        //       }
        //       console.log(that.data.imgSrc)
        //     }
        //   })
        // }
      }
    })
  },

  //跳到播放页面
  toPlay(e) {
    // console.log("播放传送信息：")
    // console.log(e)
    var id = e.currentTarget.dataset.id;
    var name = e._relatedInfo.anchorRelatedText;
    name = e.currentTarget.dataset.text;
    wx.navigateTo({
      url: '../play/play?id=' + id + "&name=" + name,
    })
  }
})