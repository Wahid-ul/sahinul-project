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
      <section class="work-description">
        <div class="text-container">
          <h1>Your Vision. Our Passion.</h1>
          <h2>Expanding Dreams Across Assam</h2>
          <h3>Helping You Create Beautiful Spaces</h3>

          <div class="expanded-text">
            <p>
              Whether it's your dream home or a personal space that reflects your story, we are here to design it with care, creativity, and clarity.
            </p>
          </div>
        </div>
      </section>
      <section class="our-services">
        <h2>Our Services</h2>
        <h3>We provide an optimalistic approach of things</h3>
        <div class="carousel-container">
          <!-- Carousel wrapper that slides -->
          <div class="compartment-container" :style="{ transform: 'translateX(' + transformX + '%)' }">
            <div v-for="(compartment, index) in compartments" :key="index" class="compartment">
              <img :src="compartment.image" alt="Compartment Image" class="compartment-image">
              <div class="image-description">
                <h4>{{ compartment.name }}</h4>
                <p>{{ compartment.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="project-section">
        <h2>Explore our working project</h2>
        <h3>
          Explore finished rooms from some of our customers and see how they created their dream rooms while getting ideas for your own.
        </h3>
      </section>

      <section>
        <div class="image-container">
          <img
            v-for="(photo, index) in visiblePhotos"
            :key="index"
            :src="photo"
            alt="Project"
            @click="showLightbox(index)"
            :style="{ cursor: 'zoom-in' }"
          />
        </div>
        <button class="see-more-btn" @click="toggleShowMore">
          {{ showMore ? 'Show Less' : 'See More' }}
        </button>
      </section>
      <!-- Lightbox Component -->
      <vue-easy-lightbox
        :visible="lightboxVisible"
        :imgs="lightboxImages"
        :index="lightboxIndex"
        @hide="lightboxVisible = false"
      />
    </body>
   
  </template>
  
  
  <script>
  import VueEasyLightbox from 'vue-easy-lightbox';

  export default {
    name: "AppHero",
    components: {
    VueEasyLightbox,
  },
    data(){
      return {
        showFirstImage:true,
        showSecondImage:false,
        transformX:0,
        // compartments: [
        //   // "compartment1", "compartment2", "compartment3", "compartment4", "compartment5", "compartment6"
        //   { image: require('../assets/picture/compartment1.jpeg') },
        //   { image: require('../assets/picture/compartment2.jpeg') },
        //   { image: require('../assets/picture/compartment3.jpeg') },
        //   { image: require('../assets/picture/compartment4.jpeg') },
        //   { image: require('../assets/picture/compartment5.jpeg') }
        // ],
        compartments: [
        { 
          image: require('../assets/picture/compartment1.jpeg'), 
          name: 'Bedroom Interior', 
          description: 'Transform your bedroom into a cool and luxurious space with captivating indigo interiors, perfect for relaxation and rejuvenation.' 
        },
        { 
          image: require('../assets/picture/compartment2.jpeg'), 
          name: 'Living Room Interior', 
          description: 'The living room showcases modern elegance with neutral tones and sleek furniture, creating a welcoming space for gatherings.' 
        },
        { 
          image: require('../assets/picture/compartment3.jpeg'), 
          name: 'Kitchen Interior', 
          description: 'Sleek and functional, this kitchen is designed with state-of-the-art appliances and a minimalist aesthetic for effortless cooking.' 
        },
        { 
          image: require('../assets/picture/compartment4.jpeg'), 
          name: 'Office Interior', 
          description: 'A productive workspace infused with modern design elements and ergonomic furniture to boost creativity and comfort.' 
        },
        { 
          image: require('../assets/picture/compartment5.jpeg'), 
          name: 'Bathroom Interior', 
          description: 'Relax in luxury with a spa-inspired bathroom featuring soothing colors, ambient lighting, and contemporary fixtures.' 
        }
      ],
        photoCollection:[],
        photos: [],
        imageCursor: 'pointer',
        showMore: false,
        lightboxVisible: false,
        lightboxIndex: 0,
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
      this.startCarousel();

    },
    computed: {
    // visibleCompartments() {
    //   const start = Math.floor(-this.transformX / 33.33);
    //   return this.compartments.slice(start, start + 3);
    // },
    visiblePhotos() {
      return this.showMore ? this.photos : this.photos.slice(0, 6);
    },
    lightboxImages() {
    return this.photos;
  },
  },
    
    methods:{
      showLightbox(index) {
      this.lightboxIndex = index;
      this.lightboxVisible = true;
    },
    toggleShowMore() {
      this.showMore = !this.showMore;
    },
      startCarousel() {
        const totalImages = this.compartments.length;
        const containerWidth = totalImages * 33.33; // Each compartment is 33.33% width
        const fullCycle = (containerWidth + 99.99); // Loop when transform reaches full width + 3 duplicates
        
        const slide = () => {
          this.transformX -= 0.1; // Adjust speed here

          if (this.transformX <= -fullCycle) {
            this.transformX = 0; // Reset to the start for infinite looping
          }
          requestAnimationFrame(slide);
        };
        requestAnimationFrame(slide);
      },


      async fetchPhotos() {
      try {
        const response = await fetch('https://elegence-civil-arc-server.onrender.com/api/gallery', {
          credentials: 'include'
        });
        const data = await response.json();
        console.log('Fetched images:', data); // 🔍 Debug here
        if (Array.isArray(data)) {
          this.photos = data;
        } else {
          console.error('Unexpected gallery response:', data);
        }
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      }
    },
    },
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
  
  // function importAll(r){
  //   return r.keys().map(r);
  // }
  </script>
  <style scoped>
  /* Hero styles */
  .first-part {
  background-color: rgb(41, 41, 41);
  position: relative;
  height: 100vh;
  width: 100vw; /* Ensure full viewport width */
  overflow: hidden;
  max-width: 100%;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 0;
  transition: opacity 2s ease, transform 3s ease;
}

.image-overlay img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.7);
}

.show-image {
  opacity: 1;
  transform: scale(1.05); /* Zoom-in effect */
}

.text-overflow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgb(245, 242, 242);
  font-size: 2.5vw; /* Responsive font size */
  text-align: center;
  padding: 15px 30px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  z-index: 1;
  max-width: 90%;
  word-wrap: break-word;
}

/* Responsive design for mobile devices */
@media (max-width: 768px) {
  .first-part {
    height: 70vh;
  }

  .text-overflow {
    font-size: 5vw;
    padding: 10px 20px;
    max-width: 95%;
  }

  .image-overlay img {
    object-fit: cover;
  }
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
  /* background-color: rgb(51, 54, 56); */
  /* margin-bottom: 200px; */
  position: relative;
  width: 100%; /* Ensure the section takes full width */
  overflow: hidden; /* Ensure video doesn't overflow its container */

}
.second-part video {
  width: 100%; /* Ensure the video fills the entire width of its container */
  height: auto; /* Maintain the video's aspect ratio */
  display: block; /* Ensure video behaves like a block element */
}

@media (max-width: 768px) {
  .second-part video {
    width: 100%; /* Adjust video width for smaller screens */
  }
}
.work-description {
  background: linear-gradient(to bottom right, #1e1e1e, #2c2c2c);
  color: #fff;
  padding: 40px 20px;
  text-align: center;
  font-family: 'Inter', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.text-container {
  max-width: 800px;
  margin: 0 auto;
  animation: fade-slide-in 1s ease-in-out forwards;
}

/* Headings */
.work-description h1 {
  font-size: 2rem;
  color: #f4b400;
  margin-bottom: 15px;
  font-weight: 600;
  letter-spacing: 1px;
}

.work-description h2 {
  font-size: 1.5rem;
  color: #ff6f61;
  margin-bottom: 10px;
  font-weight: 500;
  text-transform: uppercase;
}

.work-description h3 {
  font-size: 1.2rem;
  color: #58b4ae;
  font-weight: 400;
  margin-bottom: 20px;
}

/* Expanded text block */
.expanded-text {
  font-size: 1rem;
  color: #d4f5e9;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 15px 20px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 20px;
  line-height: 1.6;
}

/* Fade and slide in animation */
@keyframes fade-slide-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile Responsiveness */
@media (max-width: 600px) {
  .work-description {
    padding: 30px 15px;
  }

  .work-description h1 {
    font-size: 1.6rem;
  }

  .work-description h2 {
    font-size: 1.2rem;
  }

  .work-description h3 {
    font-size: 1rem;
  }

  .expanded-text {
    font-size: 0.95rem;
    padding: 10px 15px;
  }
}




/* Stylish font and color for H3 */
.our-services {
  color: azure;
  padding: 50px 15px;
  text-align: center;
  font-family: 'Arial', sans-serif;
}

.our-services h2 {
  font-size: 2.8em;
  font-family: 'Playfair Display', serif;
  color: #e67e22;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 15px;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
}

.our-services h3 {
  font-size: 1.5em;
  font-family: 'Poppins', sans-serif;
  color: #1abc9c;
  font-weight: 500;
  letter-spacing: 1px;
  margin-top: 5px;
  margin-bottom: 25px;
  text-transform: none;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}


.carousel-container {
  overflow: hidden;
  width: 100%;
  height: auto;
}

.compartment-container {
  display: flex;
  transition: transform 0.5s ease-in-out;
  animation: slide 20s linear infinite;
}

.compartment {
  flex: 0 0 33.33%;
  position: relative;
  padding: 10px;
  box-sizing: border-box;
}

.compartment-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.image-description {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  font-size: 0.9em;
  max-width: 90%;
}

/* Slide animation */
@keyframes slide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .compartment {
    flex: 0 0 50%;
  }

  .our-services h2 {
    font-size: 2.2em;
  }

  .our-services h3 {
    font-size: 1.4em;
  }

  .compartment-image {
    height: 220px;
  }
}

@media (max-width: 768px) {
  .compartment {
    flex: 0 0 100%;
  }

  .our-services h2 {
    font-size: 2em;
  }

  .our-services h3 {
    font-size: 1.3em;
  }

  .compartment-image {
    height: 200px;
  }

  .image-description {
    font-size: 0.85em;
  }
}

@media (max-width: 480px) {
  .our-services h2 {
    font-size: 1.8em;
  }

  .our-services h3 {
    font-size: 1.2em;
  }

  .compartment-image {
    height: 180px;
  }

  .image-description {
    font-size: 0.8em;
    bottom: 5px;
    right: 5px;
    padding: 8px;
  }
}


.photo-collection {
  
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.photo-item img {
  max-width: 100%;
  height: auto;
}
.project-section {
  padding: 40px 20px;
  text-align: center;
}

.project-section h2 {
  font-family: 'Roboto', sans-serif;
  font-size: 2.2rem;
  color: #ff6347;
  margin-bottom: 10px;
}

.project-section h3 {
  font-family: 'Lora', serif;
  font-size: 1.2rem;
  color: #d3d3d3;
  margin-bottom: 20px;
}

.image-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.image-container img {
  width: calc(33.33% - 1rem); /* Default: 3 per row */
  height: 12rem;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
  cursor: zoom-in;
}

.image-container img:hover {
  transform: scale(1.05);
}

.see-more-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

.see-more-btn:hover {
  background-color: #e5533f;
}

/* Tablet View */
@media (max-width: 768px) {
  .image-container img {
    width: calc(50% - 1rem); /* 2 per row */
    height: 10rem;
  }

  .project-section h2 {
    font-size: 2rem;
  }

  .project-section h3 {
    font-size: 1.1rem;
  }
}

/* Mobile View */
@media (max-width: 480px) {
  .image-container img {
    width: 100%; /* 1 per row */
    height: 9rem;
  }

  .project-section h2 {
    font-size: 1.7rem;
  }

  .project-section h3 {
    font-size: 1rem;
  }

  .see-more-btn {
    width: 100%;
    font-size: 1rem;
    padding: 12px;
  }
}

  </style>

