<template>
    <div class="about">
        <h1>Komentari</h1>
        <div class="container">
            <div class="row">
                <div class="col-sm"></div>
                <div class="col-sm">
                    <div v-if="selectedHouseName">
                        <p>Odabrana kuća: {{ selectedHouseName }}</p>
                    </div>
                    <form @submit.prevent="handleSubmit">
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" class="form-label">Vaša poruka</label>
                            <textarea v-model="commentText" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <button style="background-color:#71CFF2; color: black" type="button" class="btn btn-primary" @click="addComment">Dodaj komentar</button>
                        <button style="background-color:#71CFF2; color: black" type="button" class="btn btn-primary" @click="editComment" >Izmjeni komentar</button>
                        <button style="background-color:#71CFF2; color: black" type="button" class="btn btn-primary" @click="deleteComment">Obriši komentar</button><br><br>
                     </form>
                    <p v-if="successMessage" class="text-success">{{ successMessage }}</p>
                    <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
                    <div v-for = "(house, index) in houses" :key="index"> 
                        <div class="house-post" @click="selectedHouseForComment(house)"> 
                            <h2>{{ house.name }}></h2>
                        </div>
                    </div>
                    <div v-for="(comment, index) in comments" :key = "index" class="comment-box">
                            <p class="comment-text">{{ comment.text }}</p>
                            <p>{{ comment.houseName }}</p>
                            <button class="btn-izmjeni" @click = "selectionCommentToEdit(comment)">Izmjeni</button>
                        </div>
                    </div>
                </div>
                <div class="col-sm"></div>
            </div>
         </div>
    
</template>
    
<script>
import { auth} from '@/firebase'
import {db} from '@/firebase';
import { getDocs, addDoc, collection, updateDoc, doc } from 'firebase/firestore';

export default{
    name: "Komentari",
    data(){
        return{
            commentText: "",
            comments: [],
            houses: [],
            selectedComment: null,
            selectedHouseName: "",
            selectedHouseId: null,
            successMessage: "",
            errorMessage: "",
        };
    },
    mounted(){
        this.fetchComments();
        this.fetchHouses();
    },

    methods: {
        async fetchHouses(){
            try{
                const querySnapshot = await getDocs(collection(db,"houses"));
                this.houses = querySnapshot.docs.map(doc =>({
                    id: doc.id,
                    name: doc.data().name,
                }));
            } catch(error){
                this.errorMessage = "Pogreška prilikom učitavanja kuće!";
            }
        },
        async fetchComments(){
            try {
                const querySnapshot = await getDocs(collection(db, "comments"));
                this.comments = querySnapshot.docs.map(doc => {
                    return{
                        id: doc.id, text: doc.data().text, houseName: doc.data().houseName, houseId: doc.data().houseId,
                    };
                });
            } catch (error){
                console.error(error);
                this.errorMessage = "Pogreška prilikom učitavanja komentara!";
            }
        },
        selectedHouseForComment(house){
            this.selectedHouseName = house.name;
            this.selectedHouseId = house.id;
            this.commentText = "";
            this.selectedComment = null;
        },
        async addComment(){
            if (!this.commentText || !this.selectedHouseName || !this.selectedHouseId){
                this.errorMessage = "Komentar i kuća moraju biti ispravno odabrani!";
                return;
            }
            try {
                await addDoc(collection(db, "comments"), {
                text: this.commentText,
                houseName: this.selectedHouseName,
                houseId: this.selectedHouseId,
            });
            
            this.successMessage = "Komentar je uspješno dodan!";
            this.commentText = "";
            this.selectedHouseName = "",
            this.selectedHouseId = null;
            this.fetchComments();
        } catch (error){
            this.errorMessage = "Pogreška prilikom dodavanja komentara!";
        }
    },
    selectedCommentToEdit(comment){
        this.selectedComment = comment;
        this.commentText = comment.text;
        this.selectedHouseName = comment.houseName;
        this.selectedHouseId = comment.houseId;
    },
        async editComment(){
            if (!this.commentText){
                this.errorMessage = "Komentar ne može biti prazan, dodajte komentar!";
                return;
            }
            if (this.selectedComment){
             try {
                await updateDoc (doc(db, "comments", this.selectedComment.id), {
                    text: this.commentText
                });
               
                this.successMessage = "Komentar je uspješno izmijenjen!";
                this.commentText =  "";
                this.selectedComment = null;
                this.selectedHouseName = null;
                this.selectedHouseId = null;
                this.fetchComments();
            } catch (error){
                this.errorMessage = "Greška prilikom izmjene komentara!";
            }
        }
        },
        selectionCommentToEdit(comment){
            this.selectedComment = comment;
            this.commentText = comment.text;
            this.selectedHouseName = comment.houseName;
            this.selectedHouseId = comment.houseId;
        },
    
    async deleteComment(){
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
<style scoped>
.container{
    display: grid;
    place-items: center;
    position: absolute;
    top:30%;
    left: 0%;
    transform: translate(-8%, 20%);
}
.row{
    display: flex;
    justify-content: center;
    width: 100%;
}
.comment-box{
    border: 1px solid black;
    border-radius: 6px;
    padding: 20px;
    margin-bottom: 5px;
    display: flex;
    position: relative;
    flex-direction: column;    
    justify-content: flex-start;  
    align-items: flex-start;
    width: 100%;
}

.comment-text{
    font-size: 16px;
    width: 100%;
    white-space: pre-wrap;
    margin-left: 0px;
    position: relative;
    left: 0px;
    text-align: left;


}
.btn-izmjeni{
    background-color: #71CFF2;;
    border-radius: 5px;
    border: none;
    position:absolute;
    right: 10px;
    bottom: 10px;
    padding: 8px, 16px;
    cursor: pointer;
}

.house-post{
    border: 1px solid black;
    padding: 10px;
    margin: 10px 0;
}
</style>