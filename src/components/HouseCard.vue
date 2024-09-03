<template>
  <div class="card h-100">
  <img :src="info.url" class="card-img-top" alt="slika">
  <div class="card-body">
   <p class="card-text">{{ info.title }}</p>
    <a href="#" class="btn btn-primary">{{ info.komentar }}</a><br><br>
    <a href="#" class="btn btn-primary">{{ info.kontakt }}</a>
  </div>
</div>
  
</template>

<script>
export default {
  props: ["info"],
  name: 'HouseCard',
  
}
</script>

<style scoped>
.card {
  max-width: 250px; 
  flex: 1 0 auto; 
}
.card-item{
  margin: 0 16px;
}
.card-img-top {
  width: 100%;
  height: auto; 
}
.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
