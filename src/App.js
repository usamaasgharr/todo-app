import React, { useEffect } from 'react'
import image from "./images/todo.png"
import  "./index.css"

 export default function App(){
  

  const [text, setText]= React.useState("");
  const [items , setItems] = React.useState(getLocalStorage())
  const [toggle, setToggle] = React.useState(false);
  const [editItems, setEditItems]= React.useState("");
  
// adding item
  function addItem(){
    
    if(!text){
      alert("Please fill out the input Feild")
    }else if(toggle && text){
      setItems(
        items.map(curElem =>{
        if(curElem.id === editItems){
          return{...curElem, name:text}
        }
        return curElem

      }))
      setToggle(false)
    }
    else{
      const obj ={
        id: new Date().getTime().toString(),
        name: text
      }
      setItems(prevDate =>[
        ...items,
        obj
      ]);
    }
  }

  // Delete Item
  function deleteItem(id){
   const updatedItems = items.filter((curElem)=>{
    return curElem.id !== id;
   }) 
   setItems(updatedItems)
   setToggle(false)
  }

  // edit Item
  function editItem(id) {
    const item = items.find((item)=>{
      return item.id ===  id;
    })
    document.getElementById("input").innerText = item.name;
    setText(item.name)
    setEditItems(id)
    setToggle(true);
  } 

  // local storage
  useEffect(()=>{
    localStorage.setItem( "todoList", JSON.stringify(items))
  }, [items])

  // get Data from Local Storae
  function getLocalStorage(){
    const list = localStorage.getItem("todoList")
    if(list){
      return JSON.parse(list)
    }else{
      return [];
    }
  }

 
  function removeItems(){
    const list = localStorage.getItem("todoList")
    if(JSON.parse(list).length > 0){
      setItems([])
      setEditItems(false)
      alert("ITEMS REMOVED")
    }else{
      alert("NOTHING IN LIST")
    }
    
  }


  return (
       <div className="center">
        
        <div>
        <img className='image' src ={image} alt = "image-todo" />
          <h1>Add your list here</h1>
          <input onChange={(e)=>{setText(e.target.value)} } value = {text} type="text" id='input' placeholder='Add Item..'/>
          
          {toggle? <button onClick={addItem} className="fa-solid fa-pen-to-square success"></button>: <button onClick={addItem}>+</button>}
        </div>
       
        {/* /* show Items */ }
        {items.map((item)=>{
          return(
            
        <div className='list' key={item.id}>
          <p>{item.name}</p>
          <div>
              <i className="fa-solid fa-pen-to-square success" onClick={()=>{editItem(item.id)}}></i>
              <i className="fa-regular fa-trash-can danger" onClick={()=>{deleteItem(item.id)}}></i>
          </div>
        </div>
       
          )
        })}
         
        <div className='remove-btn-div'>
          <button onClick={()=>{removeItems()}}>Remove List</button>
        </div>
       </div>
  )
}

