import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/product.action";

interface UseProductOptions {
  filterKey?: string;
}

const useProducts = ({ filterKey }: UseProductOptions) => {
  const {
    isLoading,
    isFetched,
    data: products = [],
    error,
  } = useQuery({
    queryKey: ["products", { filterKey }],
    queryFn: () => getProducts({ filterKey }),
    staleTime: 1000 * 60 * 60,
  });

  return { isFetched, isLoading, products, error };
};

export default useProducts;
