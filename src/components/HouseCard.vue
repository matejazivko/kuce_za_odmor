<template>
  <div class="card h-100">
  
  <div class="card-body">
    <img :src="info.url" class="card-img-top" alt="slika">
    <p class="card-name">{{ info.houseName }}</p>
   <p class="card-text">{{ info.title }}</p>
   <div class="btn-container">
    <router-link :to= "{name: 'komentar', query:{houseName: info.houseName, houseId: info.houseId}}" style="background-color:#71CFF2; color: black" href="#" class="btnKomentar">Komentar{{ info.komentar }}</router-link><br>
   <button @click ="goToKontakt(info)" style="background-color:#71CFF2; color: black" class="btn btn-primary">Kontakt{{ info.kontakt }}</button>
    
  </div>
</div>
</div>  
</template>

<script>
import { info } from 'sass';

export default {
  name: 'HouseCard',
  props: {
    info:{
      type: Object,
      required: true,
    },
  },
  
  methods:{
    goToKontakt(house){
      if(!this.$store.getters.isAuthenticated){
        this.$router.push({
          name:'login'
        });
           
    }else{ 
      this.$router.push({
        name: 'kontakt',
        query: {
          houseName: house.houseName,
          houseId: house.houseId
        }
      });
    }
  }
}
};

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
  max-width: 800px;
  max-height: 700px;
  margin-bottom: 20px;
  
  
}
.card-img-top {
  width: 400px;
  height: 400px; 
  
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
