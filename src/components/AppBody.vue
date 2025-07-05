<template>
    <main class="app-body">
      <section class="content">
        <router-view /> <!-- This will dynamically load the content based on the current route -->
      </section>
    </main>
  </template>
  
  <script>
  export default {
    name: "AppBody",
  };
  </script>
  
  <style scoped>
  /* Main body styles */
  .app-body {
    background-color: #1e1e1e; /* Dark background color */
    color: #fff; /* White text color */
    padding: 50px; /* Add some padding to the main body */
    min-height: 80vh; /* Ensures the body takes up enough space */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .content {
    width: 100%;
    max-width: 1200px; /* Limits the width of the content for better readability */
    padding: 20px;
  }
  
  </style>
  