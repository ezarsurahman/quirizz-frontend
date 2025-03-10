import axios from "axios"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const axiosInstance = axios.create({
  baseURL:"https://quirizz-backend-production.up.railway.app",
  headers : {
    'Content-Type': 'application/json',
  }
})