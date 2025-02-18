import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import PostPage from './pages/PostPage';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Главная страница */}
          <Route index element={<Home />} />
          {/* Страница контактов */}
          <Route path="contacts" element={<Contacts />} />
          <Route path="post/:id" element={<PostPage />} /> {/* Добавлен маршрут для постов */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
