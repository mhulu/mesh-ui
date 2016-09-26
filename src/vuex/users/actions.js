import * as types from '../mutation-types'
import api from '../../api'

export const updateUserInfo = ( {dispatch}, id, data) => {
  api.updateUser(id, data).then(response => {
    swal({
      title: '操作成功',
      text: '个人资料更新成功',
      type: 'success',
      timer: 1500
    }, function () {
      window.location.reload()
    })
  }, response => {
    swal({
      title: '操作失败',
      text: '个人资料更新失败，可能由于网络不畅通造成，请及时联系管理员',
      type: 'error',
      timer: 1500
    })
  })
}
