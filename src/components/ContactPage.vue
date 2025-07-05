<template>
  <body>
    <div class="contact-section">
      <h1>Contact Us</h1>
      <p>Welcome to our company. We strive to offer the best services...</p>
      
      <!-- Form section -->
      <form @submit.prevent="submitForm">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required>
  
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
  
        <label for="message">Message:</label>
        <textarea id="message" v-model="message" required></textarea>
  
        <button type="submit">Submit</button>
      </form>
    </div>
  </body>
    
  </template>
  
  <script>
  import axios from 'axios';

  export default {
    name: "ContactPage",
    data() {
      return {
        name: "",
        email: "",
        message: ""
      };
    },
    methods: {
      async submitForm() {
        try{
          // make post request to Flask backend
          // const reponse =await axios.post("http://localhost:5000/send_email",{
          await axios.post("http://localhost:5000/send_email",{
            name:this.name,
            email:this.email,
            message:this.message
          });
          console.log("Form Submitted:", this.name, this.email, this.message);
          alert("Thank you for submitting the form!");
          // Reset the form
          this.name = "";
          this.email = "";
          this.message = "";
        }catch(error){
          console.error("Error sending form data:",error);
          alert("Failed to submit the form. Please try again.");
        }
        
      }
    }
  };
  </script>
  
  <style scoped>
  .contact-section {
    background-color: #222;
    color: #fff;
    padding: 20px;
    max-width: 600px;
    margin: auto;
    border-radius: 8px;
  }
  
  h1 {
    color: #ff6347; /* Tomato color */
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-top: 10px;
  }
  
  input, textarea {
    padding: 10px;
    margin-top: 5px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  button {
    margin-top: 20px;
    padding: 10px;
    background-color: #ff6347;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #ff4500; /* Darker Tomato */
  }


  @media (max-width: 600px) {
  .contact-section {
    padding: 15px;
    width: 90%;
    margin: 20px auto;
  }

  h1 {
    font-size: 1.5rem;
  }

  input, textarea {
    font-size: 1rem;
  }

  button {
    font-size: 1rem;
    padding: 12px;
  }
}

  </style>
  