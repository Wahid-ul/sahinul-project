<template>
    <header>
      <nav>
        <!-- logo on the left -->
         <img src="@/assets/elegence_civil_arc_logo.jpg" alt="Logo" class="logo">
        <ul>
          <!-- <li><a href="#">Home</a></li>
          <li><a href="/about">About</a></li> -->
          <li><router-link to="/">Home</router-link></li>
        
          <li><a href="/services">Services</a></li>
          <li><a href="/project">Projects</a></li>
          <li><router-link to="/contact">Contact Us</router-link></li>
          
          <!-- <li><a href="#">Blog</a></li> -->
          <!-- <li><a href="#">Contact</a></li> -->
          
        </ul>
      </nav>
    </header>
    
  </template>
  
  <script>
  export default {
    name: "AppHeader",
    
  };
  </script>
  
  <style scoped>
/* Header styles */
header {
  background-color: #000; /* black background color */

}

nav {
  width: 99%; /*Set navbar width to 100%*/
  padding-top: 50px;
  padding-bottom: 50px;
  display: flex;
  justify-content: flex-end;
}
.logo{
  height: auto;
  width: 90px;
  /* object-fit: contain; */
  margin-right: 800px;
  max-height: 50px;
}
nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
}

nav ul li {
  display: inline;
  margin-right: 20px;
}

nav ul li:last-child {
  margin-right: 0; /* remove margin from the last li element */
  justify-content:center ;
}

nav ul li a {
  color: #fff; /* white color for the links */
  text-decoration: none;
}


@media (max-width: 768px) {
  nav {
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .logo {
    margin: 0 0 15px 0;
    width: 70px;
    max-height: 40px;
  }

  nav ul {
    flex-direction: column;
    width: 100%;
    text-align: center;
  }

  nav ul li {
    margin: 10px 0;
  }
}

</style>