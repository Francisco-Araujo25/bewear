"use client";

import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { orderTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

interface OrdersProps {
  orders: Array<{
    id: string;
    totalPriceInCents: number;
    status: (typeof orderTable.$inferSelect)["status"];
    createdAt: Date;
    items: Array<{
      id: string;
      imageUrl: string;
      productName: string;
      productVariantName: string;
      priceInCents: number;
      quantity: number;
    }>;
  }>;
}

const Orders = ({ orders }: OrdersProps) => {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent className="p-0">
            <Accordion type="single" collapsible>
              <AccordionItem value="order-details">
                <AccordionTrigger className="px-6 hover:no-underline">
                  <div className="flex flex-col gap-2 text-left w-full pr-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        {order.status === "paid" && (
                          <Badge className="bg-green-600">Pago</Badge>
                        )}
                        {order.status === "pending" && (
                          <Badge variant="outline" className="text-orange-600">Pagamento pendente</Badge>
                        )}
                        {order.status === "canceled" && (
                          <Badge variant="destructive">Cancelado</Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Pedido #{order.id.slice(0, 8)}</span>
                      <span className="font-semibold">{formatCentsToBRL(order.totalPriceInCents)}</span>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-6 pb-6 space-y-6">
                    {/* Order Items */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Itens do Pedido</h4>
                      <div className="space-y-4">
                        {order.items.map((product) => (
                          <div
                            className="flex gap-4 items-start"
                            key={product.id}
                          >
                            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                              <Image
                                src={product.imageUrl}
                                alt={product.productName}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex flex-1 flex-col justify-between min-w-0">
                              <div>
                                <p className="font-medium truncate">{product.productName}</p>
                                <p className="text-sm text-muted-foreground">
                                  {product.productVariantName}
                                </p>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">
                                  Qtd: {product.quantity}
                                </span>
                                <span className="font-semibold">
                                  {formatCentsToBRL(
                                    product.priceInCents * product.quantity,
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Order Summary */}
                    <div className="space-y-2 max-w-xs ml-auto">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>{formatCentsToBRL(order.totalPriceInCents)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Frete</span>
                        <span className="text-green-600">GRÁTIS</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>{formatCentsToBRL(order.totalPriceInCents)}</span>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Orders;

