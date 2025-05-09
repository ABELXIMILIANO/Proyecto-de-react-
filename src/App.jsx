import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { useState } from "react"
import { db } from "./data/db"



function App(){

    const [data, setData] = useState(db)//* el valor inicial de este useState es db(es nuestra base de datos)
    const [cart, setCart] = useState([])//* Cambia el valor de cart a un array vacio */

   function addToCart(item){
      const itemExists= cart.findIndex((guitar)=>guitar.id ===item.id)
      if(itemExists >=0){ //existe en el carrito
        item.quantity= item.quantity+1;
        

      }else{
        console.log("agregando nuevo carrito")
        item.quantity=1 // estoy agregando una nueva propiedad quantity al objeto item(guitar)
        setCart(prevCart=>[...prevCart,item]) // lo guardo en mi useState cart(carrito)
    
        
      }
        
    }

     

    
    
  return (
    <>
      
    <Header/>
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {
                data.map((guitar)=>(

                    <Guitar
                        key={guitar.id} 
                        guitar={guitar}
                        addToCart={addToCart}
                        
                       
                    />
                        
                    )
                )
            }
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>     
    </>
  )
  
}

export default App