<template>
  <div class="register-page">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input type="text" v-model="username" placeholder="Username" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <button type="submit">Register</button>
    </form>
    <p>Already have an account? <router-link to="/login">Login</router-link></p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      email: '',
    };
  },
  methods: {
    async register() {
      try {
        await axios.post('http://localhost:5000/auth/register', {
          username: this.username,
          password: this.password,
          email: this.email,
        });
        alert('Registration successful');
        this.$router.push('/login');
      } catch (error) {
        alert(error.response?.data?.message || 'Registration failed');
      }
    },
  },
};
</script>