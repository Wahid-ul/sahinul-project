<template>
    <header>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Projects</a></li>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Contact</a></li>
          
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
  width: 100%; /* Set navbar width to 100% */
  padding-top: 50px;
  padding-bottom: 50px;
  display: flex;
  justify-content: flex-end;
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

</style>