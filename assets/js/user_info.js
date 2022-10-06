$(function() {
  //入口函数

  const form = layui.form
  const layer = layui.layer

  form.verify({
    nickname: function (value) {
      if(value.length > 6){
        return `昵称必须是1 - 6的非空字符`
      }
    }
  })

  const initInfo = () => {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success(res) {
        if (res.code !== 0) return layer.msg('请求用户信息失败')
        console.log(res)
        // 1.给表单进行回显数据
        form.val('userForm', res.data)
      }
    })
  }
  initInfo()

  //给重置按钮添加点击事件
  $('#btnReset').on('click', function(e) {
    e.preventDefault()
    //重新刷新用户信息
    initInfo()
  })

  //监听表单提交事件
  $('.layui-form').submit(function(e) {
    e.preventDefault()

    $.ajax({
      method: 'PUT',
      url: '/my/userinfo',
      data: form.val('userForm'),
      success(res) {
        if(res.code !== 0) return layer.msg('更新用户信息失败')
        window.parent.getUserInfo()
        layer.msg('更新用户信息成功')
      }
    })
  })
})