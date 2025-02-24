// Importazione degli hook di React e della libreria Axios
import { useState, useEffect } from "react";
import axios from "axios";

// Stato iniziale del form per l'aggiunta di un nuovo post
const initialFormData = {
    title: "",
    content: "",
    image: "",
    tags: [],  // Array di tag separati da virgole
    // published: false, // Opzione per indicare se il post è pubblicato (attualmente commentata)
};

const PostForm = () => {

    // Stato per memorizzare la lista dei post esistenti
    const [posts, setPosts] = useState([]);

    // Stato per gestire i dati inseriti nel form
    const [formData, setFormData] = useState(initialFormData);

    // Funzione per recuperare i post dal server tramite una richiesta GET
    function fetchPosts() {
        axios.get("http://localhost:3000/posts")
            .then((res) => {
                // Aggiorniamo lo stato con i dati ricevuti dall'API
                setPosts(res.data);
            })
            .catch((error) => {
                console.log(error); // Gestione degli errori nella console
            });
    }
}