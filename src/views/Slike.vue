<template>
    <div class="container">
    <h2 align="left">Interijer kuće</h2>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button @click="toggleForm" class="btn btn-primary">Dodaj slike</button>
        </div>
        <form v-if="showForm && isAuthenticated" @submit.prevent="uploadImage" class="form-inline mb-5">
          <img v-if="imageSrc" :src="imageSrc" alt="Slika interijera" class="preview-image"/>
          <input type="file" @change="onFileChange"/>
        <button type="submit" class="btn btn-success mt-3">Dodaj sliku</button>
        </form>
        <div class="row">
            <div v-for="card in filteredCards" :key="card.houseId" class="col-md">
                <div class="card">
                    <img :src="card.url" class="card-img-top" alt="Interijer kuće"/>
                </div>
            </div>
        </div>
   </div>
</template>

<script>
import {getDocs, collection, addDoc} from 'firebase/firestore';
import {db} from '@/firebase';
export default {
   name: 'Slike',
   data() {
     return {
      selectedHouseId: this.$route.query.houseId,
      filteredCards:[],
      imageSrc:"",
      showForm: false,
    };
   },
computed:{
    isAuthenticated(){
        return this.$store.getters.isAuthenticated;
    }
},
mounted(){
    this.getImages();
},
methods:{
    toggleForm(){
        if(this.isAuthenticated){
            this.showForm = !this.showForm;
        } else{
            alert('Prijavite se kako biste mogli dodati slike');
        }
    },
    async getImages(){
        try{
            const querySnapshot = await getDocs(collection(db, 'posts'));
            this.filteredCards=[];
            querySnapshot.forEach((doc)=>{
                const data = doc.data();
                if(data.houseId === this.selectedHouseId){
                    this.filteredCards.push({
                        url: data.imageUrl,
                        houseId: data.houseId,
                        
                    });
                }
            });
        } catch (error){
            console.error('Greška prilikom učitavanja slike', error);
        }
    },
    onFileChange(event){
        const file = event.target.files[0];
        if(file && file.type.startsWith('image/')){
            const reader = new FileReader();
            reader.onload = (error) => {
                this.imageSrc = error.target.result;
            };
            reader.readAsDataURL(file);
        }else{
            alert ('Odaberite ispravnu sliku');
        }
    },
    async uploadImage(){
        if(this.imageSrc){
            try{
                const newCard = {
                    imageUrl: this.imageSrc,
                    houseId: this.selectedHouseId,
                };
                await addDoc(collection(db,'posts'), newCard);
                this.filteredCards.push({
                    url: newCard.imageUrl,
                    houseId: newCard.houseId,
                });
                this.imageSrc="";
                this.showForm = false;
            } catch (error){
                console.error ('Greška prilikom dodavanja slike', error);
            }
        }else {
            alert ('Odaberite sliku');
        }
    }
} 
};
</script> 

<style scoped>
.btn {
    background-color: gainsboro;
    color:black;
    border: none;
}

</style>