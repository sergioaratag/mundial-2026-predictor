"use client";

import { useEffect, useState } from "react";
import { PanelHeader } from "@/components/PanelHeader";
import { TabNav, type TabKey } from "@/components/TabNav";
import { TabResumen } from "@/components/tabs/TabResumen";
import { TabPicks } from "@/components/tabs/TabPicks";
import { TabCalendario } from "@/components/tabs/TabCalendario";
import { TabGrupos } from "@/components/tabs/TabGrupos";
import { TabNoticias } from "@/components/tabs/TabNoticias";
import { BackToTop } from "@/components/BackToTop";
import { SkeletonList } from "@/components/Skeleton";

export default function Home() {
  const [tab, setTab] = useState<TabKey>("picks");
  const [ready, setReady] = useState(false);

  // Loading state (skeleton): evita pantalla en blanco; lista para fetch a DB.
  useEffect(() => {
    const id = setTimeout(() => setReady(true), 150);
    return () => clearTimeout(id);
  }, []);

  return (
    <main className="min-h-screen pb-16" style={{ background: "var(--bg-primary)" }}>
      <PanelHeader />
      <TabNav active={tab} onChange={setTab} />
      <div className="max-w-4xl mx-auto">
        {!ready ? (
          <div className="px-4 sm:px-6 py-6">
            <SkeletonList rows={5} />
          </div>
        ) : tab === "resumen" ? (
          <TabResumen onGo={setTab} />
        ) : tab === "picks" ? (
          <TabPicks />
        ) : tab === "calendario" ? (
          <TabCalendario />
        ) : tab === "grupos" ? (
          <TabGrupos />
        ) : (
          <TabNoticias />
        )}
      </div>
      <BackToTop />
    </main>
  );
}
