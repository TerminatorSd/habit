/**
 * @author shaoDong
 * @email scut_sd@163.com
 * @create date 2019-01-31 16:34:50
 * @modify date 2019-01-31 16:34:50
 * @desc recent travel
 */

<template>
	<v-container class="bg-grey">
       
		<div
			v-for="(item, key) in habitList" :key="key" 
			
			class="pb-3 pt-1">
			<v-flex xs12>
				<v-card color="cyan darken-2" class="white--text">
					<v-layout>
						<v-flex xs5>
							<v-img
								src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
								height="125px"
								contain
							></v-img>
						</v-flex>
						<v-flex xs7>
							<v-card-title primary-title>
								<div>
									<div class="headline">{{ item.title }}</div>
									<div>Foster the People</div>
									<!-- <div>(2014)</div> -->
								</div>
							</v-card-title>
						</v-flex>
					</v-layout>
					<v-divider light></v-divider>
					<v-card-actions class="pa-3">
						Function
						<v-spacer></v-spacer>
						<v-btn @click="showEditHabit(item._id)">edit</v-btn>	
						<v-btn @click="deleteHabit(item._id)">delete</v-btn>
						<!-- <v-icon>star_border</v-icon>
						<v-icon>star_border</v-icon>
						<v-icon>star_border</v-icon>
						<v-icon>star_border</v-icon>
						<v-icon>star_border</v-icon> -->
					</v-card-actions>
				</v-card>
			</v-flex>
		</div>
		<v-btn fab dark fixed 
			class="bg-main"
			:style="position"
			ref="add"
			@touchstart.native="startMove($event)" 
      @touchmove.native="moving($event)">
			<v-icon dark @click="showCreateHabit">add</v-icon>
		</v-btn>
	</v-container>
</template>

<script>
import {mapState, mapActions} from 'vuex'
// import {sayHello} from '../utils/example'

export default {
  name: 'Recent',
  data() {
    return {
			habitList: null,
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
		this.getHabitList();
    this.$store.dispatch('example/initMessage')
  },
  methods: {
		...mapActions('example', ['getNewMessage']),
		getHabitList() {
			this.axios.get("/api/habit/list")
				.then(res => {
					if(res.data.code === 0) {
						this.habitList = res.data.data;
					} else {
						this.$toast(res.data.msg, "error");
					}
				})
				.catch(err => {

				})
		},
		showCreateHabit() {
			this.$router.push({path: "/create/habit"});
		},
		showEditHabit(id) {
			const url = "/create/habit?id=" + id;
			this.$router.push({ path: url })
		},
		deleteHabit(id){
			this.axios.post("/api/habit/delete", {
				id: id
			})
				.then(res => {
					if(res.data.code === 0) {
						this.getHabitList();
					} else {
						this.$toast(res.data.msg, "error");
					}
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
  
}
</script>

<style scoped lang="less">
	.left-avater {
		width: 30px;
		height: 30px;
		float: left;
		border: 1px solid grey;
		img {
			max-width: 100%;	
		}
	}
	.right-content {
		text-align: left;
		margin-left: 40px;
		img {
			max-width: 100%;
			height: auto;
			border: 1px solid grey;
		}
	}
</style>
