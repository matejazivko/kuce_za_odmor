<template>
 <div class="row">
<div class="col-2">
 
</div>
<div class="col-8">
  <house-card v-for="card in cards" :key="card" :info="card"/>
  
</div>
<div class="col-2">

</div>
</div>
  </template>

<script>
// @ is an alias to /src
import HouseCard from '@/components/HouseCard.vue';
let cards = []
cards = [
  {url: "https://picsum.photos/200/300", title: "opis", komentar: "komentari", kontakt: "kontakt"},
  {url: "@/assets/Kuca_za_odmor_Mia.jpg", title: "opis", komentar: "komentari", kontakt: "kontakt"},
  {url: "@/assets/Kuca_za_odmor_Paula.jpg", title: "opis", komentar: "komentari", kontakt: "kontakt"}
]
export default {
  name: 'Home',
  data: function() {
    return{
      cards: cards
    }; 
  },
  components: {
    HouseCard,
  },
};
</script>
