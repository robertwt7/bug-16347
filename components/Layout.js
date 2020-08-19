import Head from "next/head";
import React from "react";

export const siteTitle = "";

export default function Layout({ children, home }) {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Head>
          <title>{siteTitle}</title>
          <meta name="description" />
          <meta name="og:title" content={siteTitle} />
        </Head>

        <div className="flex-auto">{children}</div>
      </div>
    </>
  );
}
