"use client";

import {
  Category,
  CategoryFacet,
  Metadata,
  PaginatedProduct,
} from "@/__generated__/graphql";
import Input from "../components/Input";
import Select from "../components/Select";
import { useQuery } from "@apollo/client";
import { GetCategoriesQuery } from "@/lib/queries";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { SearchParamsType } from "../components/providers/SearchProvider";
import ChevronSvg from "@/../public/svg/chevron.svg";
import classNames from "classnames";

export default function SearchFilters({
  paginatedProduct,
  params,
}: {
  paginatedProduct: PaginatedProduct;
  params: SearchParamsType;
}) {
  const categoriesQuery = useQuery(GetCategoriesQuery);
  const categories = categoriesQuery.data
    ? (categoriesQuery.data.metadata as Metadata).categories
    : undefined;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const availBrands = paginatedProduct.searchInfo.availableBrands;
  const structuredAvailableCats = categories
    ? structCatFacets(paginatedProduct.searchInfo.availableCategories, categories)
    : undefined;

  const [brandsExpanded, setBrandsExpanded] = useState(false);
  const [catsExpanded, setCatsExpanded] = useState<number[]>([]);

  const createQueryString = useCallback(
    (name: string, value: string | undefined | null) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value ?? "");

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="border-2 rounded px-6 h-fit">
      <div className="py-6 border-b-2 border-light-gray">
        <label className="space-y-3 font-bold text-lg">
          <p>Sort by</p>
          <Select
            value={searchParams.get("s") ?? "r"}
            onChange={(e) =>
              router.push(
                pathname + "?" + createQueryString("s", e.target.value)
              )
            }
            options={[
              {
                label: "Relevance",
                value: "r",
              },
              {
                label: "Lowest Price",
                value: "pa",
              },
              {
                label: "Highest Price",
                value: "pd",
              },
            ]}
          />
        </label>
      </div>
      <div className="py-6 space-y-4">
        <p className="font-bold text-lg">Filter by</p>
        <div className="space-y-2">
          <label className="flex gap-2 items-center">
            <Input
              type="checkbox"
              checked={Boolean(params.isLocal)}
              onChange={(e) =>
                router.push(
                  pathname +
                    "?" +
                    createQueryString(
                      "f",
                      [!params.isLocal && "lc", params.isPeak && "pk"]
                        .filter((p) => Boolean(p))
                        .join(",")
                    )
                )
              }
            />
            Locally Sourced
          </label>
          <label className="flex gap-2 items-center">
            <Input
              type="checkbox"
              checked={Boolean(params.isPeak)}
              onChange={(e) =>
                router.push(
                  pathname +
                    "?" +
                    createQueryString(
                      "f",
                      [params.isLocal && "lc", !params.isPeak && "pk"]
                        .filter((p) => Boolean(p))
                        .join(",")
                    )
                )
              }
            />
            Peak Season
          </label>
        </div>
        {Boolean(availBrands?.length) && (
          <div className="space-y-2">
            <p className="font-bold">Brands</p>
            <div className={classNames("border-2 rounded p-2 space-y-2")}>
              {availBrands
                .slice(0, brandsExpanded ? availBrands.length : 4)
                .map((b) => (
                  <label className="flex gap-2 items-baseline" key={b.brand}>
                    <input
                      type="checkbox"
                      checked={params.brands?.includes(b.brand)}
                      onChange={() =>
                        router.push(
                          pathname +
                            "?" +
                            createQueryString(
                              "br",
                              params.brands?.includes(b.brand)
                                ? params.brands
                                    .filter((pb) => pb != b.brand)
                                    .join(",")
                                : (params.brands ?? [])
                                    .concat(b.brand)
                                    .join(",")
                            )
                        )
                      }
                    />
                    {b.brand} ({b.count})
                  </label>
                ))}
              {availBrands.length > 4 && (
                <div
                  className="flex items-end cursor-pointer"
                  onClick={() => setBrandsExpanded((prev) => !prev)}
                >
                  <p className="font-bold">
                    {brandsExpanded ? "Show less" : "Show more"}
                  </p>
                  <div
                    className={classNames(
                      "w-5 h-5 transition",
                      brandsExpanded ? "-rotate-90" : "rotate-90"
                    )}
                  >
                    <ChevronSvg />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {categories && structuredAvailableCats && (
          <div className="space-y-2">
            <p className="font-bold">Categories</p>
            <div className="border-2 rounded p-2 space-y-3">
              {structuredAvailableCats.map((c) => (
                <div key={c.id}>
                  <div
                    className="flex"
                    onClick={() =>
                      setCatsExpanded((prev) =>
                        prev.includes(c.id)
                          ? prev.filter((e) => e != c.id)
                          : prev.concat(c.id)
                      )
                    }
                  >
                    <p className="flex-1 font-bold">
                      {categories.find((cat) => cat.id === c.id)?.name} (
                      {c.count})
                    </p>
                    <div
                      className={classNames(
                        "w-5 h-5 transition",
                        catsExpanded.includes(c.id) ? "-rotate-90" : "rotate-90"
                      )}
                    >
                      <ChevronSvg />
                    </div>
                  </div>
                  {catsExpanded.includes(c.id) && (
                    <div className="ml-4 space-y-1 mt-1">
                      {c.subcategories.map((sc) => (
                        <label
                          className="flex gap-2 items-baseline"
                          key={sc.id}
                        >
                          <input
                            type="checkbox"
                            checked={params.categories?.includes(sc.id)}
                            onChange={() =>
                              router.push(
                                pathname +
                                  "?" +
                                  createQueryString(
                                    "cat",
                                    params.categories?.includes(sc.id)
                                      ? params.categories
                                          .filter((pc) => pc != sc.id)
                                          .join(",")
                                      : (params.categories ?? [])
                                          .concat(sc.id)
                                          .join(",")
                                  )
                              )
                            }
                          />
                          {
                            categories
                              .find((cat) => cat.id === c.id)
                              ?.subcategories.find(
                                (subcat) => subcat.id === sc.id
                              )?.name
                          }{" "}
                          ({sc.count})
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const structCatFacets = (
  catFacets: CategoryFacet[],
  categories: Category[]
) => {
  const structFacet: {
    id: number;
    count: number;
    name: string;
    subcategories: { id: number; count: number; name: string }[];
  }[] = [];
  const sorted = [...catFacets].sort((a, b) => a.categoryId - b.categoryId);
  for (let catFacet of sorted) {
    if (catFacet.categoryId < 100) {
      const cat = categories.find((c) => c.id === catFacet.categoryId);
      structFacet.push({
        id: catFacet.categoryId,
        count: catFacet.count,
        name: cat?.name ?? "",
        subcategories: [],
      });
    } else {
      const subcat = categories
        .find((c) => c.id === Math.floor(catFacet.categoryId / 100))
        ?.subcategories.find((sc) => sc.id === catFacet.categoryId);
      const structCat = structFacet.find(
        (s) => s.id === Math.floor(catFacet.categoryId / 100)
      );
      structCat?.subcategories.push({
        id: catFacet.categoryId,
        count: catFacet.count,
        name: subcat?.name ?? "",
      });
    }
  }
  return structFacet;
};
