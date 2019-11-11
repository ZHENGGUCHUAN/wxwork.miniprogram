// pages/gcard/gcard.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        compName: 'Stedi',
        appName: 'MiniProgram',
        accessToken: '',
        jsCode: '',
        userId: '',
        sessionKey: '',
        options: '',
        token: '',
        opinion: "",
        detail: '',
        actionBack: '',
        actionforward: '',
        status: ''
    },

    clickButton: function(e) {
        var that = this;
        var value = e.currentTarget.dataset['index'];
        wx.request({
            url: "https://www.13564721030.cn/api/qyExecuteGcard",
            method: 'post',
            data: {
                jscode: that.data.code,
                compName: that.data.compName,
                appName: that.data.appName,
                type: that.options.type,
                subtypeCode: that.options.subtypeCode,
                id: that.options.id,
                opinion: that.data.opinion,
                status: value.Status,
                action: value.Action,
            },
            success: function(res) {
                console.log(res.data)
                if (res.data) {
                    wx.redirectTo({
                        url: '../Result/Succeed/successed'
                    })

                } else {
                    wx.redirectTo({
                        url: '../Result/Failed/failed'
                    })
                }
            },
            fail: function(err) {
                wx.redirectTo({
                    url: '../Result/Failed/failed'
                })
            },
        })
    },

    bindTextAreaBlur: function(e) {
        console.log(e.detail.value)
        var that = this
        that.setData({
            opinion: e.detail.value,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this
        // 登录获取jscode
        wx.qy.login({
            success: function(res) {
                if (res.code) {
                    that.data.jsCode = res.code
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
                        success: function(res) {
                            if ((res.data.Actions).length != 0) {
                                var ActionBack;
                                var Actionforward;
                                for (var i in res.data.Actions) {
                                    if (res.data.Actions[i].Type == 'back') {
                                        ActionBack = res.data.Actions[i]
                                    } else {
                                        Actionforward = res.data.Actions[i]
                                    }
                                }
                                that.setData({
                                    detail: res.data.Datas,
                                    actionBack: ActionBack,
                                    actionforward: Actionforward
                                })
                            }
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
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})