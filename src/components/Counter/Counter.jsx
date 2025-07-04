import { useEffect, useState } from "react";

function Counter() {
    const [angka, setAngka] = useState(0); // Menyimpan angka

    function addAngka() {
        setAngka(angka + 1); // Langsung gunakan angka
    }

    useEffect(() => {
        console.log("Lifecycle: component mount/update");
        document.title = `Result: ${angka}`; // Gunakan backtick (`) agar template literal berfungsi
    }, [angka]); // Jalankan effect saat angka berubah

    console.log("Lifecycle: component render");

    return (
        <div>
            <p>Result: {angka}</p>
            <button onClick={addAngka}>Adddd</button>
        </div>
    );
}

export default Counter;
