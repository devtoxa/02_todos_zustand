"use client"
import Link from "next/link";
import { useState } from "react";
import { useTodoStore } from "./store/useTodoStore";

export default function Home() {
  const todos = useTodoStore((state)=>state.todos);
  const toggleTodo = useTodoStore((state) =>state.toggleTodo);

  const [searchQuery, setSearchQuery] = useState('')
  //제목, 상세 내용에 검색어가 포함된 할 일 필터링
  const filteredTodos = todos.filter((todo)=>{
    const query = searchQuery.toLowerCase();
    return(
      todo.title.toLowerCase().includes(query) ||
      todo.description.toLowerCase().includes(query)
    )
  })
  return (
    <div>
      <header className="flex justify-between items-center mb-6 pb-4 border-b">
        <h1 className="text-2xl font-bold">전체 할 일</h1>
        <Link href="/todos/new"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm 
        font-medium hover:bg-blue-600 transition"> 
          + 새 할 일 추가
        </Link>
      </header>
      {/* 검색 영역 */}
      <div className="relative mb-6">
        <input  type="text"
                value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)}
                placeholder="제목 또는 상세내용으로 검색"
                className="w-full border border-gray-300 rounded-lg pl-4 pr-10
                      py-2 text-sm focus:outline-none focus:border-blue-500"
        />
        {
          searchQuery && (
           <button 
           onClick={()=>setSearchQuery('')}
           className="absolute right-3 top-1/2 -translate-y-1/2 
           text-gray-400 hover:text-gray-600 text-xs" aria-label="검색어 초기화">
            X
            </button>
          )
       }
      </div>
    {
        todos.length === 0 ? (
          <p className="text-center text-gray-400 py-10">
            등록된 할 일이 없습니다. 새 할 일을 추가하세요
          </p>
        ) : filteredTodos.length === 0 ?(
          <p className="text-center text-gray-400 py-10">{searchQuery}에 대한 검색 결과가 없습니다.</p>
        ):  
        (
          <ul className="space-y-3">
            {
              filteredTodos.map((todo)=>(
                <li key={todo.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transiton">
                 <div className="flex items-center gap-3 flex-1">     
                    <input type="checkbox" 
                           checked={todo.completed}
                           onChange={()=>toggleTodo(todo.id)}
                          className="w-5 h-5 accent-blue-500 coursor-pointer"/>
                    {/* 제목 클릭 시 상세보기 페이지로 이동 */}
                    <Link href={`/todos/${todo.id}`}
                      className={`flex-1 font-medium 
                        ${todo.completed ? 'line-through text-gray-400'
                              : 'text-gray-800 hover:text-blue-600'}`}
                    >{todo.title}</Link>
                 </div>
                 <span className="text-xs text-gray-400">{todo.createAt}</span>
                </li>
              ))
            }
          </ul> 
        )
      }
    </div>
  );
}
