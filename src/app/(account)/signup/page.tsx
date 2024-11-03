"use client";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Link from "next/link";
import {Radio, RadioGroup, Stack} from "@chakra-ui/react";
import toast, {Toaster} from "react-hot-toast";
import {useRouter} from "next/navigation";
import BackButton from "@/components/BackButton";
import environment from "@/environments/enviroment";
import prohibitedWordsData from "@/translations/prohibitedWords.json";

const SignUp = () => {
    const { t } = useTranslation("global");
    const [role, setRole] = useState("1");
    const [user, setUser] = useState({ username: "", password: "" });
    const router = useRouter();
    const [allProhibitedWords, setAllProhibitedWords] = useState([]);

    useEffect(() => {
        const mergedWords = Object.values(prohibitedWordsData.prohibitedWords).flat();
        setAllProhibitedWords(mergedWords.map(word => word.toLowerCase()));
    }, []);

    const validateUsername = (username) => {
        return !allProhibitedWords.some(word => username.toLowerCase().includes(word));
    };

    const isPasswordValid = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
    };

    const signUpHandler = async () => {
        const userRequestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password,
            }),
        };

        try {
            const userResponse = await fetch(`${environment.serverBasePath}/authentication/sign-up`, userRequestOptions);
            if (!userResponse.ok) new Error(t("sign-up.notifications.error.register"));
            return await userResponse.json();
        } catch (error) {
            console.error(error);
            throw new Error(t("sign-up.notifications.error.server"));
        }
    };

    const handleSubmit = async () => {
        if(user.username == "" || user.password == ""){
            toast.error(t("sign-up.notifications.error.incomplete"));
            return;
        }
        if (!validateUsername(user.username)) {
            toast.error(t("sign-up.notifications.error.invalid-username"));
            return;
        }

        if (!isPasswordValid(user.password)) {
            toast.error(t("sign-up.notifications.error.weak-password"));
            return;
        }

        try {
            await signUpHandler();
            if (role === "2") {
                localStorage.setItem('user', JSON.stringify({ username: user.username, password: user.password, role: role }));
            }
            toast.success(t("sign-up.notifications.success"));
            router.push("/login");
        } catch (error) {
            toast.error(t("sign-up.notifications.error.server"));
        }
    };

    const notify = () => {
        handleSubmit();
    };

    return (
        <section className="flex items-center w-full sm:w-1/2 xl:w-1/5 h-screen m-auto">
            <Toaster />
            <section className="w-full">
                <BackButton route="/login" />
                <h1 className="mt-8 text-5xl text-center font-extrabold tracking-tighter">
                    {t("sign-up.title")}
                </h1>
                <section className="flex flex-col mx-auto my-4">
                    <input
                        type="text"
                        placeholder={t("sign-up.name-placeholder")}
                        className="c-input__input"
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder={t("sign-up.password-placeholder")}
                        className="c-input__input mt-2"
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                    <RadioGroup onChange={setRole} value={role}>
                        <Stack my={4}>
                            <span>{t("sign-up.sign-up-as")}</span>
                            <section className="flex">
                                <Radio value="1" mr={4}>
                                    {t("sign-up.client")}
                                </Radio>
                                <Radio value="2">
                                    {t("sign-up.staff")}
                                </Radio>
                            </section>
                        </Stack>
                    </RadioGroup>
                    <button
                        className="c-button py-4 font-semibold"
                        onClick={notify}
                    >
                        {t("sign-up.button")}
                    </button>
                </section>
                <span className="flex justify-center">
                    {t("sign-up.already-have-an-account")}
                    <Link href="/login">
                        <u>{t("sign-up.login")}</u>
                    </Link>
                </span>
            </section>
        </section>
    );
};

export default SignUp;