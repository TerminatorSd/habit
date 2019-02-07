/**
 * @author shaoDong
 * @email scut_sd@163.com
 * @create date 2019-02-07 17:15:38
 * @modify date 2019-02-07 17:15:38
 * @desc upload file
 */

<template>
  <div>
    <uploader
      ref="uploader"
      :options="options"
      @file-success="fileSuccess"
      class="uploader-example">
      <uploader-unsupport/>
      <uploader-drop>
        <p>Drop files here to upload.</p>
        <!-- <uploader-btn>select files</uploader-btn> -->
        <uploader-btn :attrs="attrs">select images</uploader-btn>
        <!-- <uploader-btn :directory="true">select folder</uploader-btn> -->
      </uploader-drop>
      <uploader-list/>
    </uploader>
    <!-- <a 
      class="display:block" 
      @click="download()">下载</a> -->
  </div>
</template>

<script>
// import FileSaver from "file-saver";
export default {
	data () {
		return {
			uploadedFiles: [],
			options: {
				// https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
				target: "/upload/file",
				testChunks: false
			},
			attrs: {
				accept: "image/*"
			}
		};
	},
	methods: {
		download() {
			this.axios({
				url:"api/file/download",
				responseType: "blob",
				method: "post",
			}).then((res) => {
				// let blob = new Blob(res.data);
				let url = window.URL.createObjectURL(res.data);

				FileSaver.saveAs(url, "test.xlsx");
				// let a = document.createElement("a");
				// let url = window.URL.createObjectURL(blob);
				// let filename = "haha.jpg";
				// alert(filename);
				// let myFrame= document.createElement("iframe");
				// myFrame.src = url;
				// myFrame.style.display = "none";
				// document.body.appendChild(myFrame);
				// a.href = url;
				// a.download = filename;
				// a.click();
				// window.URL.revokeObjectURL(url);
			});
		},
		// 单个文件上传成功的回调
		fileSuccess(rootFile, file, message) {
			// 更新已上传文件的 id 数组
			this.uploadedFiles.push(message);
			this.$emit("finishUpload", this.uploadedFiles);
		},
        
	}
};
</script>

<style>
  .uploader-example {
    /* width: 880px; */
    padding: 15px;
    /* margin: 40px auto 0; */
    /* font-size: 12px; */
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }
  .uploader-example .uploader-btn {
    margin-right: 4px;
  }
  .uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>