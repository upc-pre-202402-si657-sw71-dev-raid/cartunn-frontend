"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NotificationClientCard from "@/components/NotificationClientCard";

import Notification from "@/interfaces/Notification";
import getNotifications from "@/logic/getNotifications";

const YourNotificationsPage = () => {
    const { t } = useTranslation("global");
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const getData = async () => {
        const response = await getNotifications();
        setNotifications(response);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <article className="">
            <span className="text-2xl font-extrabold tracking-tighter">{t("notifications.title")}</span>
            <article className="flex flex-wrap gap-x-4">
                {notifications && notifications.map((el) => (
                    <NotificationClientCard
                        key={el.id}
                        id={el.id}
                        type={el.type}
                        description={el.description}
                    />
                ))}
            </article>
        </article>
    );
}

export default YourNotificationsPage;