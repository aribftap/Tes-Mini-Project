<template>
    <div class="login-page">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input type="text" v-model="username" placeholder="Username" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <router-link to="/register">Register</router-link></p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:5000/auth/login', {
            username: this.username,
            password: this.password,
          });
          localStorage.setItem('token', response.data.data.token);
          this.$router.push('/books');
        } catch (error) {
          alert(error.response?.data?.message || 'Login failed');
        }
      },
    },
  };
  </script>