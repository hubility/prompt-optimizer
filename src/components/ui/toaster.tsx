'use client';

import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <ToastPrimitives.Provider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} onOpenChange={(open) => !open && dismiss(id)} {...props}>
            <div className="grid gap-1">
              {title ? <ToastTitle>{title}</ToastTitle> : null}
              {description ? <ToastDescription>{description}</ToastDescription> : null}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastPrimitives.Provider>
  );
}
