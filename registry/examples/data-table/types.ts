// Example types for DataTable demo (from shadcn-vue docs)
export interface Payment {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}
