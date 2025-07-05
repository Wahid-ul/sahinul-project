<template>
  <div class="gallery-uploader">
    <h2>Upload Images to Gallery</h2>

    <form @submit.prevent="uploadImages">
      <input
        type="file"
        multiple
        accept="image/*"
        @change="handleFiles"
        class="file-input"
      />

      <input
        v-model="title"
        type="text"
        placeholder="Optional title for images"
        class="text-input"
      />

      <button type="submit" :disabled="!files.length">Upload</button>
    </form>

    <p class="message">{{ message }}</p>

    <div class="preview">
      <img
        v-for="(file, index) in previewImages"
        :key="index"
        :src="file"
        alt="Preview"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: [],
      previewImages: [],
      message: '',
      title: ''
    };
  },
  methods: {
    handleFiles(event) {
      this.files = Array.from(event.target.files);
      this.previewImages = this.files.map(file => URL.createObjectURL(file));
    },
    async uploadImages() {
      if (!this.files.length) {
        this.message = '❗ Please select at least one image.';
        return;
      }

      const formData = new FormData();
      this.files.forEach(file => formData.append('images', file));
      formData.append('title', this.title);

      try {
        const res = await fetch('http://localhost:5000/api/gallery/upload', {
          method: 'POST',
          credentials: 'include',
          body: formData
        });

        const result = await res.json();
        this.message = res.ok ? '✅ Images uploaded successfully!' : result.error;

        if (res.ok) {
          this.files = [];
          this.previewImages = [];
          this.title = '';
        }
      } catch (err) {
        this.message = '❌ Upload failed. Please try again.';
      }
    }
  }
};
</script>

<style scoped>
.gallery-uploader {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #452d29;
  margin-bottom: 20px;
  font-size: 1.8rem;
}

.file-input,
.text-input {
  display: block;
  width: 100%;
  margin: 12px 0;
  padding: 10px 14px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button {
  padding: 12px 24px;
  background-color: #452d29;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s ease;
}

button:hover:enabled {
  background-color: #603d38;
}

button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.message {
  margin-top: 20px;
  color: #e67e22;
  font-weight: bold;
  min-height: 20px;
}

.preview {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
  justify-content: center;
}

.preview img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.preview img:hover {
  transform: scale(1.05);
}

/* ✅ Mobile compatibility */
@media (max-width: 600px) {
  .gallery-uploader {
    margin: 20px;
    padding: 20px 15px;
  }

  h2 {
    font-size: 1.4rem;
  }

  .preview img {
    width: 80px;
    height: 80px;
  }

  .file-input,
  .text-input {
    font-size: 15px;
  }

  button {
    width: 100%;
    font-size: 1rem;
  }
}
</style>
