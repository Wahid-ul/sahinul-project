<template>
  <div v-if="loggedIn" class="form-container">
    <h2>Add New Project</h2>
    <form @submit.prevent="submit">
      <input v-model="project.title" required placeholder="Project Title" />
      <input v-model="project.project_name" placeholder="Project Name" />
      <input v-model="project.area" placeholder="Property Area" />
      <input v-model="project.type" placeholder="Property Type" />
      <textarea v-model="project.brief" placeholder="Client Brief"></textarea>
      <textarea v-model="project.solution" placeholder="Design Solution"></textarea>
      <textarea v-model="project.feedback" placeholder="Client Feedback"></textarea>

      <!-- Image Upload Section -->
      <div class="image-upload">
        <label>Upload Images (JPG, PNG):</label>
        <input type="file" multiple accept="image/jpeg, image/png" @change="handleImageUpload" />
      </div>

      <!-- Image List -->
      <ul class="image-list">
        <li v-for="(img, i) in project.images" :key="i">
          <img :src="img" alt="uploaded" />
          <button type="button" @click="project.images.splice(i, 1)">❌</button>
        </li>
      </ul>

      <button class="submit-btn" type="submit">Submit Project</button>
    </form>
    <p class="message">{{ msg }}</p>
  </div>
</template>


<script>
export default {
  data: () => ({
    project: {
      title: '',
      project_name: '',
      area: '',
      type: '',
      brief: '',
      solution: '',
      feedback: '',
      images: []
    },
    msg: '',
    loggedIn: false
  }),
  async mounted() {
    const res = await fetch('https://elegence-civil-arc-server.onrender.com/projects', {
      method: 'GET',
      credentials: 'include'
    });
    this.loggedIn = res.ok;
  },
  methods: {
    async handleImageUpload(event) {
      const files = Array.from(event.target.files);
      for (const file of files) {
        // Check file type
        if (!['image/jpeg', 'image/png'].includes(file.type)) {
          this.msg = 'Only JPG and PNG formats are allowed.';
          continue;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
          const res = await fetch('https://elegence-civil-arc-server.onrender.com/upload_image', {
            method: 'POST',
            credentials: 'include',
            body: formData
          });

          const result = await res.json();
          if (res.ok) {
            this.project.images.push(result.url); // URL returned by backend
          } else {
            this.msg = result.error || 'Image upload failed';
          }
        } catch (err) {
          this.msg = 'Image upload error: ' + err.message;
        }
      }
    },

    async submit() {
      const r = await fetch('https://elegence-civil-arc-server.onrender.com/admin/add_project', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.project)
      });
      const j = await r.json();
      this.msg = r.ok ? j.message : j.error;
    }
  }
};

</script>

<style scoped>
.form-container {
  max-width: 700px;
  margin: 30px auto;
  padding: 30px;
  border-radius: 12px;
  background-color: #fafafa;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
input,
textarea {
  display: block;
  width: 100%;
  margin: 10px 0 20px;
  padding: 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
textarea {
  resize: vertical;
}
.image-upload {
  margin: 20px 0;
}
.image-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
.image-list li {
  position: relative;
}
.image-list img {
  height: 100px;
  border-radius: 6px;
  object-fit: cover;
}
.image-list button {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 12px;
  cursor: pointer;
}
.submit-btn {
  width: 100%;
  background-color: #452d29;
  color: white;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.submit-btn:hover {
  background-color: #603d38;
}
.message {
  margin-top: 20px;
  font-weight: bold;
  color: #333;
}
</style>
