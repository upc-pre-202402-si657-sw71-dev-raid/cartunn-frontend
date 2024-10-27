"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import getTunningTasks from "@/logic/getTunningTasks";

import TunningTask from "@/interfaces/TunningTask";
import TunningTaskClientCard from "@/components/TunningTaskClientCard";

const AllReportsPage = () => {
    const { t } = useTranslation("global");
    const [tunningTasks, setTunningTasks] = useState<TunningTask[]>([]);

    const getData = async () => {
        const response = await getTunningTasks();
        setTunningTasks(response);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <article>
            <span className="text-2xl font-extrabold tracking-tighter">
                {t("reports.title")}
            </span>
            <article className="flex flex-wrap gap-x-4">
                {tunningTasks && tunningTasks.map((el) => (
                    <TunningTaskClientCard
                        key={el.id}
                        id={el.id}
                        modifiedPart={el.modifiedPart}
                        date={el.date}
                        status={el.status}
                    />
                ))}
            </article>
        </article>
    );
}

export default AllReportsPage;