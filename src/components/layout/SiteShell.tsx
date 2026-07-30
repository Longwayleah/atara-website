import { CartDrawer } from "@/components/shop/CartDrawer";
import { Header } from "./Header";
import { Footer } from "./Footer";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <CartDrawer />
      <Footer />
    </>
  );
}
