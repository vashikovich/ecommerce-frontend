"use client";

import { Order } from "@/__generated__/graphql";
import { GetOrdersByUserQuery } from "@/lib/queries";
import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
import Image from "next/image";

export default function OrdersPage() {
  const getOrdersQuery = useQuery(GetOrdersByUserQuery);

  if (getOrdersQuery.loading) return null;

  const orders = getOrdersQuery.data?.ordersByUser.map(
    (o) => o as Order
  ) as Order[];

  return (
    <div className="p-4 flex-col lg:max-w-screen-xl lg:mx-auto">
      <h2 className="text-3xl my-2 lg:my-10">Orders & Invoices</h2>
      <div className="w-full px-4 lg:border-2 lg:p-10">
        {orders.map((o) => (
          <div
            key={"id"}
            className="flex py-3 items-center border-b-2 border-light-gray lg:py-10"
          >
            <div className="w-60">
              <Image
                src={o.items[0].imageUrl ?? ""}
                width={150}
                height={150}
                alt="img"
              />
            </div>
            <div className="flex flex-col lg:flex-row lg:justify-between w-full lg:gap-20 lg:h-40">
              <div className="flex justify-between lg:hidden">
                <h6 className="text-blue-900 font-bold">{o.status}</h6>
                <p>{dayjs(o.date).format('D MMM YYYY')}</p>
              </div>
              <div className="flex justify-end lg:hidden">
                <h6 className="text-medium-gray text-sm">{o.id}</h6>
              </div>
              <div className="lg:w-1/2">
                <h6 className="text-xs font-bold text-light-gray">
                  {o.items[0].brand}
                </h6>
                <p className="text-lg">{o.items[0].name}</p>
                <div className="flex mt-2 text-sm">
                  {o.items.length > 1 ? `+${o.items.length - 1} others` : ""}
                </div>
              </div>
              <div className="hidden lg:flex flex-col justify-between text-right">
                <div>
                  <h6 className="text-blue-900 font-bold">{o.status}</h6>
                  <p>{dayjs(o.date).format('D MMM YYYY')}</p>
                  <h6 className="text-medium-gray text-sm">{o.id}</h6>
                </div>
                <div>
                  <p className="font-bold text-lg">${o.totalAmount}</p>
                </div>
              </div>
              <div className="flex justify-end lg:hidden">
                <p className="font-bold text-lg">${o.totalAmount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
