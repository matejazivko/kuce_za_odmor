<template>
<div id="app">
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container-fluid">
        <div class="container-fluid navbar-grid">
      <div class="logo-search">
    <div class="navbar-brand">
      <img src="@/assets/Logo kuce za odmor.png" alt="Logo" 
       height="40"
       class="d-inline-block align-text-top">
    
  </div>
    <form class="d-flex" role="search">
      <input v-model="store.searchTerm" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
    </form>
  </div>


  <div class="navbar-links">
      <ul class="  navbar-nav d-flex justify-content-center mb-0 ">
        <li class="nav-item">
          <router-link to="/" class="nav-link btn mx-4" style="background-color:#71CFF2;" > Home</router-link> 
        </li>
        <li v-if = "!store.currentUser"  class="nav-item">
          <router-link to="/login" class="nav-link btn mx-4" style="background-color:#71CFF2;" >Login</router-link>
        </li>
        <li v-if = "!store.currentUser" class="nav-item">
           <router-link to="/signup" class="nav-link btn mx-4" style="background-color:#71CFF2;">Signup</router-link>
        </li>
        <li v-if = "store.currentUser" class="nav-item">
           <a href="#" v-on:click.prevent="logout" class="nav-link btn mx-4" style="background-color:#71CFF2;">Logout</a>
        </li>
      </ul>
    </div>
  </div>  
</div> 
  </nav> 
  <div class="container">
  <router-view/>
</div>
  </div>

</template>

<script> 
import store from "@/store";
import {auth, onAuthStateChanged, signOut} from '@/firebase';
import router from '@/router';


export default {
  name: "App",
  data(){
   return {
      store, 
      currentUser: null,
      searchTerm: ''
    };
  },
  methods:{
    logout() {
      signOut(auth).then(() => {
        console.log('Korisnik odjavljen');
        this.currentUser = null;
        store.currentUser = null;
        this.$router.push({ name: 'home' });
      }).catch((error) => {
        console.error('Greška prilikom odjave: ', error.message);
      });
    }
  },
  created(){
  onAuthStateChanged(auth, (user) => {
  if (user) {
  console.log('*** User', user.email);
  this.currentUser = user;
  store.currentUser = user;
  } else {
  console.log('*** No user');
  this.currentUser = null;
  store.currentUser = null;

if(this.$route.meta && this.$route.meta.requiresAuth){
  this.$router.push({name: 'login'});
}
}
});
}
  
};

 

   
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  background-color: #c7f97c !important;
.navbar-nav{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.navbar-grid{
  display: grid;
  grid-template-rows: auto auto;
  gap: 10px;
}
.logo-search{
  display:flex;
  justify-content: space-between;
  align-items: center;
}
.navbar-nav-container{
  margin-top:10px;
}
 
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
