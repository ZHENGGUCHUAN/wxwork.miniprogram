// pages/calendar/calendar.js
Page({
    data: {
        value: new Date(),
        week: ['日', '一', '二', '三', '四', '五', '六'],
        lastMonth: '上月',
        nextMonth: '下月',
        selectVal: '',
        textareaVal: '',
    },
    //组件监听事件
    select(e) {
        this.setData({
            selectVal: e.detail
        })
        try {
            var textarea = wx.getStorageSync(e.detail)
            if (textarea) {
                this.setData({
                    textareaVal: textarea
                })
            }
            else {
                this.setData({
                    textareaVal: ''
                })
            }
        } catch (e) {
            this.setData({
                textareaVal: ''
            })
        }
    },
    // 保存按钮点击事件
    bindFormSubmit: function (e) {
        if (e.n)
        try {
            wx.setStorageSync(
                this.data.selectVal, 
                e.detail.value.textarea)
            wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
            })
        } catch (e) {
            wx.showToast({
                title: '保存失败',
                icon: 'fail',
                duration: 2000
            })
        }
    },
    bindFormSubmit: function (e) {
        try {
            wx.setStorageSync(
                this.data.selectVal, 
                e.detail.value.textarea)
            wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
            })
        } catch (e) {
            wx.showToast({
                title: '保存失败',
                icon: 'fail',
                duration: 2000
            })
        }
    },
    // 清除按钮点击事件
    bindFormReset: function (e) {
        try {
            wx.removeStorageSync(this.data.selectVal),
            this.setData({
                textareaVal: ''
            }),
            wx.showToast({
                title: '清除成功',
                icon: 'success',
                duration: 2000
            })
        } catch (e) {
        }
    },
})
