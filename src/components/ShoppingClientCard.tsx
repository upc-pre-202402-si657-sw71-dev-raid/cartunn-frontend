"use client"
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

import removeItem from "@/assets/icons/trash.png";

import Product from "@/interfaces/Product";
import getOrderById from "@/logic/getOrderById";
import deleteOrderById from "@/logic/deleteOrderById";

type ShoppingClientCardProps = {
    id: number;
}

const ShoppingClientCard = (props: ShoppingClientCardProps) => {
    const { t } = useTranslation("global");
    const [product, setProducts] = useState<Product>();

    const savePriceToLocalStorage = (price: number) => {
        const priceList = JSON.parse(localStorage.getItem('priceList') || '[]');
        priceList.push(price);
        localStorage.setItem("total price", JSON.stringify(priceList));
    };

    const getData = async () => {
        const response = await getOrderById(props.id);
        setProducts(response);

        if (response && response.price) {
            savePriceToLocalStorage(response.price);
        }
    };

    useEffect(() => {
        getData();
    }, [props.id]);

    if (!product) return null;

    const deleteFavoriteHandler = async () => {
        await deleteOrderById(props.id);
    };

    const notify = () => {
        toast.promise(deleteFavoriteHandler(), {
            loading: t("shopping-cart.notifications.deleting-item"),
            success: t("shopping-cart.notifications.deleted-item"),
            error: t("shopping-cart.notifications.item-error"),
        });
    };

    return (
        <section className="flex flex-col w-[31%] mt-4 px-8 py-4 border rounded-xl">
            <Toaster />
            <section className="flex justify-between">
                <h2 className="text-xl font-extrabold tracking-tighter">{t("shopping-cart.title-card")}: #{props.id}</h2>
                <Image
                    src={removeItem}
                    width={24}
                    alt="favorites"
                    onClick={notify}
                />
            </section>
            <span className="font-semibold">{product.title}</span>
            <span className="italic">{product.description}</span>
            <span className="font-bold tracking-tighter">{t("shopping-cart.price")}: ${product.price}.00</span>
        </section>
    );
};

export default ShoppingClientCard;