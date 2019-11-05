// pages/Submittal/BS/Workflow/bs_workflow.js
// 设计变更工作流页面
// 标题，名称，设计阶段，编号，日期，工点名称，设计单位，变更专业，变更级别，变更类型，变更图册，
// 变更前造价，变更后造价，上报增减金额，变更设计原因及内容，
// 专业负责人/日期，审核人/日期，批准人/日期
// 总体院意见，负责人，日期
// 项目公司意见，负责人，日期
// 获取应用实例
const app = getApp()
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
        token: '',
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
                    that.data.jsCode = res.code
                    wx.request({
                        url: 'https://www.13564721030.cn/api/qyGetSC',
                        data: {
                            jscode: res.code,
                            compName: that.data.compName,
                            appName: that.data.appName,
                            type: options.type,
                            id: options.id,
                        },
                        success: function (res) {
                            console.log('Datas: ' + res.data.Datas[0].Name)
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