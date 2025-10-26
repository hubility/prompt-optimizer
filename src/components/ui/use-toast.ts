'use client';

import * as React from "react";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000;

type ToasterToast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  duration?: number;
  variant?: "default" | "destructive";
};

type Toast = ToasterToast;

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const toastQueue: ToasterToast[] = [];
let listeners: Array<(toasts: Toast[]) => void> = [];
let toasts: Toast[] = [];

function runToastQueue() {
  if (toastQueue.length === 0) {
    return;
  }

  if (toasts.length >= TOAST_LIMIT) {
    return;
  }

  const toast = toastQueue.shift();
  if (!toast) {
    return;
  }

  toasts = [...toasts, toast];
  notify();
}

function notify() {
  listeners.forEach((listener) => {
    listener(toasts);
  });
}

export function dispatchToast(toast: ToasterToast) {
  const id = toast.id ?? Math.random().toString(36).slice(2);

  toastQueue.push({
    ...toast,
    id,
  });

  runToastQueue();

  return {
    id,
    dismiss: () => dismissToast(id),
  };
}

export function dismissToast(id: string) {
  if (id === undefined) return;

  toastTimeouts.set(
    id,
    setTimeout(() => {
      toastTimeouts.delete(id);
      toasts = toasts.filter((toast) => toast.id !== id);
      notify();
      runToastQueue();
    }, TOAST_REMOVE_DELAY)
  );
}

export function useToast() {
  const [state, setState] = React.useState<Toast[]>(toasts);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      listeners = listeners.filter((listener) => listener !== setState);
    };
  }, []);

  const toast = React.useCallback(
    ({ title, description, ...props }: Omit<ToasterToast, "id">) => {
      return dispatchToast({
        id: Math.random().toString(36).slice(2),
        title,
        description,
        ...props,
      });
    },
    []
  );

  const dismiss = React.useCallback((id: string) => dismissToast(id), []);

  return {
    toasts: state,
    toast,
    dismiss,
  };
}

export type { Toast };
