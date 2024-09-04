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
  
  </div>
  <div class="col-sm"></div>
  </div>
  </div>
  </div>
 
  </template>

<script>

import {auth, signInWithEmailAndPassword} from '@/firebase';

export default {
  data() {
    return {
      email: '',
      password: ''
      
      
    };
  },
  methods: {
    login() {
       signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          console.log('Uspješna prijava', userCredential);
          this.$router.replace({name:'home'});
        })
        .catch(function(error){
          console.error('Greška prilikom prijave', error.message);
        });
      }
    }
  };
</script>