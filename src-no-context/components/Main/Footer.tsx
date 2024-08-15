import { ReactNode } from "react";
function Footer({ children }: { children: ReactNode }) {
  return (
    <>
      <footer>{children}</footer>
    </>
  );
}

export default Footer;
