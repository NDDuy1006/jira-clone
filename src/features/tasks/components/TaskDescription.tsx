import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { DottedSeparator } from "@/components/DottedSeparator"
import { PencilIcon, XIcon } from "lucide-react";
import { useEffect, useState } from 'react'
import { useUpdateTask } from "../api/useUpdateTask";

interface TaskDescriptionProps {
  description?: string
  id: string
}

export const TaskDescription = ({ description, id }: TaskDescriptionProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(description)
  const { mutate, isPending } = useUpdateTask()

  useEffect(() => {
    setValue(description);
  }, [description]);
  
  
  const handleSave = () => {
    mutate({
      json: { description: value },
      param: { taskId: id }
    }, {
      onSuccess: () => {
        setIsEditing(false)
      }
    })
  }
  
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Task Description</p>
        <Button
          onClick={() => setIsEditing((prev) => !prev)}
          size="sm"
          variant="secondary"
        >
          {isEditing ? (
            <XIcon className="size-4 mr-2"/>
          ): (
            <PencilIcon className="size-4 mr-2" />
          )}
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>
      <DottedSeparator className="my-4" />
      {isEditing ? (
        <div className="flex flex-col gap-y-4">
          <Textarea
            placeholder="Add a description..."
            value={value}
            rows={4}
            onChange={(e) => setValue(e.target.value)}
            disabled={isPending}
          />
          <Button
            size="sm"
            className="w-fit ml-auto"
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      ): (
        <div>
          {value || (
            <span className="text-muted-foreground">
              No description
            </span>
          )}
          <div> 
          </div>
        </div>
      )}
    </div>
  )
}
