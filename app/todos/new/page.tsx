"use client"


import { useTodoStore } from '@/app/store/useTodoStore';
import Link from 'next/link'
import { useRouter } from 'next/navigation';

import React, { useState } from 'react'

export default function NewTodoPage() {
  const router = useRouter();
  const addTodo = useTodoStore((state)=>state.addTodo)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

   // React.FormEvent  ==> React.SubmitEvent<HTMLFormElement>
  const handleSubmit = (e:React.SubmitEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(!title.trim()) return;
    
    addTodo(title,description )
    setTitle('')
    setDescription('')
    router.push('/')//저장 후 전체보기 페이지로 이동
  }
  return (
    <div>
     <header className='mb-6 pb-4 border-b'>
        <h1 className='text-2xl font-bold'>새 할 일 추가</h1>
     </header> 

     <form onSubmit ={handleSubmit} className='space-y-4'>
      <div>
        <label className='block text-sm font-medium mb-1'>제목 *</label>
        <input type='text' required
               value={title}
               onChange={(e)=>setTitle(e.target.value)}
               placeholder='할 일 제목 입력' 
               className='w-full border rounded-lg px-3 py-2
                   focus:outline-none  focus:border-blue-500' />

      </div>
      <div>
        <label className='block text-sm fon  mb-1'>상세 내용</label>
        <textarea  rows={4}
                   value={description}
                   onChange={(e)=>setDescription(e.target.value)}
                   placeholder='세부내용 입력(선택)'
                   className='w-full border rounded-lg px-3 py-2 
                            focus:outline-none  focus:border-blue-500'  />
        
      </div>
      <div className='flex justify-end gap-2 pt-4'>
        <Link href='/'
        className='px-4 py-2 border rounded-lg text-gray-600
           hover:bg-gray-100'>
            취소
        </Link>
        <button type='submit'
        className='px-4 py-2 bg-blue-500 text-white rounded-lg
           hover:bg-blue-600'>
          저장하기
        </button>
      </div>
     </form>
    </div>
  )
}
