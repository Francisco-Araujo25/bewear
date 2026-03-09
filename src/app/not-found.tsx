import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-100 flex-col items-center justify-center space-y-4 px-4 text-center">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">404</h1>
        <h2 className="text-2xl font-semibold">Página não encontrada</h2>
        <p className="text-muted-foreground">
          Desculpe, a página que você está procurando não existe.
        </p>
      </div>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">Voltar para home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/authentication">Entrar</Link>
        </Button>
      </div>
    </div>
  );
}

