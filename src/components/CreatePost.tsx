import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { revalidateTag } from 'next/cache'

export const CreatePost = () => {
  async function createPost(formData: FormData) {
    'use server'

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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Post</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Post</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form action={createPost} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center align gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" name="title" placeholder="Post title." className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="body" className="text-right">
              Body
            </Label>
            <Textarea id="body" name="body" className="col-span-3" placeholder="Post content." />
          </div>
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <DialogClose asChild>
              <Button type="submit">Create Post</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
