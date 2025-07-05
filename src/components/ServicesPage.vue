<template>
    <div class="services-page">
      <div class="service-content">
        <!-- Image on the left -->
        <img src="@/assets/myproject/compartment6.jpeg" alt="Interior Design" class="service-image">
  
        <!-- Text content on the right -->
        <div class="service-text">
          <h1>We Offer Interior & Exterior Design</h1>
          <p>
            Transform your home with our professional interior and exterior design services. 
            Choose the style that best fits your needs, and let us bring your vision to life!
          </p>
          <div class="price-tag">
            <h2>Starting at ₹25,000</h2>
          </div>
  
          <!-- Book Consultation Button -->
          <button @click="openDialog" class="consultation-button">Book a Free Consultation</button>
        </div>
      </div>
  
      <!-- Pop-up Form Dialog -->
       
        <div v-if="isDialogOpen || isSubmitted" class="popup">
            <div class="popup-content">
            
            <div v-if="isProcessing" class="processing-message">
              <p>Booking for slot is processing...</p>
          </div>

            <div v-else-if="isSubmitted" class="success-message">
              <p>Congratulations! You have chosen the right decision for your home tour. We will contact you shortly.</p>
            </div>

            <!-- 📝 Show form only if not submitted -->
            <form v-else @submit.prevent="submitForm">
              <h2>Book a Free Consultation</h2>
              <button class="close-button" @click="closeDialog">×</button>

              <select v-model="propertyType" required>
                <option disabled value="">Property Type</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4+ BHK/Duplex">4+ BHK/Duplex</option>
              </select>

              <input type="text" v-model="name" placeholder="Name" required />
              <input type="text" v-model="mobile" placeholder="Mobile Number" required />

              <div class="whatsapp-updates">
                <input type="checkbox" v-model="updatesViaWhatsApp" id="whatsapp">
                <label for="whatsapp">Send me updates via WhatsApp</label>
              </div>

              <button type="submit" class="submit-button">Book Free Consultation</button>
            </form>
            </div>
        </div>
  
      
    </div>
  </template>
  
  <script>
  import axios  from 'axios';
  export default {
    name: "ServicesPage",
    data() {
      return {
        isDialogOpen: false,
        isSubmitted: false,
        isProcessing: false,
        designType: '',
        propertyType: '',
        name: '',
        mobile: '',
        updatesViaWhatsApp: false
      };
    },
    methods: {
      openDialog() {
        this.isDialogOpen = true;
        this.isSubmitted = false;
      },
       closeDialog() {
        this.isDialogOpen = false;
        this.isSubmitted = false;
      },
      async submitForm() {
        // this.isDialogOpen = false;
        // this.isSubmitted = true;
  
       
        const formData = {
            propertyType: this.propertyType,
            name: this.name,
            mobile: this.mobile,
            updatesViaWhatsApp: this.updatesViaWhatsApp,
        };
        try {
            // Send data to Flask backend via POST request
            const response = await axios.post('http://localhost:5000/service_mail', formData);
            alert(response.data.message || "Form submitted successfully!");
            
            
            this.resetForm();
            this.isProcessing = false;
            this.isSubmitted = true;
            setTimeout(() => {
              this.isSubmitted = false;
            }, 5000);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
            alert(error.response.data.error || "An error occurred!");
            } else {
            alert(error+"An error occurred! Unable to submit the form.");
            }
        }
        },
        resetForm() {
        // Clear form fields
        this.designType = '';
        this.propertyType = '';
        this.name = '';
        this.mobile = '';
        this.updatesViaWhatsApp = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .services-page {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px;
    background-color: #f0f0f0;
  }
  
  .service-content {
    display: flex;
    flex-direction: row;
    max-width: 1200px;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
  }
  
  .service-image {
    width: 50%;
    border-radius: 8px;
  }
  
  .service-text {
    padding-left: 20px;
    width: 50%;
  }
  
  h1 {
    color: #333;
  }
  h2{
    color: #fff;
  }
  
  p {
    color: #666;
  }
  
  .price-tag h2 {
    color: #ff6347; /* Tomato color */
  }
  
  .consultation-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #ff6347;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .consultation-button:hover {
    background-color: #ff4500; /* Darker Tomato */
  }
  
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);
  }
  
  .popup-content {
    background-color: #1a0303;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    max-width: 100%;
    position: relative; /* Needed for absolute positioning of close button */
  }
  .close-button {
  position: absolute;
  top: 10px;
  right: 15px; /* Right-aligned */
  font-size: 24px;
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
}

.close-button:hover {
  color: #ff6347;
}
  form {
    display: flex;
    flex-direction: column;
  }
  
  input, select {
    margin-top: 10px;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .whatsapp-updates {
    margin-top: 15px;
    
  }
  
  
  .submit-button {
    margin-top: 20px;
    padding: 10px;
    background-color: #ff6347;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .submit-button:hover {
    background-color: #ff4500;
  }
  .processing-message {
  color: #007bff; /* Bootstrap blue */
  font-size: 1.1em;
  text-align: center;
  padding: 20px 0;
}
  .success-message {
  color: #28a745;
  font-size: 1.1em;
  text-align: center;
  animation: fadeOut 3s forwards;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}



/* Mobile Responsive Styles */
@media (max-width: 768px) {
  .services-page {
    padding: 20px;
  }

  .service-content {
    flex-direction: column; /* Stack vertically on small screens */
    max-width: 100%;
    padding: 15px;
  }

  .service-image {
    width: 100%;  /* Full width image */
    margin-bottom: 20px; /* Space below image */
    border-radius: 8px;
  }

  .service-text {
    width: 100%;  /* Full width text container */
    padding-left: 0;
    text-align: center; /* Center text on mobile */
  }

  h1 {
  font-size: clamp(1.5rem, 4vw, 2rem);
}

p {
  font-size: clamp(1rem, 3vw, 1.2rem);
}


  .price-tag h2 {
    font-size: 1.25em;
  }

  .consultation-button {
    width: 100%;  /* Full width button */
    padding: 15px;
    font-size: 1.1em;
  }

  /* Popup content adjustments */
  .popup-content {
    width: 90%;
    padding: 20px;
  }

  input, select, .submit-button {
    font-size: 1em;
  }
}

  </style>
  