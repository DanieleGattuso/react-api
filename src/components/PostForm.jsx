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

// Effetto che esegue la funzione fetchPosts solo al primo rendering del componente
useEffect(fetchPosts, []);

// Funzione per aggiornare lo stato formData quando l'utente digita nei campi del form
function handleFormData(e) {
    // Se il campo è "tags", lo trasformiamo in un array separato da virgole
    const value = e.target.name === "tags" ? e.target.value.split(",") : e.target.value;



    // Aggiorniamo il formData con i nuovi valori
    setFormData((currentFormData) => ({
        ...currentFormData,
        [e.target.name]: value,
    }));
}

// Funzione per gestire l'invio del form e aggiungere un nuovo post
function handleSubmit(e) {
    e.preventDefault(); // Previene il comportamento predefinito del form (refresh della pagina)

    // Effettuiamo una richiesta POST per aggiungere un nuovo post
    axios.post("http://localhost:3000/posts", formData)
        .then(res => {
            // Aggiorniamo la lista dei post con il nuovo post restituito dall'API
            setPosts((currentPosts) => [...currentPosts, res.data]);
        })
        .catch(err => console.log(err));

    // Resettiamo il form dopo l'invio
    setFormData(initialFormData);
}

// Funzione per eliminare un post
function deletePost(idPost) {
    // Filtriamo la lista dei post per escludere quello con l'ID corrispondente
    const updatePost = posts.filter((post) => post.id !== idPost);

    // Effettuiamo una richiesta DELETE per rimuovere il post dal database
    axios.delete(`http://localhost:3000/posts/${idPost}`)
        .then(res => {
            // Aggiorniamo lo stato con la lista filtrata
            setPosts(updatePost);
        })
        .catch(err => console.log(err));
}

// Contenuto del componente
return (
    <>
        {/* Form per l'aggiunta di un nuovo post */}
        <form id="formPost" action="#" onSubmit={handleSubmit}>
            {/* Campo per il titolo */}
            <input
                type="text"
                name="title"
                onChange={handleFormData}
                value={formData.title}
                placeholder="Inserisci titolo post"
            />

            {/* Campo per il contenuto del post */}
            <textarea
                name="content"
                onChange={handleFormData}
                value={formData.content}
                placeholder="Contenuto post"
            ></textarea>

            {/* Campo per l'immagine del post */}
            <input
                type="text"
                name="image"
                onChange={handleFormData}
                value={formData.image}
                placeholder="URL immagine post"
            />

            {/* Campo per i tag del post */}
            <input
                type="text"
                name="tags"
                onChange={handleFormData}
                value={formData.tags}
                placeholder="Tag (separati da virgole)"
            />



            {/* Pulsante per inviare il form */}
            <button className="addButton">Aggiungi</button>
        </form>

        {/* Sezione che mostra i post esistenti */}
        <div className="containerPost">
            {posts.map((post) => (
                <div className="postItem" key={post.id}>
                    <h2>{post.title}</h2>
                    {/* <h3>{post.autore}</h3> */}
                    <p className="contenuto">{post.content}</p>
                    {/* Visualizzazione dell'immagine */}
                    <img src={post.image} alt={post.title} />
                    {/* Visualizzazione dei tag separati da virgole */}
                    <p>{post.tags.join(', ')}</p>


                    {/* Pulsante per eliminare il post */}
                    <button className="deleteButton" onClick={() => deletePost(post.id)}>Cancella</button>
                </div>
            ))}
        </div>
    </>
);


// Esportazione del componente per l'uso in altri file
export default PostForm;
