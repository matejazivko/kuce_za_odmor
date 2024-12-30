<template>
  <div class="card h-100">
  <img :src="info.url" class="card-img-top" alt="slika">
  <div class="card-body">
   <p class="card-text">{{ info.title }}</p>
    <router-link to= "/komentar" style="background-color:#71CFF2; color: black" href="#" class="btn btn-primary">Komentar{{ info.komentar }}</router-link><br>
    <router-link to = "/kontakt" style="background-color:#71CFF2; color: black" href="#" class="btn btn-primary">Kontakt{{ info.kontakt }}</router-link>
  </div>
</div>
  
</template>

<script>
export default {
  props: {
    info:{
      type: Object,
      required: true,
    },
  },
  name: 'HouseCard',
  
}
</script>

<style scoped>
.card-container {
 display: flex;
 flex-wrap: wrap;
 gap:16px;
 justify-content: flex-start;
 width: 100%;
 
}

.card-item{
  flex: 0 1 250px;
  max-width: 250px;
  margin-bottom: 16px;
  
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
