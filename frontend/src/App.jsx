// /frontend/src/App.jsx
import TodoListPage from './pages/TodoListPage';
import './App.css'; // Si tienes estilos globales

function App() {
  return (
    <div className="App" style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <TodoListPage />
    </div>
  );
}

export default App;