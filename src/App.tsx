import './App.css';
import { Light, Toast } from '@runeffective/evo-design-system';
import { ToastExample } from './ToastExample';
import styled, { ThemeProvider } from 'styled-components';
import { DndContext } from '@dnd-kit/core';
import { DragExample } from './DragExample';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <Container>
      <ThemeProvider theme={Light}>
        <Toast>
          <DndContext>
            <ToastExample />
            <DragExample />
          </DndContext>
        </Toast>
      </ThemeProvider>
    </Container>
  );
}

export default App;
