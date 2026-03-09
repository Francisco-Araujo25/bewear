import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">BEWEAR</h3>
            <p className="text-sm text-muted-foreground">
              Sua loja de moda online com as melhores tendências e estilos.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Institucional</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Sobre nós</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Fale conosco</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Trabalhe conosco</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Atendimento</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Central de ajuda</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Política de trocas</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Perguntas frequentes</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Política de privacidade</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Termos de uso</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} BEWEAR. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

