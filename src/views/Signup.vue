<template>
    <div class="about">
    <h1>This is an signup page</h1>
    <div class="container">
    <div class="row">
    <div class="col-sm"></div>
    <div class="col-sm">
    <form @submit.prevent="signup">
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
    <div class="form-group">
    <label for="exampleInputPassword">Password</label>
    <input type="password" v-model= "password" class="form-control"
    id="exampleInputPassword1" placeholder="Password" />
    </div>
    <div class="form-group">
    <label for="exampleInputPasswordConfirmation">Password Confirmation</label>
    <input type="password" v-model= "passwordConfirmation" class="form-control"
    id="exampleInputPasswordConfirmation" placeholder="Password" />
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
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
    import { auth, createUserWithEmailAndPassword } from '@/firebase'; 
    export default {
      name: "signup",
data() {
return {
nameAndSurname: "",
email: "",
password: "",
passwordConfirmation: "",
successMessage: "",
errorMessage: ""
};
},
methods: {
    signup() {
      if (this.password !== this.passwordConfirmation) {
        this.errorMessage = "Lozinke se ne podudaraju!";
        return;
      }

      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          
          this.successMessage = "Račun je uspješno kreiran!";
          console.log('Korisnik registriran:', userCredential.user);
          
          setTimeout (() => {
            this.$router.push({ name: 'login' });
          }, 3000);
      })
        .catch((error) => {
          
          this.errorMessage = `Greška prilikom registracije: ${error.message}`;
          console.error('Greška prilikom registracije:', error);
        });
    }
  }
}
    </script>
    