import { createRouter, createWebHistory } from 'vue-router';
// import HomePage from '../components/HomePage.vue'; // Assuming you have a HomePage.vue
// import Header from "./components/AppHeader.vue";
import Hero from "../components/AppHero.vue";
import Contact from '../components/ContactPage.vue'; // AboutPage.vue
import Services from '../components/ServicesPage.vue'
import Project from '../components/ProjectPage.vue'
import AdminLogin from '@/components/AdminLogin.vue';
import AdminForm from '@/components/AdminForm.vue';
import GalleryUploader from '@/components/GalleryUploader.vue';
const routes = [
    {
      path: '/',
      name: 'Home',
      component: Hero,
    },
    {
      path: '/contact',
      name: 'About',
      component: Contact, // This will load ContactPage.vue
    },
    {
      path:'/services',
      name:'Services',
      component:Services,
    },
    {
      path:'/project',
      name:'Project',
      component:Project
    },
    {
      path:'/admin',
      name:'AdminLogin',
    component: AdminLogin
    },
    {path:'/admin/add-project',
      name:'AdminForm',
      component: AdminForm
    },
    {
      path: '/admin/gallery',
      name: 'GalleryUploader',
      component: GalleryUploader
      
    }

  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;