"use client"

import { useTodoStore } from '@/app/store/useTodoStore';
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react'

export default function EditTodoPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const todo = useTodoStore((state) => state.todos.find(t => t.id === id));
  const updateTodo = useTodoStore((state) => state.updateTodo)

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isMounted, setIsMounted] = useState(false)
  //기존 데이터로 폼 초기화
  useEffect(() => {
    setIsMounted(true)
    if (todo) {
      setTitle(todo.title)
      setDescription(todo.description)
    }
  }, [todo])
  if (!isMounted) return null;

  // React.FormEvent  ==> React.SubmitEvent<HTMLFormElement>
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;

    updateTodo(id, title, description)
    router.push(`/todos/${id}`)//수정 후 상세보기 페이지로 이동
  }
  return (
    <div>
      <header className='mb-6 pb-4 border-b'>
        <h1 className='text-2xl font-bold'>할 일 수정</h1>
      </header>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block text-sm font-medium mb-1'>제목 *</label>
          <input type='text' required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full border rounded-lg px-3 py-2
                   focus:outline-none  focus:border-blue-500' />

        </div>
        <div>
          <label className='block text-sm fon  mb-1'>상세 내용</label>
          <textarea rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            수정완료
          </button>
        </div>
      </form>
    </div>
  )
}
