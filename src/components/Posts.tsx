import { Post } from '@/domain/Post'

export const Posts = ({ posts }: { posts: Array<Post> }) => {
  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <div className="w-96 p-8 border border-black border-solid rounded" key={post.id}>
          <h2 className="mb-4">
            <span className="font-bold">Title:</span> {post.title}
          </h2>
          <p>{post.body}</p>
          <p>{post.views} views</p>
        </div>
      ))}
    </div>
  )
}
