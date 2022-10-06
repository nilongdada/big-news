$(function() {
  const form = layui.form

  form.verify({
    pass: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
    samePwd: function(value) {
      if(value === $('[name=old_pwd]').val()) {
        return '新旧密码不能相同！'
      }
    },
    rePwd:function(value) {
      if(value !== $('[name=new_pwd]').val()) {
        return '两次密码输出不一致'
      }
    }
  })

  //监听表单提交事件
  $('.layui-form').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
      method: 'PATCH',
      url: '/my/updatepwd',
      data: form.val('pwdForm'),
      success(res) {
        if(res.code !== 0 ) return layer.msg('修改失败')

        layer.msg('修改成功')

        //重置表单
        $('.layui-form')[0].reset()
      }
    })
  })
})