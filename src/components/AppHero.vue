<template>
  <body>
      <section class="first-part">
        
        <!-- First image -->
        <div class="image-overlay" :class="{ 'show-image': showFirstImage }">
          <img src="../assets/first_interior_image.jpg" alt="First Image">
        </div>
        <!-- Second image -->
        <div class="image-overlay" :class="{ 'show-image': showSecondImage }">
          <img src="../assets/second_interior_image.jpg" alt="Second Image">
        </div>
        <div class="text-overflow">
          <h4>Home....</h4>
          <p>should be the treasure chest of living </p> 
        </div>
      </section>
      <section class="second-part">
        <!-- <video autoplay controls controlsList="nodownload"> -->
          <video autoplay muted loop playsinline>
          <source src="../assets/360_design_video.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <!-- <img src="../assets/360_design_video.mp4" alt="Additional video"> -->
      </section>
      <section class="our-services">
      <h2>Our Services</h2>
      <h3>We provide an optimalistic approach of things</h3>
      <div class="compartment-container" :style="{ transform: 'translateX(' + transformX + '%)' }">
        <div v-for="(compartment, index) in visibleCompartments" :key="index" class="compartment">
          <div class="image-description">
            <h3>Image {{ index + 1 }}</h3>
            <p>Description for Image {{ index + 1 }}</p>
          </div>
          <!-- <img :src="'../assets/picture/compartment' + (index + 1) + '.jpeg'" alt="Compartment Image" class="compartment-image"> -->
          <img src="../assets/picture/compartment1.jpeg" alt="Compartment Image" class="compartment-image">
          <!-- <div class="description-box">Description for Compartment {{ index + 1 }}</div> -->
        </div>
      </div>
      
      </section>
      <section class="project-section">
      <h2>Explore our working project</h2>
      <h3>Explore finished rooms from some of our customers and see how they created their dream rooms while getting ideas for your own. </h3>
      </section>
      <section>
        <div class="image-container">
          <img 
            v-for="(photo,index) in photos"
            :key="index"
            @click="toggleImageSize(index)"
            :src="require(`@/assets/myproject/${photo}`)"
            :style="{ cursor: imageCursor }"
          
          alt="">

        </div>
      </section>
    </body>
   
  </template>
  
  
  <script>
  export default {
    name: "AppHero",
    data(){
      return {
        showFirstImage:true,
        showSecondImage:false,
        transformX:0,
        compartments: ["compartment1", "compartment2", "compartment3", "compartment4", "compartment5", "compartment6"],
        photoCollection:[],
        photos: ['compartment1.jpeg', 'compartment2.jpeg', 'compartment3.jpeg', 'compartment4.jpeg', 'compartment5.jpeg', 'compartment6.jpeg'],
        imageCursor: 'pointer',
      };
    },
    mounted(){
      const images=[
      { showFirstImage: true, showSecondImage: false },
      { showFirstImage: false, showSecondImage: true }
      ];
      let currentIndex=0;
      const showNextImage=()=>{
        const currentImage=images[currentIndex]
        // Set the current image to be displayed
        this.showFirstImage=currentImage.showFirstImage;
        this.showSecondImage=currentImage.showSecondImage
        // increament the index to move to the next image
        currentIndex=(currentIndex+1) %images.length
        // set the time to 3 second for showing next image
        setTimeout(showNextImage,3000)
      }
      showNextImage();
      //compartment rotating function
      this.fetchPhotos();

    },
    computed: {
    visibleCompartments() {
      const start = Math.floor(-this.transformX / 33.33);
      return this.compartments.slice(start, start + 3);
    }
  },
    
    methods:{
    //   rotateLeft() {
    //   if (this.transformX < 0) {
    //     this.transformX += 33.33;
    //   }
    // },
    // rotateRight() {
    //   const totalCompartments = this.compartments.length;
    //   if (this.transformX > -((totalCompartments - 3) * 33.33)) {
    //     this.transformX -= 33.33;
    //   }
    // },
    async fetchPhotos() {
      const photoFiles = await importAll(require.context('@/assets/myproject', false, /\.(png|jpe?g|svg)$/));
      this.photoCollection = photoFiles.map(file => ({ url: file.default }));
    },
    
// eslint-disable-next-line no-unused-vars
toggleImageSize(index) {
      // Toggle between regular size and full size
      if (this.imageCursor === 'pointer') {
        this.imageCursor = 'zoom-out'; // Use 'zoom-out' cursor when image is full size
      } else {
        this.imageCursor = 'pointer'; // Use 'pointer' cursor when image is regular size
      }
    },
  }
  };
  function importAll(r){
    return r.keys().map(r);
  }
  </script>
  <style scoped>
  /* Hero styles */
  .first-part{
  background-color: rgb(41, 41, 41);
  position: relative;
  height: 100vh;
  width: 100%;
}
 .image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 0;
  /* transition: opacity 0.5s ease; */
  transition: opacity 5s ease, transform 5s ease;
}
.image-overlay img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensure the image covers the entire container */
  filter: brightness(0.7); /* Darken the image slightly */
}
 .show-image {
  opacity: 1;
  transform: scale(1.1); /* Slight zoom effect */
}

.text-overflow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  color: rgb(245, 242, 242);
  font-size: 24px;
  text-align: center;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.5); 
  border-radius: 10px;
  /* z-index: 2;
  /* animation: fadeIn 5s ease; */
}

/* @keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  } 
} */
.second-part{
  background-color: rgb(51, 54, 56);
  /* margin-bottom: 200px; */
  position: relative;
  /* bottom: 0; */
  /* width: 100%; */
  margin-top: calc(100vh-100%);

}
.second-part video {
  width: 100%; /* Ensure the video fills the entire width of its container */
  height: auto; /* Maintain the video's aspect ratio */
}


.our-services {
  color: azure;
  background-color: #151f0b;
  padding: 50px 0;
  text-align: center;
}

.compartment-container {
  display: flex;
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 300px;
  /* transition: transform 0.5s ease; */
}

.compartment {
  flex: 0 0 33.33%;
  transition: transform 1s ease;
  /* float: right;
  background-color: #c41717;
  padding: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); */
}
.compartment-image{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* .rotate-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
.compartment-image {
  width: 100%;
  height: 100%;
} */

.image-description{
  position: absolute;
  bottom: 20px;
  /* padding: 10px; */
  /* width: 100%; */
  text-align: center;
  /* right: 20px; */
  padding-right: 20px;
  padding-left: 20px;
  z-index: 1;
  color: rgb(19, 198, 76);
  border-bottom-right-radius: 5px ;
  border-style: solid;
  background: #473565;
  opacity: .8;
}

@keyframes slide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
.compartment-container {
  display: flex;
  animation: slide 15s linear infinite;
}
/* Extra applicable for the css style */
/* .description-box{
  position: absolute;
  position: absolute;
  bottom: 20px;
 
  padding-left: 20px;
  padding-right: 20px;
  color: rgb(49, 20, 214);
  background-color: rgba(5, 88, 9, 0.7);
  border-style: solid;
} */

.photo-collection {
  
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.photo-item img {
  max-width: 100%;
  height: auto;
}
.project-section{
  background-color: black;
  color: azure;
  width: 100%;
}
.image-container {
  background-color: black;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  height: 100vh; /* Full screen height */
}

.image-container img {
  height: 20rem;
  width: calc(33.33% - 1rem);
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.image-container img:hover {
  transform: scale(1.1);
}
  </style>

