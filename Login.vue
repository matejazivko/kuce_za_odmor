<template>
  <div class="about">
  <h1>This is an login page</h1>
  <div class="container">
  <div class="row">
  <div class="col-sm"></div>
  <div class="col-sm">
  <form>
  <div class="form-group">
  <label for="exampleInputEmail1">Email</label>
  <input type="email" v-model="email" class="form-control"
  id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter
  email" />
  <small id="emailHelp" class="form-text text-muted" >We'll
  never share your email with anyone else.</small>
  </div>
  <div class="form-group">
  <label for="exampleInputPassword1">Password</label>
  <input type="password" v-model="password" class="form-control"
  id="exampleInputPassword1" placeholder="Password" />
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
  </form>
  </div>
  <div class="col-sm"></div>
  </div>
  </div>
  </div>
  <form @submit.prevent="login"></form>
  </template>
  <script>
 

  </script>
  