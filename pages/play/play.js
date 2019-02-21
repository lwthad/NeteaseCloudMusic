// pages/play/play.js
import url from '../../utils/config.js';
var song = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: '00:00',
    end: '00:00',
    duration: 0,
    currentTime: 0,
    isDown: true,
    isPlay: true,
    lrc: {},
    viewId: 'el-00:00',
    imgSrc: 'https://p1.ssl.qhmsg.com/t01d019768db0015252.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //歌曲id
    var id = options.id

    //设置顶部歌曲名
    // console.log(options)
    var name = options.name
    wx.setNavigationBarTitle({
      title: name,
    })
    
    if (!song) {
      song = wx.createInnerAudioContext();
    }
    song.src = 'http://music.163.com/song/media/outer/url?id=' + id + '.mp3';
    // const BackgroundAudioManager = wx.getBackgroundAudioManager()
    // BackgroundAudioManager.src = 'http://music.163.com/song/media/outer/url?id=' + id + '.mp3';
    song.play();
    // song.loop = true;
    
    //监听音频播放事件
    song.onPlay(function () { });
    var that = this;
    song.onTimeUpdate(function () {
      if (that.data.isDown) {
        var duration = song.duration;
        var currentTime = song.currentTime;
        var start = that.turnTime(currentTime);
        var end = that.turnTime(duration);
        that.setData({
          start: start,
          end: end,
          duration: duration,
          currentTime: currentTime
        })
        if (start in that.data.lrc && 'el-' + start != that.data.viewId) {
          that.setData({
            viewId: 'el-' + start
          })
        }
      }
    })

    //获取歌单的详情
    wx.request({
      url: url.pic + '?ids=' + id,
      success: function (res) {
        // console.log(res)
        if (res.statusCode == 200) {
          that.setData({
            // imgSrc: res.data.playlist.coverImgUrl
            imgSrc: res.data.songs['0'].al.picUrl
          })
        }
      }
    })

    //获取歌词
    wx.request({
      url: url.lyric + '?id=' + id,
      success: function (res) {
        // console.log(res) 
        // 判断歌词是否存在
        if (!res.data.nolyric){
            var str = res.data.lrc.lyric;
            var reg = /\[(.*?)](.*)/g;
            var json = {}
            str.replace(reg, function ($1, $2, $3) {
              $2 = $2.slice(0, 5);
              json[$2] = $3;
            })
            that.setData({
              lrc: json
            })
        }
      }
    })
  },

  turnTime(num) {
    var minute = Math.floor(num / 60);
    minute = minute < 10 ? '0' + minute : minute;
    var second = Math.floor(num) % 60;
    second = second < 10 ? '0' + second : second;
    return minute + ':' + second;
  },

  changing() {//过程中
    this.setData({
      isDown: false
    })
  },

  change(e) {//结束
    this.setData({
      isDown: true
    })
    song.seek(e.detail.value)
  },

  toggle() {
    this.data.isPlay ? song.pause() : song.play();
    this.setData({
      isPlay: !this.data.isPlay
    })
  }


})