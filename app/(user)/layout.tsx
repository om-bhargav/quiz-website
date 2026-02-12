import AuthWrapper from '@/components/AuthWrapper'
import React from 'react'

export default function layout({children}:React.PropsWithChildren) {
  return (
    <AuthWrapper>{children}</AuthWrapper>
  )
}
