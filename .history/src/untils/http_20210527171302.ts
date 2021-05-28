import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElLoading } from 'element-plus';
import store from '@/store/index';
import router from '../router';
import { Toast } from 'vant'




let loading: any;
const startLoading = () => {
    interface Options {
        lock: boolean;
        text: string;
        background: string;
    }
    const options: Options = {
        lock: true,
        text: "拼命加载中。。。",
        background: 'rgba(0,0,0,0.7)'
    }
    loading = ElLoading.service(options);
}

const endLoading = () => {
    loading.close();
}

/** 
 * 提示函数 
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = (msg: string) => {
    Toast({
        message: msg,
        duration: 1000,
        forbidClick: true
    });
}
/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    router.replace({
        path: '/login',
        query: {
            //@ts-ignore
            redirect: router.currentRoute.fullPath
        }
    });
}
/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status: number, other: any) => {
    // 状态码判断
    switch (status) {
        // 401: 未登录状态，跳转登录页
        case 401:
            toLogin();
            break;
        // 403 token过期
        // 清除token并跳转登录页
        case 403:
            tip('登录过期，请重新登录');
            localStorage.removeItem('token');
            store.commit('loginSuccess', null);
            setTimeout(() => {
                toLogin();
            }, 1000);
            break;
        // 404请求不存在
        case 404:
            tip('请求的资源不存在');
            break;
        default:
            console.log(other);
    }
}

// 创建axios实例,设置请求超时时间
var instance = axios.create({ timeout: 1000 * 30 });
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/json';

// 请求拦截
instance.interceptors.request.use((config: AxiosRequestConfig) => {
    // 每次发送请求之前判断vuex中是否存在token        
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // @ts-ignore 
    const token = store.state.token;
    token && (config.headers.Authorization = token);
    startLoading();
    return config;
}, error => {
    return Promise.reject(error);
})

// 响应拦截
instance.interceptors.response.use((response: AxiosResponse<any>) => {
    endLoading();
    return response.status === 200 ? response) : Promise.reject(response);
},
    // 服务器状态码不是2开头的的情况
    // 这里可以跟你们的后台开发人员协商好统一的错误状态码    
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    // 下面列举几个常见的操作，其他需求可自行扩展
    error => {
        // 错误提醒
        endLoading();
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围 
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            store.commit('changeNetwork', false);
        }
    })


export default instance;