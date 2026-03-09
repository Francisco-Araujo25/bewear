"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2,MinusIcon, PlusIcon, ShoppingCartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";

import AddToCartButton from "./add-to-cart-button";

interface ProductActionsProps {
  productVariantId: string;
}

const ProductActions = ({ productVariantId }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: buyNow, isPending } = useMutation({
    mutationFn: () => addProductToCart({ productVariantId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      router.push("/cart/identification"); // só redireciona após adicionar
    },
  });

  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  const handleIncrement = () => setQuantity((prev) => prev + 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="space-y-2">
          <span className="text-sm font-medium">Quantidade</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-between rounded-lg border px-2 py-1">
              <Button size="icon" variant="ghost" onClick={handleDecrement} className="h-8 w-8" disabled={quantity <= 1}>
                <MinusIcon className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button size="icon" variant="ghost" onClick={handleIncrement} className="h-8 w-8">
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <AddToCartButton productVariantId={productVariantId} quantity={quantity} />
        <Button
          className="rounded-full"
          size="lg"
          disabled={isPending}
          onClick={() => buyNow()}
        >
          {isPending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <ShoppingCartIcon className="mr-2 h-5 w-5" />}
          Comprar Agora
        </Button>
      </div>
    </div>
  );
};

export default ProductActions;