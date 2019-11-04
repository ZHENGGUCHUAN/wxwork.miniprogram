data: {
    host: 'http://192.168.31.5:6912/'
}

var that = this

// 获取企业微信token
function wxworkToken() {
    wx.getStorage({
        key: 'wxworkToken',
        success: function (res) {
            if (res.data == null)
            {
                wx.request({
                    url: 'https://www.13564721030.cn/api/qyGetToken',
                    data: {
                        compName: 'Stedi',
                        appName: 'MiniProgram',
                        isForced: '1'
                    },
                    success: function (res) {
                        // 将用户信息缓存本地
                        wx.setStorage({
                            key: "wxworkToken",
                            data: res.data.access_token,
                        })
                        console.log('vxworkToken request: ' + res.data.access_token)
                        return res.data.access_token
                    }
                })
            }
            else
            {
                console.log('wxworkToken storage: ' + res.data)
                return res.data
            }
        },
        fail: function (res) {
            wx.request({
                url: 'https://www.13564721030.cn/api/qyGetToken',
                data: {
                    compName: 'Stedi',
                    appName: 'MiniProgram',
                    isForced: '1'
                },
                success: function (res) {
                    // 将用户信息缓存本地
                    wx.setStorage({
                        key: "wxworkToken",
                        data: res.data.access_token,
                    })
                    console.log('vxworkToken request: ' + res.data.access_token)
                    return res.data.access_token
                }
            })
        }
    })
}

// 获取企业微信SessionKey
function sessionKey(code, accessToken) {
    console.log('code: ' + code)
    console.log('accessToken: ' + accessToken)
    wx.getStorage({
        key: 'sessionKey',
        success: function (res) {
            if (res.data == null)
            {
                wx.request({
                    url: 'https://www.13564721030.cn/api/qyGetSession',
                    data: {
                        code: code,
                        token: accessToken,
                    },
                    success: function (res) {
                        // 将用户信息缓存本地
                        wx.setStorage({
                            key: "sessionKey",
                            data: res.data.session_key,
                        })
                        console.log('sessionKey request: ' + res.data.session_key)
                        return res.data.session_key
                    }
                })
            }
            else
            {
                console.log('sessionKey storage: ' + res.data)
                return res.data
            }
        },
        fail: function (res) {
            wx.request({
                url: 'https://www.13564721030.cn/api/qyGetSession',
                data: {
                    code: code,
                    token: accessToken,
                },
                success: function (res) {
                    // 将用户信息缓存本地
                    wx.setStorage({
                        key: "sessionKey",
                        data: res.data.session_key,
                    })
                    console.log('sessionKey request: ' + res.data.session_key)
                    return res.data.session_key
                }
            })
        }
    })
}

// 获取平台token
function greataToken() {
    // 获取当前用户企业微信号
    
    // 获取当前用户企业微信别名
    // 获取平台token
    //wx.request({
    //    url: data.host,
    //})
    //return that.data.host
}

module.exports = {
    wxworkToken,
    sessionKey,
    greataToken
}