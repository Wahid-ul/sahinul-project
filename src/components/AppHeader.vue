<template>
  <header>
    <nav>
      <!-- Logo -->
      <img src="@/assets/elegence_civil_arc_logo.jpg" alt="Logo" class="logo" />

      <!-- Hamburger menu button (only visible on mobile) -->
      <button class="menu-toggle" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Navigation links -->
      <ul :class="{ 'nav-links': true, 'show': menuOpen }">
        <li><router-link to="/">Home</router-link></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/project">Projects</a></li>
        <li><router-link to="/contact">Contact Us</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
};
</script>

<style scoped>
/* Header */
header {
  background-color: #000;
  box-sizing: border-box;
}

/* Nav */
nav {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

/* Logo stays on the left */
.logo {
  width: 90px;
  max-height: 50px;
}

/* Navigation links (default desktop) */
.nav-links {
  display: flex;
  list-style: none;
  gap: 30px;
  margin: 0;
  padding: 0;
}

.nav-links li a,
.nav-links li router-link {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  white-space: nowrap;
}

/* Hamburger Button (hidden on desktop) */
.menu-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
}

.menu-toggle span {
  width: 25px;
  height: 3px;
  background-color: #fff;
  margin: 4px 0;
  transition: 0.4s;
}

/* MOBILE STYLES */
@media (max-width: 768px) {
  nav {
    flex-wrap: wrap;
  }

  .menu-toggle {
    display: flex;
    position: absolute;
    right: 20px;
    top: 25px;
    z-index: 1001;
  }

  .nav-links {
    display: none;
    flex-direction: column;
    width: 100%;
    background-color: #000;
    text-align: center;
    position: absolute;
    top: 70px;
    left: 0;
    z-index: 1000;
    padding: 20px 0;
  }

  .nav-links.show {
    display: flex;
  }

  .nav-links li {
    margin: 10px 0;
  }
}
</style>
