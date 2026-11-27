"use client"

import { useTodoStore } from '@/app/store/useTodoStore';
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { Suspense } from 'react'

function TodoDetailContent() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string

  const todo = useTodoStore((state)=>state.todos.find(t=>t.id === id));
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state)=>state.deleteTodo);
 


  if(!todo){
    return(
      <div className='text-center py-10'>
        <p className='text-gray-500 mb-4'>할 일을 찾을 수 없습니다.</p>
        <Link href='/' className='text-blue-500 underline'>목록으로 돌아가기</Link>
      </div>
    )
  }

  const handleDelete = ()=>{
    deleteTodo(todo.id)
    router.push('/') ;// 삭제 후 목록으로 이동
  }

  return (
    <div>
      <header className='flex justify-between items-center mb-6 pb-4 border-b'>
        <Link href="/"
              className='text-sm text-gray-500 hover:text-gray-800'>목록으로</Link>
        <span className='text-xs text-gray-400'>작성일 :{todo?.createAt}</span>
      </header>
      <div className='space-y-4 mb-8'>
        <div className='flex items-center gap-3'>
          <span
           className={`px-2 py-1 text-xs rounded-full font-medium 
              todo.completed ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700 " }` } >
           {todo?.completed ? '완료됨' : '진행 중'}</span>
          <h1 className='text-2xl font-bold'> {todo?.title} </h1>
        </div>

        <div className='bg-gray-50 p-4 rounded-lg min-h-[120-px] 
            whitespace-pre-wrap text-gray-700'>
          {todo?.description || '작성된 상세 내용이 없습니다.'}
        </div>
      </div>  

      <div className='flex justify-between pt-4 border-t'>
          <button 
          onClick={()=>toggleTodo(todo.id)}
          className='px-4 py-2 border border-blue-500 text-blue-500  rounded-lg
           hover:bg-blue-600'>
            {todo?.completed ? "진행 중으로 변경" : "완료로 표시"}</button>

          <div className='flex gap-2'> 
              <Link href={`/todos/${todo.id}/edit`}
                className='px-4 py-2 bg-gray-600 text-white rounded-lg
                hover:bg-gray-700 text-sm font-medium'>수정하기</Link>
              <button
               onClick={handleDelete}
              className='px-4 py-2 bg-red-500 text-white rounded-lg
              hover:bg-red-600'>삭제하기</button>
          </div>
      
      </div>
    </div>
  )
}

export default function TodoDetailPage() {
  return (
    <Suspense fallback={<div className='text-center py-10 text-gray-500'>불러오는 중...</div>}>
      <TodoDetailContent />
    </Suspense>
  );
}
