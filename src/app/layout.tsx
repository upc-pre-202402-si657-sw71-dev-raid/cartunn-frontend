"use client";
import React from 'react';
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nextProvider } from "react-i18next";
import { ChakraProvider } from "@chakra-ui/react";
import global_en from "@/translations/en/global.json";
import global_es from "@/translations/es/global.json";

import "../styles/sass/styles.scss";

i18next
  .use(initReactI18next)
  .init({
    interpolation: { escapeValue: false },
    lng: "en",
    resources: {
      en: {
        global: global_en,
      },
      es: {
        global: global_es,
      },
    },
  });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <I18nextProvider i18n={i18next}>
        <ChakraProvider>
            {children}
        </ChakraProvider>
        </I18nextProvider>
      </body>
    </html>
  );
}