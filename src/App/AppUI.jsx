import { Box, Paper, Stack, Typography, Divider } from '@mui/material';
import { createPortal } from 'react-dom';

import { TodoCounter } from '../components/TodoCounter';
import { TodoSearch } from '../components/TodoSearch';
import { TodoList } from '../components/TodoList';
import { TodoItem } from '../components/TodoItem';
import { TodoLoading } from '../components/TodoLoading';
import { EmptyTodos } from '../components/EmptyTodos';
import { TodoContext } from '../context/TodoProvider';
import { useContext } from 'react';
import { ModalNewTodo } from '../components/ModalNewTodo';

const AppUI = () => {
  const {
    loading,
    error,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
  } = useContext(TodoContext);

  return (
    <>
      {/* Contenedor Principal */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', // Centrado
          flexDirection: 'column',
          width: '100vw',
          height: '100vh',
          backgroundColor: '#F7F9FC', // Fondo profesional neutro
          padding: 2,
        }}
      >
        {/* Contenedor Interior */}
        <Stack
          sx={{
            backgroundColor: 'white',
            borderRadius: 12,
            width: '90%',
            maxWidth: 600,
            minHeight: 750,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)', // Sombra suave
            padding: 4,
          }}
        >
          {/* Encabezado */}
          <Box
            sx={{
              backgroundColor: '#1E3A8A', // Azul marino
              color: 'white',
              borderRadius: '8px 8px 0 0', // Solo esquinas superiores redondeadas
              padding: '20px 16px',
              textAlign: 'center',
            }}
          >
            <Typography variant="h5" fontWeight="600">
              ¿Qué quieres hacer?
            </Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.9, marginTop: 3 }}>
              Organiza tus tareas y alcanza tus objetivos
            </Typography>
          </Box>

          {/* Contenido */}
          <Box sx={{ padding: '20px 0' }}>
            <TodoCounter />
            <Divider sx={{ marginY: 2 }} />
            <TodoSearch />
          </Box>

          {/* Lista de Tareas */}
          <Paper
            elevation={0}
            sx={{
              backgroundColor: '#F9FAFB', // Fondo ligero para contraste
              padding: 2,
              borderRadius: 8,
              border: '1px solid #E5E7EB', // Borde sutil
              maxHeight: 400,
              overflowY: 'auto', // Habilitar scroll en caso de muchas tareas
            }}
          >
            <TodoList>
              {loading && <TodoLoading />}
              {error && (
                <Typography
                  color="error"
                  sx={{ textAlign: 'center', marginTop: 2 }}
                >
                  Ocurrió un error al cargar las tareas.
                </Typography>
              )}
              {!loading && searchedTodos.length === 0 && <EmptyTodos />}
              {searchedTodos.map((todo) => (
                <TodoItem
                  key={todo.text}
                  text={todo.text}
                  completed={todo.completed}
                  onComplete={() => completeTodo(todo.text)}
                  onDelete={() => deleteTodo(todo.text)}
                />
              ))}
            </TodoList>
          </Paper>

          {/* Pie de página */}
          <Box
            sx={{
              marginTop: 4,
              textAlign: 'center',
              fontSize: '0.85rem',
              color: '#6B7280', // Gris profesional
            }}
          >
            <Typography variant="caption">
              © {new Date().getFullYear()} Todo App - Todos los derechos
              reservados.
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Modal */}
      {openModal &&
        createPortal(<ModalNewTodo openModal={openModal} />, document.body)}
    </>
  );
};

export default AppUI;
