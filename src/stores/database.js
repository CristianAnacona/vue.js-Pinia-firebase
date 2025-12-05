import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from 'firebase/firestore/lite'
import {defineStore} from 'pinia'
import { db } from '../../firebasdeConfig'
import { ref } from 'vue'

export const useDatabaseStore = defineStore('database', () => {
    const documents = ref([]);
    const loadingDoc = ref(false);
    //metodo para obtener los productos
    const getProducts = async () => {
        loadingDoc.value = true
        try {
           const q = query  (collection(db, 'productos'))
           const querySnapshot = await getDocs(q)
           documents.value = []//limpiar
           querySnapshot.forEach((doc) => {
           documents.value.push({
               id: doc.id,
               ...doc.data()    
           })
            })
           console.log(documents.value)
        } catch (error) {
           console.log(error) 
        }finally {
            loadingDoc.value = false
        }
    }
    //metodo para agregar un producto
    const addProduct = async (product) => {
        try {
            const objectDoc = {
                nombre: product.nombre,
                valor: product.valor
            }
            const docRef =await addDoc(collection(db, 'productos'), objectDoc)
            documents.value.push({
                ...objectDoc,
                id: docRef.id
            })
        } catch (error) {
            console.log(error)
        }
    }

    //eliminar un producto
    const deleteProduct = async (id) => {
        try {
            const docRef = doc(db, 'productos', id)
            await deleteDoc(docRef);
            documents.value = documents.value.filter(doc => doc.id !== id)
        } catch (error) {
            console.log(error)
        }
    }

    //editar un producto
    const updateProduct = async (productId, productData) => {
    try {
        const docRef = doc(db, 'productos', productId);
        await updateDoc(docRef, {
            nombre: productData.nombre,
            valor: productData.valor
        });
     // Actualizar el array local también
        const index = documents.value.findIndex(p => p.id === productId);
        if (index !== -1) {
            documents.value[index] = {
                id: productId,
                ...productData
            };
        }
    console.log('Producto actualizado exitosamente');
    } catch (error) {
        console.error('Error al actualizar:', error);
        throw error;
    }
}


    return {
        documents,
        getProducts,
        loadingDoc,
        addProduct,
        deleteProduct,
        updateProduct
    }
})