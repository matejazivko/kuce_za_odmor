<template>
    <div class="about">
    <h1>This is an signup page</h1>
    <div class="container">
    <div class="row">
    <div class="col-sm"></div>
    <div class="col-sm">
    <form>
        <div class="form-row">
          <div class="col-sm">
            <label for="exampleInputFirstName">First Name</label>  
      <input type="text" v-model= "firstName" class="form-control" placeholder="First name">
    </div>
    </div>
    <div class="form-row">
          <div class="col-sm">
            <label for="exampleInputLastName">Last Name</label>  
      <input type="text" v-model= "lastName" class="form-control" placeholder="Last name">
    </div>
    </div>
    <div class="form-group">
    <label for="exampleInputEmail1">Email</label>
    <input type="email" v-model= "email" class="form-control"
    id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
    <small id="emailHelp" class="form-text text-muted" >We'll
    never share your email with anyone else.</small>
    </div>
    <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" v-model= "password" class="form-control"
    id="exampleInputPassword1" placeholder="Password" />
    </div>
    <div class="form-group">
    <label for="exampleInputPassword1">Password Confirmation</label>
    <input type="password" v-model= "passwordConfirmation" class="form-control"
    id="exampleInputPassword1" placeholder="Password" />
    </div>
    <button type="button" @click="signup" class="btn btn-primary">Submit</button>
    </form>
    </div>
    <div class="col-sm"></div>
    </div>
    </div>
    </div>
    </template>
    <script>
    import firebase from '@/firebase';
    export default {
      name: "Signup",
      data(){
        return {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        };
      },
      methods: {
        signup(){
          if (this.password !== this.passwordConfirmation){
            console.log("Password do not match");
            return;
          }
          firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((userCredential)=>{
            const user = userCredential.user;
           return firebase.firestore().collection('users').doc(user.id).set({
            firstName:this.firstName,lastName:this.lastName, email:this.email
            });
          })
             . then(() => {
              console.log('Uspješna registracija');
             })
             .catch((error) => {
              console.log('Došlo je do greške', error);
        });
             
        },
      },
    };
    </script>
    