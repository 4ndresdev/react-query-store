import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import { ProductCard } from "../components/ProductCard";

export const ProductByID = () => {
  const { id } = useParams<{ id: string }>();
  const { isLoading, error, product } = useProduct({ id: id || "" });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Producto {id}</h1>
      {product && <ProductCard product={product} fullDescription />}
    </div>
  );
};
