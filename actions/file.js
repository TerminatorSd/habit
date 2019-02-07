/**
 * @author shaoDong
 * @email scut_sd@163.com
 * @create date 2019-02-07 16:55:51
 * @modify date 2019-02-07 16:55:51
 * @desc [description]
 */
const fs = require('fs');
const path = require('path');

module.exports = [
	{
		desc: 'upload file',
		method: 'post',
		routerPath: '/upload/file',

		async handler (ctx, next) {

      try {
				// 上传单个文件
				const file = ctx.request.files.file; // 获取上传文件
				// 创建可读流
				const reader = fs.createReadStream(file.path);
				// img name
				let imgName = file.name.split('.')[0];
				let imgSuffix = file.name.split('.')[1];
				let fullName = `${imgName}_${Date.parse(new Date())}.${imgSuffix}`
				let filePath = path.join(__dirname, '../upload/') + fullName;
				// 创建可写流
				const upStream = fs.createWriteStream(filePath);
				// 可读流通过管道写入可写流
				reader.pipe(upStream);
				return ctx.body = `/upload/${fullName}`;
			} catch (err) {
			} finally {
			}
		}
	},
]