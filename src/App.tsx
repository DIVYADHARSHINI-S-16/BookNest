import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { Navbar } from './components/Navbar'
import { CatalogPage } from './pages/CatalogPage'
import { BookDetailsPage } from './pages/BookDetailsPage'
import { CartPage } from './pages/CartPage'
import { AuthPage } from './pages/AuthPage'
import './App.css'

function App() {
  return <BrowserRouter><CartProvider><Navbar /><Routes><Route path="/" element={<CatalogPage />} /><Route path="/books/:id" element={<BookDetailsPage />} /><Route path="/cart" element={<CartPage />} /><Route path="/login" element={<AuthPage mode="login" />} /><Route path="/register" element={<AuthPage mode="register" />} /></Routes><footer className="site-footer"><span>BookNest</span><span>Independent books, lasting stories.</span></footer></CartProvider></BrowserRouter>
}

export default App
