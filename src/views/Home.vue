<template>
  <div class="row">
    <div class="col-12">
      <button @click="toggleForm" class="btn btn-primary mb-3">Dodaj kuću za odmor</button>
      <div class="card-container">
        <form v-if="showForm && isAuthenticated" @submit.prevent="postNewImage" class="form-inline mb-5">
          <img v-if="imageSrc" :src="imageSrc" alt="Slika kuće" class="card-image"/>
          <Cropper v-model="myCroppa" :src="imageSrc" :width="400" :height="400"></Cropper>
          <input type="file" @change="onFileChange"/>
          <input v-model="newHouseName" placeholder="Unesite naziv kuće"/>
          <input v-model="newImageTitle" placeholder="Dodaj opis"/>
          <button type="submit" class="btn btn-primary ml-2">Dodaj post</button>
        </form>

        <div v-if="filteredCards.length > 0">
          <house-card v-for="card in filteredCards" :key="card.houseId" :info="card" class="card-item" @click="goToKomentar(card)"/>
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
 import {db, onAuthStateChanged} from '@/firebase';
 import {addDoc, collection, getDocs, getFirestore} from 'firebase/firestore';
 import {getAuth} from 'firebase/auth';
 
 
 
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
      selectedHouseId: this.$route.query.houseId,
       filteredCards: [],
       store,
       newImage: '',
       newImageTitle:'',
       myCroppa: null,
       imageSrc:"",
       showForm: false,
       houseId: null,
       
     }; 
   },
   computed:{
    isAuthenticated(){
      return this.$store.getters.isAuthenticated;
    }
   },
  mounted(){
    const auth = getAuth();
    onAuthStateChanged(auth, (user)=>{
      if (user){
        this.$store.commit('setUser', user);
        this.$store.dispatch('setAuthenticated', true);
      }else{
        this.$store.commit('setUser', null);
        this.$store.dispatch ('setAuthenticated', false);
      }
    });

   this.getPosts();
  },
   methods:{
     toggleForm(){
      if (this.isAuthenticated){
       this.showForm = !this.showForm;
      }else{
        alert ("Molimo vas prijavite se kako biste dodali kuću.");
      }
     },
     async getPosts(){
       try{
       const querySnapshot = await getDocs (collection(db,"posts"));
         this.filteredCards=[];
         querySnapshot.forEach((doc)=>{
           const data = doc.data();
           console.log("Fetched data from Firestore:", data);
         if (data.imageUrl && data.title && data.houseName) {
          if (data.houseId === this.selectedHouseId){
           this.filteredCards.push({
             url: data.imageUrl,
             title: data.title,
             houseName: data.houseName,
             houseId: data.houseId || doc.id,
             komentar: data.komentar,
             kontakt: data.kontakt,
             
           });
         }
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
         const reader = new FileReader();
         reader.onload = (e)=>{
           this.imageSrc = e.target.result;
         };
         reader.readAsDataURL(file);
       } else {
         alert ("Odaberite sliku!");
       }
       
     },
     async postNewImage(){
      if (this.isAuthenticated){
            if(this.imageSrc && this.newHouseName && this.newImageTitle){
         const newCard={
           title: this.newImageTitle,
           imageUrl: this.imageSrc,
           houseName: this.newHouseName,
          
         };
         
         addDoc(collection(db,"posts"), newCard).then(() => {
         this.filteredCards.push({
         title: newCard.title,
         url: newCard.imageUrl,
         houseName: newCard.houseName,
         houseId: newCard.houseId,
         komentar:"",
         kontakt: "",
         });
         this.newImageTitle="";
         this.newHouseName = "";
         this.showForm = false;
         this.imageSrc=""; 
       }).catch ((error) =>{
         console.error("Greška u dodavanju slike", error);
       });
     } else {
         alert ("Unesite sliku i opis kuće!");
       }
     }
   },
   goToKomentar(house){
    console.log("House data:", house);
    this.selectedHouseName = house.houseName;
    this.selectedHouseId = house.houseId;
    if (this.selectedHouseId){
    this.$router.push({
      name:'komentar',
      query:{
        houseName: house.houseName,
        houseId: house.houseId
      }
    });
   } else{
    console.error("HouseId nije definiran");
   }
  }
}
};
   
 
 
 </script>
 <style scoped>
 .card-container {
   display: flex;
   flex-wrap: wrap; 
   justify-content: space-between; 
   width: 100%;
   height: 100%;
   gap: 16px;
   
 }
 
 .card-item {
  flex: 1 0 30%;
  max-width: 450px;
  margin-bottom: 16px;
 }

 .card-image{
  width: 400px;
  height: 400px;
 }
 
 @media (max-width: 768px){
   .card-item{
     flex: 0 0 100%;
   }
 }
 </style>