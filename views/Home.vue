<template>
 <div class="row">
<div class="col-12">
  <div class="card-container">
    <button @click="toggleForm" class="btn btn-primary mb-3">Dodaj kuću za odmor</button>
    <form v-if ="showForm" @submit.prevent="postNewImage" class="form-inline mb-5">
    <croppa v-model="myCroppa" :width="400" :height="400"></croppa>
<input type="file" @change="onFileChange"/>
<input v-model="newImageTitle" placeholder="Učitaj sliku"/>
<button type="submit" class="btn btn-primary ml-2">Post image</button>
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
import {db, storage} from '@/firebase';
import {collection, getDocs} from 'firebase/firestore';
import {Croppa} from 'vue-croppa';

//cards = [
  //{url: "https://picsum.photos/200/300", title: "Kuća za odmor Una okružena zelenilom pružit će vam idealan odmor. Kuća ima bazen, terasu, tri spavaće sobe, kuhinju i kupaonicu. Kapacitet 6 osoba.", komentar: "Komentari", kontakt: "Kontakt"},
  //{url: "https://picsum.photos/200/300", title: "Kuća za odmor Mia s pogledom na more. U kući se nalaze dvije spavaće sobe i jedna kupaonica, što kuću čini idealnom za odmor 4 osobe.", komentar: "Komentari", kontakt: "Kontakt"},
  //{url: "https://picsum.photos/200/300", title: "Kuća za odmor Paula u prirodi. Idealna za goste koji traže odmak od gradske vreve i gužve. Ima jednu spavaću sobu, kuhinju, kupaonicu i bazen. Kapacitet max. 3 osobe. Pet friendly.", komentar: "Komentari", kontakt: "Kontakt"}
//]
export default {
  name: 'Home',
  components: {HouseCard},
  data: function() {
    return{
      cards: [],
      store,
      newImageUrl: "",
      newImageTitle:"",
      imageReference: "",
      myCroppa: {},
      showCroppa: true,
      showForm: false,
    }; 
  },
 mounted(){
  this.getPosts();
 },
  methods:{
    
    toggleForm(){
      this.showForm = !this.showForm;
    },
    async getPosts(){
      try{
      const querySnapshot = await getDocs (collection(db,"posts"));
        this.cards=[];
        querySnapshot.forEach((doc)=>{
          const data = doc.data();
          this.cards.push({
            url: data.url,
            title: data.title,
            komentar: data.komentar,
            kontakt: data.kontakt,
            
          });
      });
      }
    catch(e){
        console.error(e);
    }
  
 },
  
    onFileChange(event){
      const file = event.target.files[0];
      if(file){
        const reader = new FileReader();
        reader.onload = (e) => {
          this.myCroppa.bind({url: e.target.result});
        };
        reader.readAsDataURL(file);
      }
    },
    postNewImage(){
      if(this.myCroppa){
        this.myCroppa.generateBlob(async (blob)=>{
          if(blob){
            const storageRef = storage.ref().child(`images/${Date.now()}_croppedImage.jpg`);
            await storageRef.put(blob);
              const url = await storageRef.getDownloadURL();
              await db.collection('posts').add({
                url:url,
                title: this.newImageTitle,
              });
              
        console.log('Spremljeno');
        this.newImageTitle = "";
        this.myCroppa.clear();
        this.getPosts();
      }
  },
  'image/jpeg', 0.8);
  }
}
  },


  computed:{
    filteredCards(){
      let termin = this.store.searchTerm;
      return this.cards.filter(card => card.title.includes(store.searchTerm));
      
    }
  }
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