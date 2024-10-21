<template>
 <div class="row">
<div class="col-12">
  <div class="card-container">
    <form @submit.prevent="postNewImage" class="form-inline mb-5">
<div class="form-group">
<label for="imageUrl">Image URL</label>
<input
v-model="newImageUrl"
type="text"
class="form-control ml-2"
placeholder="Enter the image URL"
id="imageUrl"
/>
</div>
<div class="form-group">
<label for="imageDescription">Title</label>
<input
v-model="newImageTitle"
type="text"
class="form-control ml-2"
placeholder="Enter the image Title"
id="imageDescription"
/>
</div>
<button type="submit" class="btn btn-primary ml-2">Post
image</button>
</form>
  <house-card v-for="card in filteredCards" :key="card.url" :info="card" class="card-item"/>
  
</div>
</div>
</div>
  </template>

<script>
// @ is an alias to /src
import HouseCard from '@/components/HouseCard.vue';
import store from '@/store.js';
import {db} from '@/firebase';

//cards = [
  //{url: "https://picsum.photos/200/300", title: "Kuća za odmor Una okružena zelenilom pružit će vam idealan odmor. Kuća ima bazen, terasu, tri spavaće sobe, kuhinju i kupaonicu. Kapacitet 6 osoba.", komentar: "Komentari", kontakt: "Kontakt"},
  //{url: "https://picsum.photos/200/300", title: "Kuća za odmor Mia s pogledom na more. U kući se nalaze dvije spavaće sobe i jedna kupaonica, što kuću čini idealnom za odmor 4 osobe.", komentar: "Komentari", kontakt: "Kontakt"},
  //{url: "https://picsum.photos/200/300", title: "Kuća za odmor Paula u prirodi. Idealna za goste koji traže odmak od gradske vreve i gužve. Ima jednu spavaću sobu, kuhinju, kupaonicu i bazen. Kapacitet max. 3 osobe. Pet friendly.", komentar: "Komentari", kontakt: "Kontakt"}
//]
export default {
  name: 'Home',
  data: function() {
    return{
      cards: [],
      store,
      newImageUrl: "",
      newImageTitle:"",
    }; 
  },
  mounted() {
this.getPosts();
},
  methods:{
    getPosts(){
      console.log('Firebase dohvat');
      db.collection("posts").get()
      .then((query)=>{
        this.card=[];
        query.forEach((doc)=>{
          const data = doc.data();
          this.cards.push({
            url: data.url,
            title: data.title,
            
          });
      });
      });
    },
    postNewImage(){
      const imageUrl = this.newImageUrl;
      const imageTitle = this.newImageTitle;

      db.collection('posts').add({
        url: imageUrl,
        title: imageTitle,
        email: store.currentUser,
      })
      .then ((doc)=> {
        console.log('Spremljeno'.doc);
        this.newImageTitle = "";
        this.newImageUrl = "";
        this.getPosts();
      })
      .catch((e)=>{
        console.error(e);
      });
    }
  },
  computed:{
    filteredCards(){
      let termin = this.store.searchTerm;
      return this.cards.filter(card => card.title.includes(termin));
      
    },
  },
  components: {
    HouseCard
  },
};
</script>
<style scoped>
.card-container {
  display: flex;
  flex-wrap: nowrap; 
  overflow-x: auto; 
  gap: 16px; 
  
}

.card-item {
  flex: 0 0 auto;
  max-width: 250px; 
}

</style>