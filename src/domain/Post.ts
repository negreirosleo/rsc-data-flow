export type Post = {
  id: string
  title: string
  body: string
  views: number
}

type PostIntent = {
  title: FormDataEntryValue | null;
  body: FormDataEntryValue | null;
  views: number;
}

export const validatePost = (newPost: PostIntent) => {
  const errors: {
    title: string | null
    body: string | null
  } = {
    title: null,
    body: null
  }

  if (!newPost.title) {
    errors.title = 'Title is required.'
  }

  if (!newPost.body) {
    errors.body = 'Body is required.'
  }

  return errors
}