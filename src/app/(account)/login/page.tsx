"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import environment from "@/environments/enviroment";
import imageBg from "@/assets/images/background.png";

const Login = () => {
    const { t } = useTranslation("global");
    const [user, setUser] = useState({ username: "", password: "" });
    const router = useRouter();

    useEffect(() => {
        setUser({
            username: user.username,
            password: user.password,
        });
    }, [user.username, user.password]);

    const loginHandler = async () => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        try {
            const response = await fetch(`${environment.serverBasePath}/users/${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                new Error("Failed to fetch user profile");
            }

            const userProfile = await response.json();
            const userRole = userProfile.roles[0];

            if (userRole === "ROLE_STAFF") {
                router.push("/staff/home");
            } else {
                router.push("/client/home");
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    }

    const signInHandler = async () => {
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: user.username,
                    password: user.password,
                }),
            };

            const response = await fetch(`${environment.serverBasePath}/authentication/sign-in`, requestOptions);
            if (!response.ok) {
                new Error("Login failed");
            }

            const result = await response.json();
            localStorage.setItem("token", result.token);
            localStorage.setItem("userId", result.id);
            await loginHandler();
            return result;
        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        }
    };

    const notify = () => {
        toast.promise(signInHandler(), {
            loading: t("login.notifications.in-process"),
            success: t("login.notifications.success"),
            error: t("login.notifications.error"),
        });
    };

    return (
        <section className="flex items-center h-screen">
            <Toaster />
            <section className="w-full lg:w-1/2 px-8 sm:px-40 lg:px-20 xl:px-40 2xl:px-60">
                <h1 className="mt-8 text-5xl text-center font-extrabold tracking-tighter">
                    {t("login.title")}
                </h1>
                <section className="flex flex-col mx-auto my-4">
                    <input
                        type="text"
                        placeholder={t("login.user-placeholder")}
                        className="c-input__input"
                        onChange={(e) =>
                            setUser({ ...user, username: e.target.value })
                        }
                    />
                    <input
                        type="password"
                        placeholder={t("login.password-placeholder")}
                        className="c-input__input mt-2"
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }
                    />
                    <span className="my-4 text-center">
                        <Link href="/reset-password">
                            <u>{t("login.forgot-password")}</u>
                        </Link>
                    </span>
                    <button
                        className="c-button py-4 font-semibold"
                        onClick={() => {
                            notify();
                        }}
                    >
                        {t("login.button")}
                    </button>
                </section>
                <span className="flex justify-center">
                    {t("login.no-account")}
                    <Link href="/sign-up">
                        <u>{t("login.sign-up")}</u>
                    </Link>
                </span>
            </section>
            <section className="hidden lg:flex justify-end w-1/2">
                <Image
                    src={imageBg}
                    alt="background"
                />
            </section>
        </section>
    );
};

export default Login;