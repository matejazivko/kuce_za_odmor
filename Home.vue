<template>
 <div class="row">
<div class="col-2">
 
</div>
<div class="col-8">
  <house-card v-for="card in filteredCards" :key="card.url" :info="card"/>
  
</div>
<div class="col-2">

</div>
</div>
  </template>

<script>
// @ is an alias to /src
import HouseCard from '@/components/HouseCard.vue';
import store from '@/store.js'
let cards = []
cards = [
  {url: "https://picsum.photos/200/300", title: "opis 1", komentar: "komentari", kontakt: "kontakt"},
  {url: "https://picsum.photos/200/300", title: "opis 2", komentar: "komentari", kontakt: "kontakt"},
  {url: "https://picsum.photos/200/300", title: "opis 3", komentar: "komentari", kontakt: "kontakt"}
]
export default {
  name: 'Home',
  data: function() {
    return{
      cards,
      store,
    }; 
  },
  computed:{
    filteredCards(){
      let termin = this.store.searchTerm;
      return this.cards.filter(card => card.title.includes(termin));
      
    },
  },
  components: {
    HouseCard,
  },
};
</script>
