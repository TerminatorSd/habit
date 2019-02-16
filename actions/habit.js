/**
 * @author shaoDong
 * @email scut_sd@163.com
 * @create date 2019-02-01 22:00:57
 * @modify date 2019-02-01 22:00:57
 * @desc actions for recent operations
 */

const HabitModel = require('../models/habit');

module.exports = [
	{
    desc: 'getHabitInfo',
    method: 'get',
    routerPath: '/api/habit/info',
  
    async handler (ctx, next) {
			const id = ctx.query.id;	
			console.log(id);
      const result = {
        code: 0,
        msg: 'ok',
        data: 'haha'
      }
      try {
        result.data = await HabitModel.find({_id: id});
      } catch(err) {
        console.log('habit info 失败');
        result.code = -1;
        result.msg = 'get habit info error';
      } finally {
        ctx.body = result;
      }
    }
  },
	{
    desc: 'getHabitList',
    method: 'get',
    routerPath: '/api/habit/list',
  
    async handler (ctx, next) {
      const result = {
        code: 0,
        msg: 'ok',
        data: 'haha'
      }
      try {
        result.data = await HabitModel.find();
      } catch(err) {
        console.log('habit list失败');
        result.code = -1;
        result.msg = 'get habit list error';
      } finally {
        ctx.body = result;
      }
    }
  },
  {
    desc: 'createHabit',
    method: 'post',
    routerPath: '/api/create/habit',
  
    async handler (ctx, next) {
      const thisData = ctx.request.body;
      const result = {
        code: 0,
        msg: 'ok',
        data: 'fine'
      }

      const insertData = new HabitModel(thisData);
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
	},
	{
    desc: 'updateHabit',
    method: 'post',
    routerPath: '/api/update/habit',
  
    async handler (ctx, next) {
			const thisData = ctx.request.body;
			console.log(thisData)
      const result = {
        code: 0,
        msg: 'ok',
        data: 'fine'
      }

      try {
				HabitModel.update({_id: thisData.id}, thisData, function(error, doc) {
					if(error){
            console.log("error :" + error);
          }else{
            // console.log(doc);
          }
				})
      } catch(err) {
        console.log('更新manage detail失败');
        result.code = -1;
        result.msg = 'update detail error';
      } finally {
        ctx.body = result;
      }
    }
	},
	{
    desc: 'deleteHabit',
    method: 'post',
    routerPath: '/api/habit/delete',
  
    async handler (ctx, next) {
			const thisData = ctx.request.body;
			console.log(thisData)
      const result = {
        code: 0,
        msg: 'ok',
        data: 'fine'
      }

      try {
				HabitModel.remove({_id: thisData.id}, function(error, doc) {
					if(error){
            console.log("error :" + error);
          }else{
            // console.log(doc);
          }
				})
      } catch(err) {
        console.log('更新manage detail失败');
        result.code = -1;
        result.msg = 'update detail error';
      } finally {
        ctx.body = result;
      }
    }
  },
]
  