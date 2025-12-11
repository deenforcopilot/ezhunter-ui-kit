import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

interface AppLayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

export function AppLayout({ children, hideNav = false }: AppLayoutProps) {
  return (
    <div className="app-container">
      <main className={hideNav ? "" : "safe-bottom"}>
        {children}
      </main>
      {!hideNav && <BottomNav />}
    </div>
  );
}
