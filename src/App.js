import { useState, useEffect } from 'react';
import './App.css'

 const Cartas = (props) => {
   const [carta, setCarta] = useState([]);
   
  useEffect(() => {
    fetch("https://api.magicthegathering.io/v1/cards")
      .then((res) => res.json())
      .then((res) => {
        setCarta(res.cards);
        console.log(res.cards)
      });

  }, [props.code]);
   
   console.log(props.code)
   
   const buscaNombre = carta.filter(item => item.set === props.code)
   console.log(buscaNombre)
   const mostrarCarta = buscaNombre.map(element => {
     return (
       <div>
         <img src={element.imageUrl} alt={element.name} />
         <h4 className="img-carta ">{element.imageUrl}</h4>
         <p>{element.text}</p>
         <p>{element.set}</p>
       </div>
     )
   })  
 
   return <div>{ mostrarCarta }</div>
} 


function App() {
  const [data, setData] = useState([]);
  const [code, setCode] = useState("");

 useEffect(() => {
   fetch("https://api.magicthegathering.io/v1/sets")
     .then(res => res.json())
       .then(res => {
         setData(res.sets);
       });
 }, []);
  

    const handleChange = (e) => {
      setCode(e.target.value);
      console.log(e.target.value)
    };
  
  const options = data.map((option, index) =>
    <option key={index} value={option.code}>{option.name}</option >
  ); 

  return (
    <>
      <select onChange={handleChange}>{options}</select>
      <Cartas code={code}/>
    </>
  )
}

export default App;