<template>
  <div class="card-body p-0" style="width: 18rem;">
  <img :src="info.url" class="card-img-top" alt="slika">
  <div class="card-body">
   <p class="card-text">{{ info.title }}</p>
    <a href="#" class="btn btn-primary">{{ info.komentar }}</a><br><br>
    <a href="#" class="btn btn-primary">{{ info.kontakt }}</a>
  </div>
</div>
  
</template>

<script>
export default {
  props: ["info"],
  name: 'HouseCard',
  
}
</script>


