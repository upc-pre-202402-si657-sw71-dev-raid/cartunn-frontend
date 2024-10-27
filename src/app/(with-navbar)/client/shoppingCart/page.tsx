"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import toast, { Toaster } from "react-hot-toast";

import ShoppingClientCard from "@/components/ShoppingClientCard";

import Order from "@/interfaces/Order";
import getOrders from "@/logic/getOrders";

const ShoppingCartPage = () => {
    const { t } = useTranslation("global");
    const [totalPrice, setTotalPrice] = useState("");
    const [orders, setOrders] = useState<Order[]>([]);

    const getData = async () => {
        const response = await getOrders();
        setOrders(response);
    }

    // const price = localStorage.getItem("total price");

    useEffect(() => {
        getData();
        // if (price) setTotalPrice(price.toString());
    }, []);

    return (
        <article>
            <Toaster />
            <span className="text-2xl font-extrabold tracking-tighter">{t("shopping-cart.title")}</span>
            <article className="flex">
                <article className="flex flex-wrap gap-4 w-5/6">
                    {orders && orders.map((el) => (
                        <ShoppingClientCard
                            id={el.id}
                        />
                    ))}
                </article>
                <section className="flex flex-col w-1/6">
                    <span className="text-2xl font-extrabold tracking-tighter">{t("shopping-cart.order")}</span>
                    {/*<span className="my-2">{t("shopping-cart.total")}: ${totalPrice.replace(/[\[\]]/g, '')}.00</span>*/}
                    <span className="my-2">{t("shopping-cart.total")}: --.--</span>
                    <button
                        className="c-button mt-2 py-3 font-semibold"
                        onClick={() => {
                            toast.error(t("shopping-cart.payment"));
                        }}
                    >
                        {t("shopping-cart.checkout-button")}
                    </button>
                </section>
            </article>
        </article>
    );
}

export default ShoppingCartPage;