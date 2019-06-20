// 获取菜单信息
export function getMenu () {
    return {
      // isOpen: false,
      url: 'http://localhost:8080/menu',
      type: 'get',
      data: {
        'msg': 'success',
        'code': 0,
        'data': {
          'id': '@increment', 
          'name': 'menu', // 随机生成姓名
          'order|10-20': 12
          // 其他数据
        }
      }
    }
  }