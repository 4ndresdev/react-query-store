import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../services/product.action";
import { QueryClient } from "@tanstack/react-query";

interface Props {
  id: string;
}

const useProduct = ({ id }: Props) => {
  const queryClient = new QueryClient();

  const {
    isLoading,
    isFetched,
    data: product,
    error,
  } = useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProduct({ id }),
    staleTime: 1000 * 60 * 60,
  });

  function prefetchProduct() {
    queryClient.prefetchQuery({
      queryKey: ["product", { id }],
      queryFn: () => getProduct({ id }),
      staleTime: 1000 * 60 * 60,
    });
  }

  return { isFetched, isLoading, product, error, prefetchProduct };
};

export default useProduct;
