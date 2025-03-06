"use client"

import { Flag } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TaskPriority } from "@/lib/redux/features/taskSlice"

interface PriorityBadgeProps {
  priority: TaskPriority
  showLabel?: boolean
  size?: "sm" | "md" | "lg"
}

export default function PriorityBadge({ priority, showLabel = false, size = "md" }: PriorityBadgeProps) {
  if (!priority) return null

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-blue-500"
      default:
        return ""
    }
  }

  const getPriorityLabel = (priority: TaskPriority) => {
    switch (priority) {
      case "high":
        return "High"
      case "medium":
        return "Medium"
      case "low":
        return "Low"
      default:
        return ""
    }
  }

  const getIconSize = () => {
    switch (size) {
      case "sm":
        return "h-3 w-3"
      case "lg":
        return "h-5 w-5"
      default:
        return "h-4 w-4"
    }
  }

  return (
    <div className={cn("flex items-center", getPriorityColor(priority))}>
      <Flag className={cn(getIconSize(), "mr-1")} />
      {showLabel && <span className="text-sm">{getPriorityLabel(priority)}</span>}
    </div>
  )
}

