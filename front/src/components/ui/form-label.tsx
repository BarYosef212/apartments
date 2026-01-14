import * as React from "react"

export interface FormLabelProps {
  children: React.ReactNode
  required?: boolean
}

export const FormLabel = ({ children, required }: FormLabelProps) => (
  <label style={{ fontWeight: 'bold' }}>
    {children}
    {required && <span style={{ color: 'red', marginRight: '4px' }}> *</span>}
  </label>
)

