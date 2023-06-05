import axios from 'axios'

export const callPost = async (url, data)=>{
    try {
        const response = await axios.post("http://localhost:3001/" + url, data);
        
        if (response.status === 200) {
          // La requête a été traitée avec succès
          return response.data;
        } else {
          // La requête a échoué avec un statut autre que 200
          throw new Error("Request failed with status: " + response.status);
        }
      } catch (error) {
        // Une erreur s'est produite lors de la requête
        throw new Error("Request failed: " + error.message);
      }
}