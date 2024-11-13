"use client"
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useRouter} from "next/navigation";
import toast, {Toaster} from "react-hot-toast";

import BackButton from "@/components/BackButton";
import environment from "@/environments/enviroment";
import {types} from "sass";
import List = types.List;

const ResetPassword = () => {
    const { t } = useTranslation("global");
    const [user, setUser] = useState({ username: "", password: "" });
    const router = useRouter();

    const getUserId = async () => {
        try {
            const response = await fetch(`${environment.serverBasePath}/users/get-user/${user.username}`);
            if (!response.ok) throw new Error("User not found");
            const result = await response.json();
            await resetPasswordHandler(result.id, result.roles);
            router.push("/login");
        } catch (error) {
            toast.error(t("reset-password.notifications.error.invalid-username"));
        }
    };

    const isPasswordValid = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    };

    const resetPasswordHandler = async (id, rol) => {
        const userRequestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password,
                roles: rol,
            }),
        };

        try {
            console.log(rol);
            console.log(id);
            const userResponse = await fetch(
                `${environment.serverBasePath}/users/update-user/${id}`,
                userRequestOptions
            );

            if (!userResponse.ok) throw new Error("Error resetting password");
            toast.success(t("reset-password.notifications.success"));
            return await userResponse.json();
        } catch (error) {
            toast.error(t("reset-password.notifications.error.server"));
        }
    };

    const handleSubmit = async () => {
        if(user.password == "" || user.username == ""){
            toast.error(t("reset-password.notifications.error.incomplete"));
            return;
        }
        if (!isPasswordValid(user.password)) {
            toast.error(t("reset-password.notifications.error.weak-password"));
            return;
        }
        await getUserId();
    };

    const notify = () => {
        handleSubmit();
    };

    return (
        <section className="flex items-center w-full sm:w-1/2 xl:w-1/5 h-screen m-auto">
            <Toaster />
            <section className="w-full">
                <BackButton route="/login" />
                <h1 className="mt-8 text-4xl text-center font-extrabold tracking-tighter">{t("reset-password.title")}</h1>
                <section className="flex flex-col mx-auto my-4">
                    <input
                        type="text"
                        placeholder={t("reset-password.name-placeholder")}
                        className="c-input__input"
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder={t("reset-password.password-placeholder")}
                        className="c-input__input mt-2"
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                    <button
                        className="c-button my-2 py-4 font-semibold"
                        onClick={notify}
                    >
                        {t("reset-password.button")}
                    </button>
                </section>
            </section>
        </section>
    );
};

export default ResetPassword;

