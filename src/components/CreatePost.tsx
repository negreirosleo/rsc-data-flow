'use client'

import { useFormStatus } from 'react-dom'
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
import { createPost } from '@/actions/posts'
import { useState } from 'react'
import { useToast } from '@/components/ui/use-toast'

export const CreatePost = () => {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Create Post</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Post</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form
          action={async (data) => {
            await createPost(data)
            setOpen(false)
            toast({
              title: 'New post created'
            })
          }}
          className="grid gap-4 py-4"
        >
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
            <SubmitButton />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const SubmitButton = () => {
  const { pending } = useFormStatus()

  return <Button type="submit">{pending ? 'Saving...' : 'Create Post'}</Button>
}
