import { Lato, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { AuthProvider } from "./components/providers/AuthProvider";
import { SearchProvider } from "./components/providers/SearchProvider";
import { query } from "@/lib/apollo-client";
import { GetCategoriesQuery } from "@/lib/queries";
import { Metadata as MetadataGql } from "@/__generated__/graphql";
import { Metadata } from "next";
import { ApolloProvider } from "./components/providers/ApolloProvider";

const poppins = Poppins({
  weight: ["300", "500"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: {
    template: "%s | GrocerTease",
    default: "GrocerTease",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categoriesQuery = await query({
    query: GetCategoriesQuery,
  });

  const categories = (categoriesQuery.data.metadata as MetadataGql).categories;

  return (
    <html lang="en" className={`${poppins.variable} ${lato.variable}`}>
      <body>
        <ComposedProviders
          providers={[AuthProvider, ApolloProvider, SearchProvider]}
        >
          <Navbar categories={categories} />
          <div className="pt-[120px] lg:pt-36">{children}</div>
          <Footer categories={categories} />
        </ComposedProviders>
      </body>
    </html>
  );
}

function ComposedProviders(props: {
  providers: Array<
    React.JSXElementConstructor<React.PropsWithChildren<unknown>>
  >;
  children: React.ReactNode;
}) {
  const { providers = [], children } = props;

  return (
    <>
      {providers.reduceRight((acc, Prov) => {
        return <Prov>{acc}</Prov>;
      }, children)}
    </>
  );
}
