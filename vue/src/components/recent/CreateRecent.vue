/**
 * @author shaoDong
 * @email scut_sd@163.com
 * @create date 2019-02-01 21:11:43
 * @modify date 2019-02-01 21:11:43
 * @desc create recent page
 */
<template>
	<v-container class="bg-grey">
		<v-form>
			<v-text-field
				v-model="title"
				:rules="title_rules"
				:counter="20"
				background-color="white"
				box
				label="Recent 标题"
				required
			/>

			 <v-textarea
       			outline
				v-model="content"
       			label="今天好心情"
				auto-grow
				required
       			value=""
        	></v-textarea>

			<uploader @finishUpload="finishUpload"></uploader>

			<v-layout
			class="pt-4"
			justify-space-between>
				<v-flex xs12>
					<v-btn
						dark
						color="blue"
						class="submit-btn mx-0"
						@click="addRecent"
					>
						确认创建
					</v-btn>
				</v-flex>
			</v-layout>
		</v-form>
	</v-container>
</template>

<script>
import FileUploader from './FileUploader';
import Uploader from '../common/Uploader';

export default {
	name: '',
	components: {
		FileUploader,
		Uploader
	},
	data () {
		return {
			title: '',
			content: '',
			title_rules: [
				v => !!v || "请填写标题",
				v => (v && v.length <= 20) || " 标题必须不超过二十个字"
			],
			uploadImg: null,
		}
	},
	methods: {
		addRecent() {
			let postData = {
				title: this.title,
				content: this.content,
				img: this.uploadImg,
			}

			this.axios.post("/api/create/recent", postData)
				.then(res => {
					if(res.data.code === 0) {
						this.$toast(res.data.msg, "success");
						this.$router.push({path: "/"});
					} else {
						this.$toast(res.data.msg, "error");
					}
				})
				.catch(err => {

				})
		},
		finishUpload(data) {
			this.uploadImg = data.join(',');
		}
	}
}
</script>

<style scoped lang="less">
</style>
