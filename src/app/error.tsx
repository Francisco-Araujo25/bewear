"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-100 flex-col items-center justify-center space-y-4 px-4 text-center">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Algo deu errado!</h2>
        <p className="text-muted-foreground">
          Desculpe, ocorreu um erro ao carregar esta página.
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground">
            Erro: {error.digest}
          </p>
        )}
      </div>
      <Button onClick={reset}>Tentar novamente</Button>
    </div>
  );
}

