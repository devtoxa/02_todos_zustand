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

     addTodo : () =>set(()=>({

     })),  //addTodo

     updateTodo : () =>set(()=>({

     })),
     toggleTodo : () =>set(()=>({

     })),
     deleteTodo : () =>set(()=>({

     })),
   }),
   {
     name : 'nextjs-todos-zustand'  // localStorage에 저장될 키 이름
   }
  )  //persist
)  //create