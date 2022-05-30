$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
            $('.login-box').show()
            $('.reg-box').hide()
        })
        // 引入form模块
    const form = layui.form
        // 自定义检验规则
    form.verify({
            // 自定义一个叫 pwd 的校验规则
            pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
            repwd: (value) => {
                // 通过形参拿到的是确认密码框中的内容
                // 还需要拿到密码框中的内容
                // 然后进行一次等于的判断
                // 如果判断失败,则return一个提示消息即可
                const pwd = $('#form_reg [name=password]').val()
                if (pwd !== value) return '两次输入的密码不一致'
            }

        })
        // 获取 layui 弹窗
    const layer = layui.layer;
    // 设置请求根路径
    // const baseUrl = "http://www.liulongbin.top:3007";
    $('#form_reg').on('submit', (e) => {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $("#form_reg [name=username").val(),
                password: $("#form_reg [name=password").val(),
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('注册成功')
                    // 注册成功后跳转到登录界面
                $("#link_login").click();
            }

        })

    })
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {

                if (res.status !== 0) return layer.msg('登录失败!')
                layer.msg('登录成功!')
                localStorage.setItem('token', res.token)
                location.href = "/index.html";
            }

        })
    })
})