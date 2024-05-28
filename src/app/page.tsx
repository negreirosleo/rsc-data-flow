import { Posts } from '@/components/Posts'
import { Post } from '@/domain/Post'
import { CreatePost } from '@/components/CreatePost'

const getPosts = async () => {
  const response = await fetch('http://localhost:3000/posts')

  const posts = await response.json()

  return posts as Array<Post>
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-16">
      <h1 className="text-3xl">All Posts</h1>
      <CreatePost />
      <Posts posts={posts} />
    </main>
  )
}
