'use client'

import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField } from "@mui/material";
import { useState } from "react";

export default function Register() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    position: ''
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault()
      console.log(data)

      setLoading(true);

      const values = Object.values(data);

      if (values.some(value => !value)) {
        alert('Preencha todos os campos')
        setLoading(false)
        return
      }

      await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        body: JSON.stringify(data),
      })

      setLoading(false)
      setOpen(true)
      setData({
        name: '',
        email: '',
        password: '',
        position: ''
      })
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ p: 2, mt: 2, width: 600 }} component="form" onSubmit={handleSubmit}>
        <Stack spacing={2} mb={2}>
          <TextField label="Name" variant="outlined" name="name" value={data.name} onChange={handleChange} />
          <TextField label="Email" variant="outlined" name="email" value={data.email} onChange={handleChange} />
          <TextField label="Password" variant="outlined" name="password" value={data.password} onChange={handleChange} />
          <TextField label="Position" variant="outlined" name="position" value={data.position} onChange={handleChange} />
        </Stack>
        <Button variant="contained" type="submit">Registrar</Button>
      </Card>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Cadastro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Cadastro realizado com sucesso!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}