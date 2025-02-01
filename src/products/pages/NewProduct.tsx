import { Button, Image, Input, Textarea } from "@heroui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import useProductMutation from "../hooks/useProductMutation";

interface FormInputs {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export const NewProduct = () => {
  const productMutation = useProductMutation();

  const { register, handleSubmit, watch } = useForm<FormInputs>({
    defaultValues: {
      title: "",
      price: 0,
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      description: "",
      category: "men's clothing",
    },
  });

  const newImage = watch("image");

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    productMutation.mutate(data);
  };

  return (
    <div className="w-full flex-col">
      <h1 className="text-2xl font-bold">Nuevo producto</h1>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-around items-center">
          <div className="flex-col w-[500px]">
            <Input
              className="mt-2"
              type="text"
              label="Titulo del producto"
              {...register("title")}
              required
            />
            <Input
              className="mt-2"
              type="number"
              label="Precio del producto"
              {...register("price", { valueAsNumber: true })}
              required
            />
            <Input
              className="mt-2"
              type="url"
              label="Url del producto"
              {...register("image")}
              required
            />
            <Textarea
              className="mt-2"
              label="Descripcion del producto"
              {...register("description")}
              required
            />
            <select
              className="rounded-md p-3 mt-2 bg-gray-800 w-full"
              {...register("category")}
              required
            >
              <option value="men's clothing">Men's clothing</option>
              <option value="women's clothing">Women's clothing</option>
              <option value="jewelery">Jewelery</option>
              <option value="electronics">Electronics</option>
            </select>

            <br />
            <Button
              type="submit"
              className="mt-2"
              color="primary"
              isDisabled={productMutation.isPending}
            >
              {productMutation.isPending ? "Guardando..." : "Crear producto"}
            </Button>
          </div>

          <div
            className="bg-white rounded-2xl p-10 flex items-center justify-center"
            style={{
              width: "500px",
              height: "600px",
            }}
          >
            <Image src={newImage} />
          </div>
        </div>
      </form>
    </div>
  );
};
