<template>
    <div>
      
      <button
        @click="showUploadForm = !showUploadForm"
        class="btn btn-primary"
        style="margin-top: 20px;"
      >
        {{ showUploadForm ? 'Sakrij Formu' : 'Dodaj sliku' }}
      </button>
  
      <div v-if="showUploadForm" class="upload-form">
        <h3>Dodajte sliku</h3>
        <form @submit.prevent="uploadImage">
          <input type="file" @change="onFileChange" />
          
        
        <button type="submit">Upload</button>
        </form>
        
      </div>
    </div>
  </template>
  
  <script>
  import { db, storage } from "@/firebase"; 
  import { collection, addDoc } from 'firebase/firestore';
  import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
  
  export default {
    name: 'PostUpload',
    data() {
      return {
        showUploadForm: false, 
        file: null,
      };
    },
    methods: {
      onFileChange(event) {
        this.file = event.target.files[0];
      },
      async uploadImage() {
        if (!this.file) {
          alert('Molimo odaberite sliku');
          return;
        }
  
        
        const storageRef = ref(storage, `images/${this.file.name}`);
  
        try {
          
          await uploadBytes(storageRef, this.file);
  
          
          const url = await getDownloadURL(storageRef);
  
          
          await addDoc(collection(db, "houses"), {
            imageUrl: url, 
          });
  
          
          this.file = null;
         
  
          alert('Slika uspješno uploadana!');
        } catch (error) {
          console.error("Greška: ", error);
        }
      },
      
    },
  };
  </script>
  
  <style scoped>
  .upload-form {
    margin-top: 10px;
    border: 1px solid #ccc;
    padding: 2px;
    border-radius: 1px;
  }
  
  .btn {
    background-color: #71CFF2;
    color: black;
  }
  </style>
  