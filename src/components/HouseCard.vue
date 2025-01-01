<template>
  <div class="card h-100">
  
  <div class="card-body">
    <img :src="info.url" class="card-img-top" alt="slika">
   <p class="card-text">{{ info.title }}</p>
   <div class="btn-container">
    <router-link to= "/komentar" style="background-color:#71CFF2; color: black" href="#" class="btn btn-primary">Komentar{{ info.komentar }}</router-link><br>
    <router-link to = "/kontakt" style="background-color:#71CFF2; color: black" href="#" class="btn btn-primary">Kontakt{{ info.kontakt }}</router-link>
  </div>
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
.card {
 display: flex;
 flex-wrap: wrap;
 flex-direction: column;
 box-shadow: 0 2px 5px;
 width: 100%;
 
}

.card-item{
  display: flex;
  flex-direction: column;
  flex: 1 0 60%;
  max-width: 600px;
  max-height: 630px;
  margin-bottom: 20px;
  
  
}
.card-img-top {
  width: 100%;
  height: auto; 
  
}
.card-text {
  margin-bottom: 15px;
}
.card-body {
  padding: 15px;
}
.btn-container{
  display:flex;
  flex-direction: column;
  width: auto;
 
 
}




</style>
