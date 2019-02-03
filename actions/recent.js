/**
 * @author shaoDong
 * @email scut_sd@163.com
 * @create date 2019-02-01 22:00:57
 * @modify date 2019-02-01 22:00:57
 * @desc actions for recent operations
 */

const RecentModel = require('../models/recent');

module.exports = [
  {
    desc: 'getRecentList',
    method: 'get',
    routerPath: '/api/recent/list',
  
    async handler (ctx, next) {
      // 获取 querystring
      // /api/example?a=1&b=2 => {a:1, b:2}
      // let query = ctx.query
  
      // 获取路由动态参数
      // /api/example 配上 routerPath = '/api/:name' 的话 => {name: example}
      // let params = ctx.params
      
      const result = {
        code: 0,
        msg: 'ok',
        data: 'haha'
      }
      try {
        result.data = await RecentModel.find();
      } catch(err) {
        console.log('获取recent list失败');
        result.code = -1;
        result.msg = 'get list error';
      } finally {
        ctx.body = result;
      }
    }
  },
  {
    desc: 'createRecent',
    method: 'post',
    routerPath: '/api/create/recent',

    async handler (ctx, next) {
      
      const thisData = ctx.request.body;
      const result = {
        code: 0,
        msg: 'ok',
        data: 'fine'
      }

      // 获取当前时间
      thisData.updated_at = Date.parse(new Date()) / 1000;
      const insertData = new RecentModel(thisData);
      try {
        insertData.save(function(error, doc) {
          if(error){
            console.log("error :" + error);
          }else{
            // console.log(doc);
          }
        });
      } catch(err) {
        console.log('更新manage detail失败');
        result.code = -1;
        result.msg = 'update detail error';
      } finally {
        ctx.body = result;
      }
    }
  }
]
  