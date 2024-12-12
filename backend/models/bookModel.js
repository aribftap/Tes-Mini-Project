const db = require('../config/db');

const Book = {
    addJenisBuku: function(jenis, callback) {
        const sql = 'INSERT INTO JenisBuku (jenis) SELECT ? WHERE NOT EXISTS (SELECT 1 FROM JenisBuku WHERE jenis = ?)';
        db.query(sql, [jenis, jenis], (err, result) => {
            if (err) console.error("Error in addJenisBuku:", err);
            callback(err, result);
        });
    },

    addPenerbit: function(penerbit, alamat, callback) {
        const sql = 'INSERT INTO Penerbit (penerbit, alamatPenerbit) SELECT ?, ? WHERE NOT EXISTS (SELECT 1 FROM Penerbit WHERE penerbit = ?)';
        db.query(sql, [penerbit, alamat, penerbit], (err, result) => {
            if (err) console.error("Error in addPenerbit:", err);
            callback(err, result);
        });
    },

    createBook: function(book, callback) {
        const self = this;
        self.addJenisBuku(book.jenis, (err, result) => {
            if (err) return callback(err);

            const sqlJenis = 'SELECT idJenis FROM JenisBuku WHERE jenis = ?';
            db.query(sqlJenis, [book.jenis], (err, resultJenis) => {
                if (err) return callback(err);
                book.idJenis = resultJenis[0].idJenis;

                self.addPenerbit(book.penerbit, book.alamatPenerbit, (err, resultPenerbit) => {
                    if (err) return callback(err);

                    const sqlPenerbit = 'SELECT idPenerbit FROM Penerbit WHERE penerbit = ?';
                    db.query(sqlPenerbit, [book.penerbit], (err, resultPenerbit) => {
                        if (err) return callback(err);
                        book.idPenerbit = resultPenerbit[0].idPenerbit;

                        const sql = 'INSERT INTO Buku (judulBuku, tahun, idJenis, idPenerbit) VALUES (?, ?, ?, ?)';
                        db.query(sql, [book.judulBuku, book.tahun, book.idJenis, book.idPenerbit], (err, result) => {
                            if (err) console.error("Error in createBook:", err);
                            callback(err, result);
                        });
                    });
                });
            });
        });
    },

    updateBook: function(id, book, callback) {
        const self = this;

        self.addJenisBuku(book.jenis, (err, result) => {
            if (err) return callback(err);

            const sqlJenis = 'SELECT idJenis FROM JenisBuku WHERE jenis = ?';
            db.query(sqlJenis, [book.jenis], (err, resultJenis) => {
                if (err) return callback(err);
                book.idJenis = resultJenis[0].idJenis;

                self.addPenerbit(book.penerbit, book.alamatPenerbit, (err, resultPenerbit) => {
                    if (err) return callback(err);

                    const sqlPenerbit = 'SELECT idPenerbit FROM Penerbit WHERE penerbit = ?';
                    db.query(sqlPenerbit, [book.penerbit], (err, resultPenerbit) => {
                        if (err) return callback(err);
                        book.idPenerbit = resultPenerbit[0].idPenerbit;

                        const sql = 'UPDATE Buku SET judulBuku = ?, tahun = ?, idJenis = ?, idPenerbit = ? WHERE idBuku = ?';
                        db.query(sql, [book.judulBuku, book.tahun, book.idJenis, book.idPenerbit, id], (err, result) => {
                            if (err) console.error("Error in updateBook:", err);
                            callback(err, result);
                        });
                    });
                });
            });
        });
    },

    getAllBooks: (callback) => {
        const sql = `
            SELECT b.idBuku, b.judulBuku, b.tahun, j.jenis, p.penerbit, p.alamatPenerbit 
            FROM Buku b 
            JOIN JenisBuku j ON b.idJenis = j.idJenis 
            JOIN Penerbit p ON b.idPenerbit = p.idPenerbit`;
        db.query(sql, callback);
    },

    getBookById: (id, callback) => {
        const sql = `
            SELECT b.idBuku, b.judulBuku, b.tahun, j.jenis, p.penerbit, p.alamatPenerbit 
            FROM Buku b 
            JOIN JenisBuku j ON b.idJenis = j.idJenis 
            JOIN Penerbit p ON b.idPenerbit = p.idPenerbit 
            WHERE b.idBuku = ?`;
        db.query(sql, [id], callback);
    },

    deleteBook: (id, callback) => {
        const sql = 'DELETE FROM Buku WHERE idBuku = ?';
        db.query(sql, [id], (err, result) => {
            if (err) console.error("Error in deleteBook:", err);
            callback(err, result);
        });
    }
};

module.exports = Book;
