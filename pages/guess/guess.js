import url from '../../utils/config.js';

Page({

	data: {
		types: []
	},

	onLoad: function (options) {
		var that = this;
		wx.request({
			url: url.type,
			success: function (res) {
				that.setData({
					types: res.data.result
				})
			}
		})
	},

	tolist(e) {
		var id = e.currentTarget.dataset.id;
		wx.navigateTo({
      url: '../playlist/playlist?id=' + id + '&status=每日推荐',
		})
	},

  onShareAppMessage: function () {

  }
})