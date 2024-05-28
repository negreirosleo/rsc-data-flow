'use client'

import { Post } from '@/domain/Post'
import { CreatePost } from '@/components/CreatePost'
import { useCallback, useOptimistic } from 'react'

export const Posts = ({ posts }: { posts: Array<Post> }) => {
  const [optimisticPosts, optimisticAction] = useOptimistic(
    posts,
    (state, action: { type: string; payload: Post }) => {
      switch (action.type) {
        case 'create':
          return [...state, action.payload]
        default:
          return state
      }
    }
  )

  const addPost = useCallback(
    (payload: Post) => optimisticAction({ type: 'create', payload }),
    [optimisticAction]
  )

  return (
    <>
      <CreatePost addPost={addPost} postCount={optimisticPosts.length} />

      <div className="flex flex-col gap-4">
        {optimisticPosts.map((post) => (
          <div className="w-96 p-8 border border-black border-solid rounded" key={post.id}>
            <h2 className="mb-4">
              <span className="font-bold">Title:</span> {post.title}
            </h2>
            <p>{post.body}</p>
            <p>{post.views} views</p>
          </div>
        ))}
      </div>
    </>
  )
}
