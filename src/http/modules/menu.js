import axios from '../axios'
/* 
 * 菜单管理模块
 */
export const findMenuTree = () => {
    return axios({
        url: '/menu/findTree',
        method: 'get'
    })
}