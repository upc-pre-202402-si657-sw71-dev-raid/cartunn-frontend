"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image } from "@chakra-ui/react";
import NextImage from "next/image";
import toast, { Toaster } from "react-hot-toast";

import favorite from "@/assets/icons/heart.png";
import favoriteFilled from "@/assets/icons/heart-filled.png";

import Product from "@/interfaces/Product";
import postFavoriteProduct from "@/logic/postFavoriteProduct";
import deleteFavoriteProductById from "@/logic/deleteFavoriteProductById";
import postOrder from "@/logic/postOrder";
import postProductRefund from "@/logic/postProductRefund";

const ProductClientCard = (props: Product) => {
    const { t } = useTranslation("global");
    const [isFavorite, setIsFavorite] = useState(false);

    const favoriteProductHandler = async () => {
        try {
            if (!isFavorite) {
                await postFavoriteProduct(props.id);
                setIsFavorite(true);
                toast.success(t("client.home.notifications.added-favorites"));
            } else {
                await deleteFavoriteProductById(props.id);
                setIsFavorite(false);
                toast.success(t("client.home.notifications.deleted-favorites"));
            }
        } catch (error) {
            toast.error(t("client.home.notifications.update-error"));
        }
    };

    const productRefundHandler = () => {
        toast.promise(
            postProductRefund(props.id, props.title, props.description), {
                loading: t("client.home.notifications.order-refund"),
                success: t("client.home.notifications.refund-ordered"),
                error: t("client.home.notifications.refund-error"),
            }
        );
    };

    const orderHandler = () => {
        toast.promise(
            postOrder(props.id, props.title, props.description), {
                loading: t("client.home.notifications.ordering"),
                success: t("client.home.notifications.create-order"),
                error: t("client.home.notifications.order-error"),
            }
        );
    };

    return (
        <section className="flex flex-col w-[15%] mt-4 px-6 py-4 border rounded-xl">
            <Toaster />
            <section className="flex justify-between mt-2 mb-4">
                <h2 className="text-xl font-extrabold tracking-tighter">
                    {`${t("client.home.title-card")}: #${props.id}`}
                </h2>
                <button onClick={favoriteProductHandler}>
                    <NextImage
                        src={isFavorite ? favoriteFilled : favorite}
                        width={24}
                        alt="favorites"
                        className="dark:invert"
                    />
                </button>
            </section>
            <Image
                src={props.image}
                fallbackSrc="https://via.placeholder.com/200"
                alt={props.title}
                height={200}
                objectFit="cover"
                className="w-full rounded-lg "
            />
            <section className="flex flex-col mt-4">
                <span className="font-bold tracking-tighter italic">{props.title}</span>
                <span className="text-xs">{props.description}</span>
                <section className="flex justify-between my-1">
                    <span className="font-bold tracking-tighter">
                        {t("client.home.title-price")}
                    </span>
                    <span className="font-bold tracking-tighter">${props.price}.00</span>
                </section>
                <button
                    className="mt-2 py-3 bg-gray-50 hover:bg-gray-200 font-semibold rounded-sm border "
                    onClick={productRefundHandler}
                >
                    {t("client.home.refund-button")}
                </button>
                <button
                    className="c-button mt-2 py-3 font-semibold"
                    onClick={orderHandler}
                >
                    {t("client.home.order-button")}
                </button>
            </section>
        </section>
    );
};

export default ProductClientCard;