$(function () {
    var form = layui.form

    // 自定义表单验证

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },

        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '密码输入不一致'
            }
        }

    })

    // 监听表单的提交
    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        console.log($(this).serialize());

        // ajax 请求数据
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败!')
                }
                layui.layer.msg('更新密码成功!')
                $('.layui-form')[0].reset()
            }
        })
    })
})