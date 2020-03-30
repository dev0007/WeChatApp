// pages/index/myindex.js
let api = require('../../utils/api.js')
let util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleList: {
      datas: [],
      curPage: 0,
    }
  },


  getTop: function(options) {
    var that = this;
    wx.request({
      url: 'https://www.wanandroid.com/banner/json',
      success: function (res) {
        console.log(res.data);
        that.setData({
          bannerlist: res.data.data,
        })
      }
    })
  },


  getList:function() {
    let curPage = this.data.articleList.curPage;
    api.articleList(curPage)
      .then(data => {
        this.data.articleList.datas.push(...data.datas);
        this.data.articleList.curPage = data.curPage;
        this.data.articleList.pageCount = data.pageCount;
        this.setData({
          articleList: this.data.articleList
        })
        wx.stopPullDownRefresh();
      }).catch(res => {
        wx.stopPullDownRefresh();
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTop();
    this.getList();
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
    this.data.articleList={
      datas:[],
      curPage:0,
    }
    this.getTop();
    this.getList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.articleList.curPage < this.data.articleList.pageCount) {
      this.getList();
    } else {
      util.toast('没有了哦~');
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})