import { useEffect, useState } from 'react';
import ProductCard, { type ProductCardProps } from './components/ProductCard';
import './App.css';

interface Producto extends ProductCardProps {
  id: number;
}

function App() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const respuesta = await fetch('/data.json');
        if (!respuesta.ok) {
          throw new Error('No se pudo cargar la información de productos.');
        }

        const datos = (await respuesta.json()) as Producto[];
        setProductos(datos);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error inesperado.');
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, []);

  return (
    <main className="app">
      <header className="app__header">
        <h1>Catálogo de productos</h1>
        <p>Explora los productos disponibles y sus reseñas más recientes.</p>
      </header>

      {cargando ? <p className="app__status">Cargando productos...</p> : null}
      {error ? <p className="app__status app__status--error">{error}</p> : null}

      {!cargando && !error ? (
        <section className="product-grid" aria-label="Listado de productos">
          {productos.map((producto) => (
            <ProductCard key={producto.id} {...producto} />
          ))}
        </section>
      ) : null}
    </main>
  );
}

export default App;
