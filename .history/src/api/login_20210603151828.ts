/**
 * menus模块接口列表
 */

 import base from './base'; // 导入接口域名列表
 import instance from '../untils/http'; // 导入http中创建的axios实例
 import qs from 'qs'; // 根据需求是否导入qs模块
 
 const login = {    
     // 一级菜单列表    
     login_form (config:any) {        
         return instance.get(`${base.bd}/login/`, config);    
     },
     login (config:any) {        
        return instance.post(`${base.bd}/login/`, config));    
    },    
    //  // 新闻详情,演示    
    //  articleDetail (id, params) {        
    //      return instance.get(`${base.sq}/topic/${id}`, {            
    //          params: params        
    //      });    
    //  },
    //  // post提交    
    //  login (params) {        
    //      return instance.post(`${base.sq}/accesstoken`, qs.stringify(params));    
    //  }
     // 其他接口…………
 }
 
 export default login;