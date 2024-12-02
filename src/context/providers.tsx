"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

type ThemeProviderPropsWithoutChildren = Omit<ThemeProviderProps, "children">;

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderPropsWithoutChildren;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </NextUIProvider>
  );
}
