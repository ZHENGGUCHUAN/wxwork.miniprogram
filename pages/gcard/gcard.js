// pages/gcard/gcard.js\
Page({

    /**
     * 页面的初始数据
     */

    data: {
        compName: 'Stedi',
        appName: 'MiniProgram',
        options: '',
        opinion: "",
        detail: '',
        actions: '',
        attachments: '',
    },

    clickButton: function (e) {
        var that = this;
        var value = e.currentTarget.dataset['index'];
        wx.qy.login({
            success: function (res) {
                if (res.code) {
                    wx.showLoading({
                        title: '加载中',
                        mask: true
                    }),
                    wx.request({
                        url: "https://www.13564721030.cn/api/qyExecuteGcard",
                        method: 'post',
                        data: {
                            jscode: res.code,
                            compName: that.data.compName,
                            appName: that.data.appName,
                            gcardType: that.options.type,
                            subtypeCode: that.options.subtypeCode,
                            gcardId: that.options.id,
                            opinion: that.data.opinion,
                            status: value.Status,
                            action: value.Action,
                        },
                        success: function (res) {
                            console.log(res.data)
                            wx.hideLoading();
                            if (res.data.errcode == 0) {
                                wx.redirectTo({
                                    url: '../Result/Succeed/successed'
                                })
                            } else {
                                wx.redirectTo({
                                    url: '../Result/Failed/failed'
                                })
                            }
                        },
                        fail: function (err) {
                            wx.hideLoading();
                            wx.redirectTo({
                                url: '../Result/Failed/failed'
                            })
                        },
                    })
                }
            }
        })
    },

    bindTextAreaBlur: function (e) {
        console.log(e.detail.value)
        var that = this
        that.setData({
            opinion: e.detail.value,
        })
    },
    ClickTap: function (e) {
        wx.showToast({
            title: "查看附件详细信息需要链接隧道院VPN，如已连接请忽略",
            icon: 'none',
            duration: 3000
        });
        setTimeout(function () {
            wx.navigateTo({
                url: '../attachment/attachment?Url=' + e.currentTarget.dataset.type, 
                success: function () {
                    console.log("成功")
                }, //成功后的回调；
                fail: function () {
                    console.log("失败")
                }, //失败后的回调；
                complete: function () {
                    console.log("需要链接VPN")
                } //结束后的回调(成功，失败都会执行)
            })
        }, 3000)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        // 登录获取jscode
        wx.qy.login({
            success: function (res) {
                if (res.code) {
                    wx.showLoading({
                        title: '加载中',
                        mask: true
                    }),
                    that.options = options
                    wx.request({
                        url: 'https://www.13564721030.cn/api/qyGetGcard',
                        data: {
                            jscode: res.code,
                            compName: that.data.compName,
                            appName: that.data.appName,
                            type: options.type,
                            id: options.id,
                            subtypeCode: options.subtypeCode
                        },
                        success: function (res) {
                            that.setData({
                                detail: res.data.Datas,
                                actions: res.data.Actions,
                                attachments: res.data.Attachments
                            })
                        },
                        complete: function (res) {
                            wx.hideLoading();
                        }
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
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