import { useState,useEffect } from "react"
import { db } from "../data/db"
import { useMemo } from "react"

export const useCart = () => {

      const initialCart = () => {
          const localStorageCart= localStorage.getItem('cart')
          return localStorageCart ? JSON.parse(localStorageCart) : []
        }
    
        const [data] = useState(db)//* el valor inicial de este useState es db(es nuestra base de datos)
        const [cart, setCart] = useState(initialCart)//* Cambia el valor de cart a un array vacio */
    
    
        const MAX_ITEMS= 5;
        const MIN_ITEMS=1;
    
        useEffect(()=>{
          localStorage.setItem('cart',JSON.stringify(cart))
        },[cart])
    
       
    
       function addToCart(item){
          const itemExists= cart.findIndex((guitar)=>guitar.id ===item.id)
          if(itemExists >=0){// si existe en el carrito entonces 
            if(cart[itemExists].quantity>=MAX_ITEMS) return;
            const updateCart = [...cart]
            updateCart[itemExists].quantity++; 
            setCart(updateCart)
    
    
          }else{
            console.log("agregando nuevo carrito")
            item.quantity=1 // estoy agregando una nueva propiedad quantity al objeto item(guitar)
            setCart([...cart,item]) // lo guardo en mi useState cart(carrito)
        
            
          }
            
        }
    
        function removeFromCart(id){
    
          setCart(prevCart => prevCart.filter(guitar=>guitar.id!== id))
    
        }
    
        function increaseQuantity(id){
          const updatedCart = cart.map(item=>{
            if(item.id=== id && item.quantity<MAX_ITEMS){
              return{
                ...item, // hago una copia de mi guitarra 
                quantity: item.quantity + 1 // luego le digo a js que modifique quantity sobre esa copia  pd: para esta instruccion siempre debo usar spread opartar (...)
              }   
            }
             return item
    
          })
          
          setCart(updatedCart)
        }
    
        function decreaseQuantity(id){
    
          console.log('decrementando' + id)
          const updateCart = cart.map(item=>{
            if(item.id===id && item.quantity > MIN_ITEMS){
              return{
                ...item,
                quantity: item.quantity - 1
              }  
            }
            
            return item
          })
    
          setCart(updateCart)
          
        }
    
        function clearCart(){
          setCart([])
    
        }

        const isEmpty = useMemo(() => cart.length === 0,[cart])
        
        const cartTotal =useMemo(() => cart.reduce((total,item)=> total + (item.quantity * item.price), 0),[cart])//Uso de useMemo aunque aveces no es neceario puede servir en algunas ocaciones en terminos de performance pd: En este caso no es necesario usarlo

        return{

            data,
            cart,
            addToCart,
            removeFromCart,
            decreaseQuantity,
            increaseQuantity,
            clearCart,
            isEmpty,
            cartTotal


        }


}



