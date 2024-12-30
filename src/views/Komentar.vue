<template>
    <div class="about">
    <h1>Komentari</h1>
    <div class="container">
    <div class="row">
    <div class="col-sm"></div>
    <div class="col-sm">
    <form @submit.prevent="handleSubmit">
       <div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label">Vaša poruka</label>
  <textarea v-model="commentText" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>
    <button style="background-color:#71CFF2; color: black" type="submit" class="btn btn-primary" @click="addComment">Dodaj komentar</button>
    <button style="background-color:#71CFF2; color: black" type="submit" class="btn btn-primary" @click="editComment" >Izmjeni komentar</button>
    <button style="background-color:#71CFF2; color: black" type="submit" class="btn btn-primary" @click="deleteComment">Obriši komentar</button>
    </form>
    <p v-if="successMessage" class="text-success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
    </div>
    <div class="col-sm"></div>
    </div>
    </div>
    </div>
</template>
    
<script>
import { auth} from '@/firebase'

export default{
    name: "Komentari",
    data(){
        return{
            commentText: "",
            successMessage: "",
            errorMessage: "",
        };
    },
    methods: {
        addComment(){
            if (!this.commentText){
                this.errorMessage = "Komentar ne može biti prazan, dodajte komentar!";
                return;
            }
            this.successMessage = "Komentar je uspješno dodan!";
            this.commentText = "";
        },
        editComment(){
            if (!this.commentText){
                this.errorMessage = "Komentar ne može biti prazan, dodajte komentar!";
                return;
            }
            this.successMessage = "Komentar je uspješno izmijenjen!";
            this.commentText =  "";
        },
        deleteComment(){
            if (!this.commentText){
                this.errorMessage = "Nema komentara za brisanje!";
                return;
            }
            this.successMessage = "Komentar je uspješno obrisan!";
            this.commentText = "";
        },
        handleSubmit(){

        }
    },

};
</script>
