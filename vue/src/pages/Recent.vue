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
			class="bg-main"
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
	created () {
		this.getRecentList();
    this.$store.dispatch('example/initMessage')
  },
  methods: {
		...mapActions('example', ['getNewMessage']),
		getRecentList() {
			this.axios.get("/api/recent/list")
				.then(res => {
					// console.log(res);
				})
				.catch(err => {

				})
		},
		showCreateRecent() {
			this.$router.push({path: "/create/recent"});
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
  
}
</script>

<style scoped lang="less">

</style>
