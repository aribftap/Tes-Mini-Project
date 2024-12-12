<template>
  <div class="books-dashboard">
    <h2>Books Dashboard</h2>
    <button @click="logout" class="logout-button">Logout</button>

    <table border="1" cellspacing="0" cellpadding="10">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Year</th>
          <th>Type</th>
          <th>Publisher</th>
          <th>Publisher Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.idBuku">
          <td>{{ book.idBuku }}</td>
          <td>{{ book.judulBuku }}</td>
          <td>{{ book.tahun }}</td>
          <td>{{ book.jenis }}</td>
          <td>{{ book.penerbit }}</td>
          <td>{{ book.alamatPenerbit }}</td>
          <td>
            <button @click="editBook(book.idBuku)">Edit</button>
            <button @click="deleteBook(book.idBuku)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="selectedBook">
      <h3>Edit Book</h3>
      <form @submit.prevent="updateBook">
        <input v-model="selectedBook.judulBuku" placeholder="Title" required />
        <input v-model.number="selectedBook.tahun" type="number" placeholder="Year" required />
        <input v-model="selectedBook.jenis" placeholder="Type" required />
        <input v-model="selectedBook.penerbit" placeholder="Publisher" required />
        <input v-model="selectedBook.alamatPenerbit" placeholder="Publisher Address" required />
        <button type="submit">Save</button>
      </form>
    </div>

    <div>
      <h3>Add New Book</h3>
      <form @submit.prevent="addBook">
        <input v-model="newBook.judulBuku" placeholder="Title" required />
        <input v-model.number="newBook.tahun" type="number" placeholder="Year" required />
        <input v-model="newBook.jenis" placeholder="Type" required />
        <input v-model="newBook.penerbit" placeholder="Publisher" required />
        <input v-model="newBook.alamatPenerbit" placeholder="Publisher Address" required />
        <button type="submit">Add</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      books: [],
      selectedBook: null,
      newBook: {
        judulBuku: '',
        tahun: '',
        jenis: '',
        penerbit: '',
        alamatPenerbit: '',
      },
      token: localStorage.getItem('token'),
    };
  },
  methods: {
    async fetchBooks() {
      try {
        const response = await axios.get('http://localhost:5000/books', {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.books = response.data.data;
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to fetch books');
      }
    },
    editBook(id) {
      const book = this.books.find((b) => b.idBuku === id);
      this.selectedBook = { ...book };
    },
    async updateBook() {
      try {
        const { idBuku, judulBuku, tahun, jenis, penerbit, alamatPenerbit } = this.selectedBook;
        await axios.put(`http://localhost:5000/books/${idBuku}`, {
          judulBuku,
          tahun,
          jenis,
          penerbit,
          alamatPenerbit,
        }, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        alert('Book updated successfully');
        this.selectedBook = null;
        this.fetchBooks();
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to update book');
      }
    },
    async deleteBook(id) {
      try {
        await axios.delete(`http://localhost:5000/books/${id}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        alert('Book deleted successfully');
        this.fetchBooks();
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete book');
      }
    },
    async addBook() {
      try {
        await axios.post('http://localhost:5000/books', this.newBook, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        alert('Book added successfully');
        this.newBook = { judulBuku: '', tahun: '', jenis: '', penerbit: '', alamatPenerbit: '' };
        this.fetchBooks();
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to add book');
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  },
  mounted() {
    this.fetchBooks();
  },
};
</script>

<style>
.books-dashboard {
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
}
.logout-button {
  margin-left: 10px;
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
.logout-button:hover {
  background-color: #d32f2f;
}
table {
  width: 100%;
  margin: 20px 0;
}
table th, table td {
  padding: 10px;
  text-align: left;
}
</style>