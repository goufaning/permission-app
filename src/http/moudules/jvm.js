import axios from '../axios'
/**
 * jvm查询
 */
export const query = (data) => {
    return axios({
        url: 'actuator/metrics/' + data,
        method: 'get'
    })
}