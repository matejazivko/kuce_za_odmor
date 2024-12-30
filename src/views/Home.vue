<template>
 <div class="row">
<div class="col-12">
  <div class="card-container">
    <button @click="toggleForm" class="btn btn-primary mb-3">Dodaj kuću za odmor</button>
    <form v-if ="showForm" @submit.prevent="postNewImage" class="form-inline mb-5">
    <img v-if="imageSrc" :src="imageUrl" alt="Slika kuće" class="card-image"/>
    <Cropper v-model="myCroppa" :src="imageSrc" :width="400" :height="400"></Cropper>
    <input type="file" @change="onFileChange"/>
    <input v-model="newImageTitle" placeholder="Dodaj opis"/>
    <button type="submit" class="btn btn-primary ml-2">Dodaj post</button>
</form>
<div v-if="filteredCards.length > 0">
  <house-card v-for="card in filteredCards" :key="card.url" :info="card" class="card-item"/>
</div>
  
</div>
</div>
</div>
  </template>

<script>
// @ is an alias to /src
import {Cropper} from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import HouseCard from '@/components/HouseCard.vue';
import store from '@/store.js';
import {db, storage} from '@/firebase';
import {addDoc, collection, getDocs, getFirestore} from 'firebase/firestore';



//cards = [
  //{url: "https://picsum.photos/200/300", title: "Kuća za odmor Una okružena zelenilom pružit će vam idealan odmor. Kuća ima bazen, terasu, tri spavaće sobe, kuhinju i kupaonicu. Kapacitet 6 osoba.", komentar: "Komentari", kontakt: "Kontakt"},
  //{url: "https://picsum.photos/200/300", title: "Kuća za odmor Mia s pogledom na more. U kući se nalaze dvije spavaće sobe i jedna kupaonica, što kuću čini idealnom za odmor 4 osobe.", komentar: "Komentari", kontakt: "Kontakt"},
  //{url: "https://picsum.photos/200/300", title: "Kuća za odmor Paula u prirodi. Idealna za goste koji traže odmak od gradske vreve i gužve. Ima jednu spavaću sobu, kuhinju, kupaonicu i bazen. Kapacitet max. 3 osobe. Pet friendly.", komentar: "Komentari", kontakt: "Kontakt"}
//]
export default {
  name: 'Home',
  components: {HouseCard, Cropper},
  data: function() {
    return{
      filteredCards: [],
      store,
      newImage: '',
      newImageTitle:'',
      myCroppa: null,
      imageSrc:"",
      showForm: false
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
        this.filteredCards=[];
        querySnapshot.forEach((doc)=>{
          const data = doc.data();
        if (data.imageUrl && data.title) {
          this.filteredCards.push({
            url: data.imageUrl,
            title: data.title,
            komentar: data.komentar,
            kontakt: data.kontakt,
            
          });
        }
      });
      }
    catch(e){
        console.error(e);
    }
  
 },
  
    onFileChange(event){
      const file = event.target.files[0];
      if(file && file.type.startsWith('image/')){
        this.imageSrc = URL.createObjectURL(file);
      } else {
        alert ("Odaberite sliku!");
      }
      
    },
    postNewImage(){
      if(this.imageSrc && this.newImageTitle){
        const newCard={
          title: this.newImageTitle,
          imageUrl: this.imageSrc,
        };
        addDoc(collection(db,"posts"), newCard).then(() => {
        this.filteredCards.push({
        title: newCard.title,
        url: newCard.imageUrl,
        komentar:"",
        kontakt: "",
        });
        this.newImageTitle="";
        this.showForm = false;
        this.imageSrc=""; 
      }).catch ((error) =>{
        console.error("Greška u dodavanju slike", error);
      });
    } else {
        alert ("Unesite sliku i opis kuće!");
      }
    },
  },
};
  


</script>
<style scoped>
.card {
  display: flex;
  flex-wrap: wrap; 
  justify-content: flex-start; 
  gap: 16px; 
  width: 100%;
  
}

.card-item {
  flex: 0 1 250px;
  max-width: 250px; 
  margin-bottom: 16px;
}

@media (max-width: 768px){
  .card-item{
    flex: 0 0 100%;
  }
}
</style>