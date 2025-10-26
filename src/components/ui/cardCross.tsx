import * as React from "react"

import { cn } from "@/lib/utils"

// Componente de cruz centrada
const Cross = ({ className }: { className?: string }) => (
  <div className={cn("absolute w-2 h-2 pointer-events-none", className)}>
    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-current -translate-y-1/2" />
    <div className="absolute left-1/2 top-0 h-full w-[1px] bg-current -translate-x-1/2" />
  </div>
)

type CardProps = React.ComponentProps<"div"> & {
  containerClassName?: string
}

function CardCross({ className, containerClassName, children, ...props }: CardProps) {
  return (
    <div className={cn(containerClassName)}>
      <div
        data-slot="card"
        className={cn(
          "bg-card text-card-foreground relative flex h-full flex-col gap-6 rounded-xl border py-6 shadow-sm",
          className
        )}
        {...props}
      >
        {/* Cruces decorativas en las 4 esquinas */}
        <Cross className="-top-[4px] -left-[4px]" />
        <Cross className="-top-[4px] -right-[4px]" />
        <Cross className="-bottom-[4px] -left-[4px]" />
        <Cross className="-bottom-[4px] -right-[4px]" />

        {children}
      </div>
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />

  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  CardCross,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
