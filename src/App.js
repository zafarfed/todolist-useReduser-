import './App.css';
import {useReducer, useState} from 'react'

function App() {

  const [name, setName] = useState('')

const firstFunction = (state, action)=>{

  switch (action.type) {
    case 'delete' : return state.data.filter((value)=>value.id !== action.payload.disId)
    case 'add' : return [ ...state, {
      id:state.data.length +1,
      name:action.payload.title 
    }]
    case 'edit': return {...state,
       select: state.select = action.payload.mock.id,
      title:state.title = action.payload.mock.name
      } 
    case 'anyWord' : return {...state, title: state.title = action.payload.write}
    case 'save' : return {data : state.data.map((item)=> item.id == state.select ? {...item, name: state.title}: item)}
  }
}
const [state, dispatch] = useReducer(firstFunction, {
  data:[
    {id:1, name:'Zafar'},
    {id:2, name:'Nodir'},
    {id:3, name:'Jahongir'},
    {id:4, name:'Asad'},
  ],
  
  select:null,
  title:''
})
console.log(state.title);

  return (
    <div>

      <input type={'text'} onChange={(e)=>setName(e.target.value)}/>
      <button onClick={()=>dispatch({type:'add', payload:{title:name}})}>Add</button>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
      {state.data.map((item, index)=> {return(
        <tr key={index}>
        <td>{item.id}</td>
        <td>{state.select == item.id ? <input type={'text'} value={state.title} onChange={(e)=>dispatch({type: 'anyWord',
         payload :{write: e.target.value}})}/> : item.name}</td>
        <td>
          <button onClick={()=> dispatch({type:'delete', payload:{disId: item.id}})}>X</button>
          {
            state.select ==  item.id ?
            <button onClick={()=> dispatch({type:'save'})}>save</button>
            :
            <button onClick={()=> dispatch({type:'edit', payload:{mock: item}})}>edit</button>
          }
        </td>
      </tr>
      )})}
          
        </tbody>
      </table>
    </div>
  );
}

export default App;
