<template>
  <div class="hello-world">
    This is Hello World Component
    <div>
      <v-btn color="primary">Success</v-btn>
      <v-btn color="error">Error</v-btn>
      <v-btn color="warning">Warning</v-btn>
      <v-btn color="info">Info</v-btn>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'HelloWorld',
}
</script>

<style scoped lang="less">
.hello-world {
  text-align: center;
  color: red;
}
</style>
