'use server'
import { revalidateTag } from 'next/cache'


export async function createPost(formData: FormData) {
  const rawFormData = {
    title: formData.get('title'),
    body: formData.get('body'),
    views: 0
  }

  const response = await fetch('http://localhost:3000/posts', {
    method: 'POST',
    body: JSON.stringify(rawFormData),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })

  revalidateTag('posts')

  await new Promise((resolve) => setTimeout(resolve, 3000))

  const data = await response.json()

  return data
}