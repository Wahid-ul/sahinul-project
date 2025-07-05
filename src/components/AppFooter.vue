<template>
  <footer class="footer">
    <div class="footer-container">
      <div
        class="footer-column"
        v-for="(section, index) in sections"
        :key="index"
      >
        <h3 @click="toggle(index)">
          {{ section.title }}
          <span class="toggle-icon" v-if="isMobile">[{{ openIndex === index ? '-' : '+' }}]</span>
        </h3>
        <ul v-show="!isMobile || openIndex === index">
          <li v-for="(item, idx) in section.items" :key="idx">
            <component :is="item.type" :to="item.to" v-if="item.type === 'router-link'">{{ item.label }}</component>
            <a :href="item.href" target="_blank" v-else-if="item.type === 'link'">{{ item.label }}</a>
            <p v-else>{{ item.label }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 Elegance Civil & Architecture. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
  data() {
    return {
      openIndex: null,
      isMobile: false,
      sections: [
        {
          title: "Our Services",
          items: [
            { type: "router-link", to: "/", label: "Home" },
            { type: "text", label: "Interior Design" },
            { type: "text", label: "Exterior Design" },
            { type: "text", label: "Modular Kitchen Design" },
            { type: "text", label: "Bedroom Design" },
            { type: "text", label: "Bathroom Design" },
            { type: "text", label: "2BHK Flat Design" },
            { type: "text", label: "3BHK Flat Design" },
          ],
        },
        {
          title: "Contact Us",
          items: [
            { type: "link", href: "https://twitter.com/yourhandle", label: "Twitter" },
            { type: "link", href: "https://facebook.com/yourpage", label: "Facebook" },
            { type: "link", href: "https://instagram.com/yourhandle", label: "Instagram" },
            { type: "link", href: "https://wa.me/yourwhatsapplink", label: "WhatsApp" },
          ],
        },
        {
          title: "Support",
          items: [
            { type: "router-link", to: "/faq", label: "FAQ" },
            { type: "router-link", to: "/how-we-work", label: "How We Work" },
            { type: "router-link", to: "/terms", label: "Terms & Conditions" },
            { type: "router-link", to: "/privacy", label: "Privacy Policy" },
          ],
        },
        {
          title: "About Elegance",
          items: [
            { type: "text", label: "Elegance Civil & Architecture is a modern design firm specializing in smart, aesthetic, and sustainable residential and commercial spaces." },
          ],
        },
      ],
    };
  },
  mounted() {
    this.checkMobile();
    window.addEventListener("resize", this.checkMobile);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkMobile);
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth < 768;
      if (!this.isMobile) this.openIndex = null;
    },
    toggle(index) {
      if (!this.isMobile) return;
      this.openIndex = this.openIndex === index ? null : index;
    },
  },
};
</script>

<style scoped>
.footer {
  background-color: #111;
  color: #fff;
  padding: 40px 20px 20px;
  font-family: Arial, sans-serif;
}

.footer-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30px;
}

.footer-column {
  flex: 1 1 200px;
}

.footer-column h3 {
  font-size: 18px;
  margin-bottom: 15px;
  border-bottom: 1px solid #444;
  padding-bottom: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column ul li {
  margin-bottom: 10px;
}

.footer-column a {
  color: #bbb;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-column a:hover {
  color: #fff;
}

.footer-column p {
  color: #ccc;
  font-size: 14px;
  margin: 0;
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  font-size: 14px;
  border-top: 1px solid #333;
  margin-top: 30px;
  color: #888;
}

@media (max-width: 767px) {
  .footer-container {
    flex-direction: column;
    gap:0;
    margin:0;
    padding: 0;
  }

  .footer-column {
    margin-bottom: 0;
    padding: 0;
    border-bottom: 1px solid #333;

  }
  .footer-column h3 {
    font-size: 16px;
    margin: 0;
    padding: 12px 0;
    display: flex;
   
    justify-content: space-between;
    align-items: center;
  }

  .footer-column ul {
    margin:0;
    padding:5px  10px 10px 10px;
  }

  .footer-column ul li {
    margin-bottom: 6px;
  }
 
}
</style>
