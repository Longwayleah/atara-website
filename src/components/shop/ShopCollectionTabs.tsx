"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { ShopFilter } from "@/lib/shop/filter";
import { cn } from "@/lib/utils/cn";

const tabs: { id: ShopFilter; label: string; href: string }[] = [
  { id: "all", label: "All", href: "/shop" },
  { id: "core", label: "Protocols", href: "/shop?collection=core" },
];

type Indicator = {
  left: number;
  width: number;
};

type ShopCollectionTabsProps = {
  active: ShopFilter;
};

export function ShopCollectionTabs({ active }: ShopCollectionTabsProps) {
  const reducedMotion = usePrefersReducedMotion();
  const navRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicator, setIndicator] = useState<Indicator>({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const nav = navRef.current;
      const activeIndex = tabs.findIndex((tab) => tab.id === active);
      const activeTab = tabRefs.current[activeIndex];

      if (!nav || !activeTab) return;

      const navRect = nav.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();

      setIndicator({
        left: tabRect.left - navRect.left,
        width: tabRect.width,
      });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    return () => window.removeEventListener("resize", updateIndicator);
  }, [active]);

  return (
    <div className="shop-collection-tabs">
      <div className="shop-collection-tabs__scroll">
        <nav
          ref={navRef}
          aria-label="Filter collection"
          className="shop-collection-tabs__nav"
        >
          {tabs.map((tab, index) => {
            const isActive = tab.id === active;

            return (
              <Link
                key={tab.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "shop-collection-tabs__tab",
                  isActive && "shop-collection-tabs__tab--active",
                )}
              >
                {tab.label}
              </Link>
            );
          })}

          <span
            aria-hidden
            className={cn(
              "shop-collection-tabs__indicator",
              reducedMotion && "shop-collection-tabs__indicator--static",
            )}
            style={{
              transform: `translateX(${indicator.left}px)`,
              width: indicator.width,
            }}
          />
        </nav>
      </div>
    </div>
  );
}
