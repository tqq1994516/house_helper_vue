/**
 * menus模块接口列表
 */

 import base from './base'; // 导入接口域名列表
 import instance from '../untils/http'; // 导入http中创建的axios实例
 
 const administrativeDivision = {    
     // 一级菜单列表    
     administrativeDivision(config:any) {        
         return instance.get(`${base.bd}/administrativeDivision/`, config);    
     },   

 }
 
 export default administrativeDivision;