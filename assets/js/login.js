$(function () {

    // 点击去登录

    $('#link_reg').on('click', function () {
        $('.reg_box').show();
        $('.login_box').hide();

    })

    // 点击去注册

    $('#link_login').on('click', function () {
        $('.reg_box').hide();
        $('.login_box').show();

    })

    // 从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer
    // 通过form.verify() 函数自定义校验规则
    form.verify({

        // 自定义了一个叫做pwd校验规则

        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        //判断两次输入密码是否一致的规则

        repwd: function (value) {

            //通过形参来获取密码确认框的值
            //判断密码框的值与其是否一致
            // 若不一致,则弹出提示框
            var pwd = $('.reg_box [name=password]').val();

            if (pwd !== value) {
                return '两次密码输入不一致'
            }

        }

    })

    // 监听注册表单的提交事件

    $('#form_reg').on('submit', function (e) {

        // 1.阻止默认的提交行为

        e.preventDefault();

        // 2.发起Ajax的POST请求
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser',
            data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功,请登录!');

                // 模拟人的点击行为

                $('#link_login').click();
            })
    })

    // 监听登录表单的提交事件

    $('#form_login').on('submit', function (e) {

        // 阻止默认提交行为

        e.preventDefault();

        // 发起Ajax请求,POST获取数据

        $.ajax({
            url: '/api/login',
            method: 'POST',

            // 快速获取表单中的数据

            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')

                // 将登录成功得到的token字符串保存到localStorage中

                localStorage.setItem('token', res.token)

                // 跳转到后台主页

                location.href = '/index.html';
            }
        })
    })
})