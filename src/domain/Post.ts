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
  let errorMessage = ''

  if (!newPost.title) {
    errorMessage = 'Title is required.'
  }

  if (!newPost.body) {
    errorMessage = `${errorMessage} Body is required.`
  }

  if(errorMessage) {
    return { success: false, message: errorMessage }
  }

  return { success: true, message: errorMessage }
}