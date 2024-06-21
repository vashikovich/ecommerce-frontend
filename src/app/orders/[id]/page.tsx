"use client";

import { Order } from "@/__generated__/graphql";
import { GetOrderQuery } from "@/lib/queries";
import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const orderQuery = useQuery(GetOrderQuery, {
      variables: { id: params.id },
    });

    if (orderQuery.loading) return null;

    const order = orderQuery.data?.order as Order;

    return (
      <div className="p-4 flex-col lg:max-w-screen-lg lg:mx-auto">
        <div className="flex gap-3 items-baseline">
          <h2 className="text-3xl my-2 lg:my-10">Order</h2>
          <h4 className="text-xl my-2 lg:my-10 text-medium-gray">
            no. {order.id}
          </h4>
        </div>
        <div className="flex flex-col-reverse lg:flex-row lg:gap-6">
          <div className="w-full lg:border-2 lg:p-10">
            {order.items.map((i) => (
              <div
                key={i.productId}
                className="flex py-3 items-center border-b-2 border-light-gray lg:py-10"
              >
                <div className="w-60">
                  <Image
                    src={i.imageUrl ?? ""}
                    width={150}
                    height={150}
                    alt="img"
                  />
                </div>
                <div className="flex flex-col lg:flex-row lg:justify-between w-full lg:gap-20">
                  <div className="lg:w-1/2">
                    <h6 className="text-xs font-bold text-light-gray">
                      {i.brand}
                    </h6>
                    <p className="text-lg">{i.name}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex flex-col flex-1">
                        <p className="text-sm">${i.unitPrice} /</p>
                        <div className="flex flex-wrap">
                          <h6 className="text-xs font-bold">{i.size}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="flex-1 text-right text-lg">
                      {i.quantity} ea.
                    </p>
                    <p className="flex-1 text-right font-bold text-lg">
                      ${(i.unitPrice ?? 0) * i.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col lg:w-1/3 lg:border-2 lg:p-6 lg:h-fit">
            <div className="flex justify-between py-4">
              <div className="flex flex-col gap-1">
                <p className="">Status</p>
                <p className="">No.</p>
                <p className="">Date</p>
                <p className="text-xl font-bold">Total</p>
              </div>
              <div>
                <div className="text-right flex flex-col gap-1">
                  <p className="">{order.status}</p>
                  <p className="">{order.id}</p>
                  <p className="">{dayjs(order.date).format("YYYY-MM-DD")}</p>
                  <p className="text-xl font-bold">${order.totalAmount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (e) {
    return notFound();
  }
}
