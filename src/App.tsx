import './App.css';
import { Toast } from '@runeffective/evo-design-system';
import { ToastExample } from './ToastExample';
import styled from 'styled-components';
import { DndContext } from '@dnd-kit/core';
import { DragExample } from './DragExample';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <Container>
      <Toast>
        <DndContext>
          <ToastExample />
          <DragExample />
        </DndContext>
      </Toast>
    </Container>
  );
}

export default App;
