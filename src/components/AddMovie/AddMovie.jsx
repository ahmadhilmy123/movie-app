import { useState } from "react";
import Alert from "../Alert/Alert";
import styles from "./Addmovie.module.css";
import Movies from "../Movies/Movies";

function AddMovieForm(props) {
    // Menggunakan object untuk form data
    const [formData, setFormData] = useState({
        title: "",
        date: "",
    });

    // Tugas frontend pertemuan 9 tugas 3 yaitu: 
    // 1.Problem: 1 error 1 state.
    // 2.Refactor multiple error to use one state.
    // 3.Gunakan object.
    // 4.Gunakan spread operator.

    // gunakan problem: 1 error 1 state Refactor: gunakan satu object
    const [errors, setErrors] = useState({});

    const { movies, setMovies } = props;

    function handleChange(e) {
        const { name, value } = e.target;

        // Gunakan spread operator untuk update formData
        setFormData({
            ...formData,
            [name]: value,
        });

        // Bersihkan error field terkait saat mengetik
        setErrors({
            ...errors,
            [name]: "",
        });
    }

    const { title, date } = formData;

    function validate() {
        const newErrors = {};

        // Gunakan object untuk menyimpan banyak error
        if (!title) newErrors.title = "Title wajib diisi";
        if (!date) newErrors.date = "Year wajib diisi";

        setErrors(newErrors);

        // Jika tidak ada error, return true
        return Object.keys(newErrors).length === 0;
    }

    function addMovie() {
        const movie = {
            id: "xyz",
            title: title,
            year: date,
            type: "Movie",
            poster: "https://picsum.photos/200/300?grayscale"
        };
        setMovies([...movies, movie]);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (validate()) {
            addMovie();
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <input
                    className={styles.input_form}
                    id="title"
                    type="text"
                    value={title}
                    name="title"
                    placeholder="Title"
                    onChange={handleChange}
                />
                {errors.title && <Alert>{errors.title}</Alert>}

                <input
                    className={styles.input_form}
                    id="date"
                    type="text"
                    value={date}
                    name="date"
                    placeholder="Year"
                    onChange={handleChange}
                />
                {errors.date && <Alert>{errors.date}</Alert>}

                <button className={styles.button_form}>Add Movie</button>
            </form>
        </div>
    );
}

export default AddMovieForm;
