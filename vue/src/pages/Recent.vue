/**
 * @author shaoDong
 * @email scut_sd@163.com
 * @create date 2019-01-31 16:34:50
 * @modify date 2019-01-31 16:34:50
 * @desc recent travel
 */

<template>
	<v-container>
		<v-btn fab dark fixed 
			class="bg-color-main-green"
			:style="position"
			ref="add"
			@touchstart.native="startMove($event)" 
      @touchmove.native="moving($event)">
			<v-icon dark @click="showCreateRecent">add</v-icon>
		</v-btn>
	</v-container>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {sayHello} from '../utils/example'

export default {
  name: 'Recent',
  data() {
    return {
			position: {
				top: "66%",
				right: "5%"
			},
    }
  },

  components: {
  },

  computed: mapState({
    message: state => state.example.message
  }),

  methods: {
		...mapActions('example', ['getNewMessage']),
		getRecentList() {
			this.axios.get("/api/recent/list")
				.then(res => {
					console.log(res);
				})
				.catch(err => {

				})
		},
		showCreateRecent() {
			this.$router.push({path: "/create/recent"});
		},
		addRecent() {
			this.axios.post("/api/create/recent", {})
				.then(res => {

				})
				.catch(err => {

				})
		},
		startMove(e) {
			this.initX = e.touches[0].clientX - this.$refs.add.$el.offsetLeft;
			this.initY = e.touches[0].clientY - this.$refs.add.$el.offsetTop;
		},
		moving(e){
			let nowX = e.touches[0].clientX - this.initX;
			let nowY = e.touches[0].clientY - this.initY;
			this.position.left = `${nowX}px`;
			this.position.top = `${nowY}px`;
		}
	},

  created () {
		this.getRecentList();
		this.addRecent();
    this.$store.dispatch('example/initMessage')
  }
}
</script>

<style scoped lang="less">
h2 {
  font-weight: normal;
}
.wrapper {
  .author {
    text-align: center
  }
}
</style>
