<template>
  <div class="about">
  <h2>This is an login page</h2>
  <div class="container">
  <div class="row">
  <div class="col-sm"></div>
  <div class="col-sm">
  <form @submit.prevent="login">
  <div class="form-group">
  <label for="exampleInputEmail1">Email</label>
  <input type="email" v-model="email" class="form-control"
  id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter
  email"  autocomplete="email"/>
  <small id="emailHelp" class="form-text text-muted" >We'll
  never share your email with anyone else.</small>
  </div>
  <div class="form-group">
  <label for="exampleInputPassword2">Password</label>
  <input type="password" v-model="password" class="form-control"
  id="exampleInputPassword1" placeholder="Password"  autocomplete="current-password"/>
  </div>
  <button style="background-color:#71CFF2; color: black"  type="submit" class="btn btn-primary" >Login</button> <br><br>
  <button style="background-color:#71CFF2; color: black" @click="resetPassword" class="btn btn-primary">Zaboravljena lozinka</button>
  <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
  <p v-if="resetMessage">{{ resetMessage }}</p>
  </form>
  
  </div>
  <div class="col-sm"></div>
  </div>
  </div>
  </div>
 
  </template>

<script>

import {auth, signInWithEmailAndPassword} from '@/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
      resetMessage: ''
      
      
    };
  },
  methods: {
    login() {
       signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          console.log('Uspješna prijava', userCredential);
          this.$router.replace({name:'home'});
        })
        .catch((error)=>{
          if (error.code === 'auth/too-many-requests'){
            this.errorMessage = 'Previše neuspjelih prijava'
          }else{
          console.error('Greška prilikom prijave, pokušajte ponovo', error.message);
          }
        });
      },
      resetPassword(){
        if (!this.email){
          this.errorMessage = 'Molimo unesite email adresu za ponovo postavljanje lozinke';
          return;
        }
        sendPasswordResetEmail (auth, this.email)
        .then(()=>{
          this.resetMessage = 'Poruka za ponovo postavljanje lozinke poslana je na vaš email';
          this.errorMessage = ' ';
        })
        .catch((error)=>{
          this.errorMessage = 'Greška prilikom slanja email-a za ponovo postavljane lozinke' + error.message;
          this.resetMessage = '';
          console.error ('Greška prilikom ponovog postavljanja lozinke', error);
        });
      }
    
    }
  };
</script>