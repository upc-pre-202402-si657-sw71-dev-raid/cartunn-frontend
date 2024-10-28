"use client"
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image } from "@chakra-ui/react";
import NextImage from "next/image";
import toast, { Toaster } from "react-hot-toast";

import removeItem from "@/assets/icons/trash.png";

import Product from "@/interfaces/Product";
import getProductById from "@/logic/getOrderById";
import deleteFavoriteProductById from "@/logic/deleteFavoriteProductById";

type FavoriteClientCardProps = {
    favoriteId: number;
    productId: number;
}

const FavoriteClientCard = (props: FavoriteClientCardProps) => {
    const { t } = useTranslation("global");
    const [favorites, setFavorites] = useState<Product>();

    const getData = async () => {
        const response = await getProductById(props.productId);
        setFavorites(response);
    }

    useEffect(() => {
        getData();
    }, [props.productId]);

    console.log(favorites)

    if (!favorites) return null;

    const deleteFavoriteHandler = async () => {
        await deleteFavoriteProductById(props.favoriteId);
    }

    const notify = () => {
        toast.promise(deleteFavoriteHandler(), {
            loading: t("favorites.notifications.deleting-favorite"),
            success: t("favorites.notifications.deleted-favorite"),
            error: t("favorites.notifications.favorite-error"),
        });
    };

    return (
        <section className="flex flex-col mt-4 w-[15%] border rounded-xl" key={favorites.id}>
            <Toaster />
            <Image
                src={favorites.image}
                fallbackSrc="https://via.placeholder.com/200"
                alt={favorites.title}
                height={200}
                objectFit="cover"
                className="w-full rounded-lg"
            />
            <section className="flex flex-col mt-4 pt-2 pb-6 px-6">
                <section className="flex justify-between">
                    <h2 className="text-xl font-extrabold tracking-tighter">{t("favorites.title-card")}: {favorites.id}</h2>
                    <NextImage
                        src={removeItem}
                        width={24}
                        alt="favorites"
                        onClick={notify}
                    />
                </section>
                <span className="font-semibold">{favorites.title}</span>
                <span className="italic">{favorites.description}</span>
                <span className="font-bold tracking-tighter">${favorites.price}.00</span>
            </section>
        </section>
    );
}

export default FavoriteClientCard;