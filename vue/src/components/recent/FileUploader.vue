<template>
  <div class="report-setting-box mt-2">
    <uploader
      ref="uploader"
      :options="upload_options"
      :auto-start="false"
      class="uploader-example"
      @file-added="fileAdded"
      @file-error="fileError"
      @file-success="fileSuccess">
      <v-layout>
        <v-flex
          xs4
          class="align-self-center">
          <v-btn
            height="36"
            style="width:90%"
            class="mx-0 mt-0 mb-0">
            <uploader-btn>选择文件</uploader-btn>
          </v-btn>
        </v-flex>
        <v-flex
          xs3
          class="align-self-center">
          <v-btn
            :disabled="emptyFileList"
            height="36"
            style="min-width:70px"
            class="mx-0 mt-0 mb-0"
            @click="uploadFiles">
            上传
          </v-btn>
        </v-flex>
        <v-flex 
          xs5
          class="align-self-center">
          <v-btn
            v-if="uploadErrorFiles.length!==0"
            :disabled="uploadErrorFiles.length === 0"
            height="36"
            style="min-width:70px;"
            class="mx-0 mt-0 mb-0"
            @click="removeErrorFiles">
            移除失败文件
          </v-btn>
        </v-flex>
      </v-layout>
      <uploader-unsupport/>
      <uploader-list
        style="position: relative; top:10px;"/>
    </uploader>
    <v-layout
      v-if="showData"
      class="pt-3 pb-2" 
      style="border-top:solid 1px #eee; position: relative; top:10px;">
      <v-flex 
        xs6
        class="align-self-center grey--text">
        成功 <span>{{ uploadedFiles.length }}</span> 个, 失败 <span>{{ uploadErrorFiles.length }}</span> 个
      </v-flex>

    </v-layout>
  </div>

</template>

<script>

export default {
	components: {
	},
	props: {
		emptyFileList: {
			type: Boolean,
			default: true
		},
		fileReady: {
			type: Boolean,
			default: false
		},
		uploadedFiles: {
			type: Array,
			default: () => [],
		},
		uploadQuery: {
			type: Object,
			default: () => {},
		}
	},
	data () {
		return {
			upload_options: {
				// https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
				target: "api/file/upload",
				testChunks: false,
				chunkSize: 1*1024*1024*5, //每次文件分块大小不超过2M
				query: this.uploadQuery // works_type工作的类型，1任务，2通知，3附件;  type,0任务附件，1任务上报附件
			},
			uploadErrorFiles: [],
			showData: false,
		};
	},

	mounted: function () {
	},
	methods: {
		// 批量上传文件
		uploadFiles(){
			this.showData = true;
			const uList = this.$refs.uploader.fileList;
			for(let i in uList){
				if(!uList[i].isComplete()){
					uList[i].resume();
				}
			}
		},
		// 文件添加进等待上传队列成功的回调
		fileAdded(file, event) {
			this.$emit("update:emptyFileList",false);
			this.$emit("update:fileReady",false);

		},
		// 单个文件上传成功的回调
		fileSuccess(rootFile, file, message) {
			// 更新已上传文件的 id 数组
			const uploadedFiles = this.uploadedFiles;
			uploadedFiles.push(message);
			this.$emit("update:uploadedFiles",uploadedFiles);

			// 判断附件是否全部上传
			const uList = this.$refs.uploader.fileList;
			if(this.uploadedFiles.length === uList.length){
				this.$emit("update:fileReady",true);
			}
		},
		// 单个文件上传失败的回调 todo 上传失败后的处理方案，后面在完善
		fileError(rootFile, file, message) {
			this.uploadErrorFiles.push(file);
		},
		// 清楚上传队列中上传失败的文件
		removeErrorFiles() {
			const uploader = this.$refs.uploader.uploader;
			const errorFiles = this.uploadErrorFiles;
			for (let i in errorFiles) {
				uploader.removeFile(errorFiles[i]);
			}
			this.uploadErrorFiles = [];
			if(this.uploadedFiles.length !== 0){
				this.$emit("update:fileReady",true);
			}
		},
	}
};
</script>

<style scoped>
  .uploader-btn {
    border:none;
    color:#000;
  }
</style>