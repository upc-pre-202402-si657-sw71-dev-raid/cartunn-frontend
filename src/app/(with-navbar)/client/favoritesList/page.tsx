"use client"
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import FavoriteClientCard from "@/components/FavoriteClientCard";

import getFavorites from "@/logic/getFavorites";

const FavoriteListPage = () => {
    const { t } = useTranslation("global");
    const [favorites, setFavorites] = useState<any[]>([]);

    const getData = async () => {
        const response = await getFavorites();
        setFavorites(response);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <article>
            <span className="text-2xl font-extrabold tracking-tighter">{t("favorites.title")}</span>
            <article className="flex flex-wrap gap-x-8">
                {favorites && favorites.map((el) => (
                    <FavoriteClientCard
                        favoriteId={parseInt(el.favoriteId)}
                        productId={parseInt(el.productId)}
                    />
                ))}
            </article>
        </article>
    );
}

export default FavoriteListPage;