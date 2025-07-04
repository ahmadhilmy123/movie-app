import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Heading from '../components/UI/Typography/Heading';
import Paragraph from '../components/UI/Typography/Paragraph';

function CreateMovie() {
  return (
    <>
      <Navbar />
        <Heading level={2}>Create Movie</Heading>
         <Paragraph>
        Gunakan formulir di bawah ini untuk menambahkan film baru ke daftar.
      </Paragraph>
      <Footer />
    </>
  );
}

export default CreateMovie;