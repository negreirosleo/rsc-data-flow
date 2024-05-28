'use client'

import { useFormStatus, useFormState } from 'react-dom'
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
import { useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'

export const CreatePost = () => {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [state, formAction] = useFormState(createPost, {
    data: undefined,
    error: { title: null, body: null }
  })

  useEffect(() => {
    if (state.data) {
      setOpen(false)
      toast({
        title: 'New post created'
      })
    }
  }, [state.data, toast])

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
        <form action={formAction} className="grid gap-4 py-4">
          <div className="items-center align gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input id="title" name="title" placeholder="Post title." className="col-span-3" />
          </div>
          {state.error?.title && <p className="text-red-700	align">{state.error.title}</p>}
          <div className="items-center gap-4">
            <Label htmlFor="body" className="text-right">
              Body
            </Label>
            <Textarea id="body" name="body" className="col-span-3" placeholder="Post content." />
          </div>
          {state.error?.body && <p className="text-red-700	align">{state.error.body}</p>}
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
