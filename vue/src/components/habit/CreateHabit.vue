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
				label="Habit 标题"
				required
			/> 

			 <!-- <v-textarea
       			outline
				v-model="content"
       			label="今天好心情"
				auto-grow
				required
       			value=""
        	></v-textarea> -->

			<!-- <uploader @finishUpload="finishUpload"></uploader> -->

			<v-layout
			class="pt-4"
			justify-space-between>
				<v-flex xs12>
					<v-btn
						dark
						v-if="!is_edit"
						color="blue"
						class="submit-btn mx-0"
						@click="addHabit"
					>
						确认创建
					</v-btn>
					<v-btn
						dark
						v-if="is_edit"
						color="blue"
						class="submit-btn mx-0"
						@click="updateHabit"
					>
						确认修改
					</v-btn>
				</v-flex>
			</v-layout>
		</v-form>
	</v-container>
</template>

<script>
// import FileUploader from './FileUploader';
// import Uploader from '../common/Uploader';

export default {
	name: '',
	components: {
		// FileUploader,
		// Uploader
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
			// 创建 or 修改
			id: null,
			is_edit: false
		}
    },
    mounted() {
			// 判断当前页面是以新建还是修改的形式跳转进来的
			this.id = this.$route.query.id;
			if(this.id) {
				this.is_edit = true;
				this.getHabitTitle(this.id);
			}
    },
	methods: {
		getHabitTitle(id) {
			this.axios.get("/api/habit/info?id=" + id)
				.then(res => {
					if(res.data.code === 0) {
						// this.$toast(res.data.msg, "success");
						this.title = res.data.data[0].title;
					} else {
						this.$toast(res.data.msg, "error");
					}
				})
				.catch(err => {

				})
		},
		addHabit() {
			let postData = {
				title: this.title,
				// content: this.content,
				// img: this.uploadImg,
			}

			this.axios.post("/api/create/habit", postData)
				.then(res => {
					if(res.data.code === 0) {
						this.$toast(res.data.msg, "success");
						this.$router.push({path: "/habit"});
					} else {
						this.$toast(res.data.msg, "error");
					}
				})
				.catch(err => {

				})
		},
		updateHabit() {
			let postData = {
				id: this.id,
				title: this.title,
				// content: this.content,
				// img: this.uploadImg,
			}

			this.axios.post("/api/update/habit", postData)
				.then(res => {
					if(res.data.code === 0) {
						this.$toast(res.data.msg, "success");
						this.$router.push({path: "/habit"});
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
