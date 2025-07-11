<template>
  <div class="recent-projects-container">
    <h2 class="recent-projects-title">Recent Projects</h2>

    <div v-for="project in paginatedProjects" :key="project.id" class="project-card">
      <h3>{{ project.title }}</h3>

      <div class="image-slider" v-if="project.images.length">
        <img :src="project.images[project.currentImageIndex]" class="project-image" />
        <button @click="prevImage(project)" class="nav-btn left-btn">&lt;</button>
        <button @click="nextImage(project)" class="nav-btn right-btn">&gt;</button>
      </div>

      <button @click="toggleDetails(project)">
        {{ project.showDetails ? 'Less details' : 'More details' }}
      </button>

      <div v-if="project.showDetails" class="project-details">
        <p><strong>Project Name:</strong> {{ project.project_name }}</p>
        <p><strong>Property Area:</strong> {{ project.area }}</p>
        <p><strong>Property Type:</strong> {{ project.type }}</p>
        <p><strong>Client Brief:</strong> {{ project.brief }}</p>
        <p><strong>Design Solution:</strong> {{ project.solution }}</p>
        <p><strong>Client Feedback:</strong> "{{ project.feedback }}"</p>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="currentPage--">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="currentPage++">Next</button>
    </div>
  </div>
</template>

  
  
  <!-- <script>
    export default {
    data() {
        return {
        projects: [],
        currentPage:1,
        perPage: 3
        };
    },

    computed: {
        totalPages() {
        return Math.ceil(this.projects.length / this.perPage);
        },
        paginatedProjects() {
        const start = (this.currentPage - 1) * this.perPage;
        return this.projects.slice(start, start + this.perPage);
        }
    },
    async mounted() {
        try {
            const response = await fetch('http://localhost:5000/projects');
            const data = await response.json();
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            this.projects = data.map(p => ({
              ...p,
              currentImageIndex: 0,
              showDetails: false
            }));
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    },
    methods: {
        toggleDetails(project) {
        project.showDetails = !project.showDetails;
        },
        nextImage(project) {
        if (project.currentImageIndex < project.images.length - 1) {
            project.currentImageIndex++;
        } else {
            project.currentImageIndex = 0; // Loop back to the first image
        }
        },
        prevImage(project) {
        if (project.currentImageIndex > 0) {
            project.currentImageIndex--;
        } else {
            project.currentImageIndex = project.images.length - 1; // Loop to the last image
        }
        }
    }
};
</script> -->
  <script>
export default {
  data() {
    return {
      projects: [],
      currentPage: 1,
      perPage: 3
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.projects.length / this.perPage);
    },
    paginatedProjects() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.projects.slice(start, end);
    }
  },
  methods: {
    toggleDetails(project) {
      project.showDetails = !project.showDetails;
    },
    nextImage(project) {
      if (project.currentImageIndex < project.images.length - 1) {
        project.currentImageIndex++;
      } else {
        project.currentImageIndex = 0;
      }
    },
    prevImage(project) {
      if (project.currentImageIndex > 0) {
        project.currentImageIndex--;
      } else {
        project.currentImageIndex = project.images.length - 1;
      }
    },
    async fetchProjects() {
      try {
        const res = await fetch("https://elegence-civil-arc-server.onrender.com/projects");
        const data = await res.json();
        this.projects = data.map(p => ({
          ...p,
          showDetails: false,
          currentImageIndex: 0
        }));
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    }
  },
  mounted() {
    this.fetchProjects();
  }
};
</script>

  <style scoped>
  .recent-projects-container {
  position: relative;
  padding: 20px;
}

.recent-projects-title {
  position: absolute;
  top: -30px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #000000;
}
  .projects-section {
    max-width: 1200px;
    margin: auto;
    padding: 20px;
    text-align: center;
  }
  
  .project-card {
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #452d29;
  width: 90%;
  max-width: 900px;
  transition: box-shadow 0.3s ease;
  color: #fff;
}

.image-slider {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.project-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
}

.nav-btn {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  border: none;
  padding: 8px 12px;
  font-size: 18px;
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  border-radius: 50%;
}
.left-btn { left: 10px; }
.right-btn { right: 10px; }

.project-details {
  margin-top: 20px;
  text-align: left;
  line-height: 1.5;
}

button {
  background-color: #ff6347;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  align-self: flex-start;
}

button:hover {
  background-color: #e5533c;
}

.recent-projects-title {
  font-size: 24px;
  font-weight: bold;
  color: #e3d3d3;
  padding: 20px;
}

/* 🔍 Responsive Styles */
@media (max-width: 768px) {
  .project-card {
    padding: 15px;
  }

  .project-image {
    max-height: 200px;
  }

  .project-details {
    font-size: 14px;
  }

  .nav-btn {
    font-size: 16px;
    padding: 6px 10px;
  }

  button {
    font-size: 14px;
    padding: 8px 12px;
  }

  .recent-projects-title {
    font-size: 20px;
    text-align: center;
    padding: 10px 0;
    color: black;
  }
}

@media (max-width: 480px) {
  .project-card {
    padding: 10px;
  }

  .project-details {
    font-size: 13px;
  }

  .project-image {
    max-height: 180px;
  }

  button {
    width: 100%;
  }
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 15px;
}

.pagination button {
  background-color: #ff6347;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button[disabled] {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  color: #fff;
  font-size: 16px;
}

  </style>
  