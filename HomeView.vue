<template>
  <div class="row">
  <div class="col-4"></div>
  <div class="col-4">
    <div class="card" style="width: 18rem;">
  <div class="card-body">
    <img class="card-img-tops" src="@/assets/Kuca_za_odmor_Una.jpg" weight="150" height="200">
    <h6 class="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
  </div>
</div>

  </div>
  <div class="col-4">
  ... ovdje ide desni stupac!
  </div>
  </div>
  </template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
