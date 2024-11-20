import { Stack, Typography } from '@mui/material'
import React from 'react'

export const EmptyTodos = () => {
  return (
    <Stack alignItems='center'>
      <Typography variant="h6">Comienza a crear tus tareas</Typography>
      <img src={process.env.PUBLIC_URL+"/imgs/addNote.jpg"} alt="logo" width={260} height={260} fit="contain" />
    </Stack>
  )
}
