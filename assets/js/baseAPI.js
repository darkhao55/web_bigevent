$.ajaxPrefilter((options) => {
    options.url = 'http://www.liulongbin.top:3007' + options.url
        // 统一为有权限的接口，设置 headers 请求头
    if (options.url.includes('/my/')) {
        options.headers = {
            Authorization: localStorage.getItem("token"),
        };
    }
    options.complete = res => {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})