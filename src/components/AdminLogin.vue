<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Admin Login</h2>

      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />

      <button @click="login">Login</button>

      <p class="message">{{ msg }}</p>

      <router-link to="/admin/add-project" class="form-link">
        ➕ Go to Add Project Form
      </router-link>
      <router-link to="/admin/gallery" class="form-link">
        ➕Add Photos in Gallery
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    username: '',
    password: '',
    msg: ''
  }),
  methods: {
    async login() {
      try {
        const res = await fetch('https://elegence-civil-arc-server.onrender.com/admin/login', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });
        const result = await res.json();
        this.msg = res.ok ? '✅ Login successful!' : result.error;

        if (res.ok) {
          this.$router.push('/admin/add-project');
        }
      } catch (err) {
        this.msg = 'Login failed. Server error.';
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background: #f4f4f4;
}

.login-card {
  background: #fff;
  padding: 40px 30px;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.login-card h2 {
  margin-bottom: 20px;
  color: #333;
}

.login-card input {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.login-card button {
  width: 100%;
  padding: 12px;
  background-color: #452d29;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.login-card button:hover {
  background-color: #603d38;
}

.message {
  margin-top: 15px;
  font-weight: bold;
  color: #e74c3c;
}

.form-link {
  display: block;
  margin-top: 20px;
  text-decoration: none;
  color: #452d29;
  font-weight: 500;
}
.form-link:hover {
  text-decoration: underline;
}
</style>
