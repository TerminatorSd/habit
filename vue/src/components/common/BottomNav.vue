/**
 * @author shaoDong
 * @email scut_sd@163.com
 * @create date 2019-01-31 16:00:25
 * @modify date 2019-01-31 16:00:25
 * @desc bottom nav
 */
<template>
    <v-card height="200px" flat>
    <!-- <div class="headline text-xs-center pa-5">
      Active: {{ bottomNav }}
    </div> -->
    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      fixed
      color="transparent"
    >
      <v-btn
        color="teal"
        flat
        value="recent"
      >
        <span>Recent</span>
        <v-icon>history</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="favorites"
      >
        <span>Favorites</span>
        <v-icon>favorite</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="nearby"
      >
        <span>Nearby</span>
        <v-icon>place</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        bottomNav: 'recent'
      }
    }
  }
</script>