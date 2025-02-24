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
