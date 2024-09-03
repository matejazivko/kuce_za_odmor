<template>
  <div class="about">
  <h1>This is an login page</h1>
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
  <button type="submit" class="btn btn-primary">Submit</button>
  </form>
  <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
  <div class="col-sm"></div>
  </div>
  </div>
  </div>
 
  </template>

<script>

import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from "@/firebase";


export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async login() {
      try {
        
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        console.log('Uspješna prijava', userCredential.user);
        this.errorMessage = '';
      
      } catch (error) {
        this.errorMessage = 'Neuspješna prijava: ' + error.message;
      }
    },
  },
};
</script>

  