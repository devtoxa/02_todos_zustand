import { stat } from "fs"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Todo {
  id: string,
  title :string,
  description : string,
  completed : boolean,
  createAt : string
}
interface TodoState {
  todos : Todo[],
  addTodo :(title : string, description :string) => void , 
  updateTodo : (id : string, title :string, description:string) => void , 
  toggleTodo : (id: string) => void , 
  deleteTodo : (id:string) => void , 
}

export const useTodoStore = create<TodoState>()(
  persist((set)=>({   // 새로고침해도 내용 유지 : persist
     todos : [],

     addTodo : (title,description) =>set((state)=>({
      todos : [
                {
                  id: Date.now().toString(),
                  title,
                  description,
                  completed : false,
                  createAt : new Date().toLocaleDateString('ko-KR')
                },
                ...state.todos
     ]


     })),  //addTodo

     updateTodo : (id, title, description) =>set((state)=>({
      todos : state.todos.map((todo)=>
            todo.id === id ? {...todo, title, description} : todo)
     })),
     toggleTodo : (id) =>set((state)=>({
      todos : state.todos.map((todo)=> todo.id === id 
        ?  {...todo, completed : !todo.completed} 
        : todo)
     })),
     deleteTodo : (id) =>set((state)=>({
         todos : state.todos.filter((todo)=>todo.id !==id)
     })),
   }),
   {
     name : 'nextjs-todos-zustand'  // localStorage에 저장될 키 이름
   }
  )  //persist
)  //create