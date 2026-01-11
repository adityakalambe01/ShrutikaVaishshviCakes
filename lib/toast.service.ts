"use client"

import { toast } from "sonner"

type ToastOptions = {
	description?: string
	duration?: number
}

/* ---------- BASIC TOASTS ---------- */

export const toastSuccess = (
	message: string,
	options?: ToastOptions
) => {
	toast.success(message, {
		description: options?.description,
		duration: options?.duration ?? 3000,
	})
}

export const toastError = (
	message: string,
	options?: ToastOptions
) => {
	toast.error(message, {
		description: options?.description,
		duration: options?.duration ?? 4000,
	})
}

export const toastInfo = (
	message: string,
	options?: ToastOptions
) => {
	toast(message, {
		description: options?.description,
		duration: options?.duration ?? 3000,
	})
}

export const toastWarning = (
	message: string,
	options?: ToastOptions
) => {
	toast.warning(message, {
		description: options?.description,
		duration: options?.duration ?? 3500,
	})
}

/* ---------- PROMISE TOAST ---------- */

export const toastPromise = <T>(
	promise: Promise<T>,
	messages: {
		loading: string
		success: string
		error: string
	}
) => {
	return toast.promise(promise, {
		loading: messages.loading,
		success: messages.success,
		error: messages.error,
	})
}

/* ---------- CUSTOM ---------- */

export const toastCustom = (jsx: React.ReactNode) => {
	toast(jsx)
}
