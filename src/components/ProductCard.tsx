import React from 'react';

export interface ProductReview {
	usuario: string;
	texto: string;
	fecha: string;
}

export interface ProductCardProps {
	nombre: string;
	descripcion: string;
	precio: number;
	imagen: string;
	reseñas?: ProductReview[];
}

const ProductCard: React.FC<ProductCardProps> = ({
	nombre,
	descripcion,
	precio,
	imagen,
	reseñas = [],
}) => {
	const precioFormateado = new Intl.NumberFormat('es-CO', {
		style: 'currency',
		currency: 'COP',
		maximumFractionDigits: 0,
	}).format(precio);

	return (
		<article className="product-card">
			<img className="product-card__image" src={imagen} alt={nombre} loading="lazy" />
			<div className="product-card__content">
				<h2 className="product-card__name">{nombre}</h2>
				<p className="product-card__description">{descripcion}</p>
				<p className="product-card__price">{precioFormateado}</p>

				<section className="product-card__reviews" aria-label="Reseñas del producto">
					<h3>Reseñas</h3>
					{reseñas.length > 0 ? (
						<ul>
							{reseñas.map((reseña, index) => (
								<li key={`${reseña.usuario}-${reseña.fecha}-${index}`}>
									<p>
										<strong>{reseña.usuario}:</strong> {reseña.texto}
									</p>
									<small>{reseña.fecha}</small>
								</li>
							))}
						</ul>
					) : (
						<p>No hay reseñas disponibles.</p>
					)}
				</section>
			</div>
		</article>
	);
};

export default ProductCard;
