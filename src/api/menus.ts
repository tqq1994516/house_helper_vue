/**
 * menus模块接口列表
 */

 import base from './base'; // 导入接口域名列表
 import instance from '../untils/http'; // 导入http中创建的axios实例
 
 const menus = {    
     // 一级菜单列表    
     menus (config:any) {        
         return instance.get(`${base.bd}/api/menus/`, config);    
     },
 }
 
 export default menus;