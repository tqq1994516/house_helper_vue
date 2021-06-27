/** 
 * api接口的统一出口
 */
// 菜单模块接口
import menus from '@/api/menus';
import login from '@/api/login';
import register from '@/api/register';
import baseInfo from '@/api/baseInfo';
import tag from '@/api/tag';
import administrativeDivision from '@/api/administrativeDivision'
// 其他模块的接口……

// 导出接口
export default {    
    menus,
    login,
    register,
    baseInfo,
    tag,
    administrativeDivision,
    // ……
}