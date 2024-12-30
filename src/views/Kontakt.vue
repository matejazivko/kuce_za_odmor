<template>
    <div class="about">
    <h1>Kontakt obrazac</h1>
    <div class="container">
    <div class="row">
    <div class="col-sm"></div>
    <div class="col-sm">
    <form @submit.prevent="Kontakt">
       
      <div class="form-group">
    <label for="exampleInputNameAndSurname">Name and surname</label>
    <input type="text" v-model= "nameAndSurname" class="form-control"
    id="NameAndSurname" placeholder="Enter your name and surname" />
    <small id="emailHelp" class="form-text text-muted" >We'll
    never share your email with anyone else.</small>
    </div>
    <div class="form-group">
    <label for="exampleInputEmail1">Email</label>
    <input type="email" v-model= "email" class="form-control"
    id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
    <small id="emailHelp" class="form-text text-muted" >We'll
    never share your email with anyone else.</small>
    </div>
    <div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label">Vaša poruka</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>
    <button style="background-color:#71CFF2; color: black" type="submit" class="btn btn-primary">Pošalji</button>
    <button style="background-color:#71CFF2; color: black" type="submit" class="btn btn-primary">Očisti</button>
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
    import { auth } from '@/firebase'; 
import { collection, addDoc } from 'firebase/firestore';
    export default {
      name: "kontakt",
data() {
return {
nameAndSurname: "",
email: "",
message: "",
successMessage: "",
errorMessage: ""
};
},
methods: {
    async submitContactForm(){
        if (!this.nameAndSurname || !this.email || !this.message){
            this.errorMessage = "Sva polja moraju biti popunjena!";
            return;
        }
       
    try {
        await addDoc (collection(db, "kontakt"),{
            nameAndSurname: this.nameAndSurname,
            email: this.email,
            message: this.message
        }),
        this.successMessage = "Vaša poruka je uspješno poslana!";
        this.clearForm();
    } catch (error){
      this.errorMessage = 'Greška prilikom slanja poruke: ${errorMessage}';
    }
  },
  clearForm(){
    this.nameAndSurname = "";
    this.email = "";
    this.message = "";
  }
}
};
    
    </script>
