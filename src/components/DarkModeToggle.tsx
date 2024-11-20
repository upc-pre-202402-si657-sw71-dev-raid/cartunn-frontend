import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import SunLogo from "@/assets/icons/sun.png";
import MoonLogo from "@/assets/icons/moon.png";

function DarkModeToggle() {
    const { t } = useTranslation("global");
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle("dark", !darkMode);
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="flex pr-4"
            aria-label={darkMode ? "Modo Claro" : "Modo Oscuro"}
        >
            {darkMode ? (
                <Image
                    src={SunLogo}
                    width={24}
                    alt="user type"
                    className="dark:invert"
                />
            ) : (
                <Image
                    src={MoonLogo}
                    width={24}
                    alt="user type"
                />
            )}
            <span className="ml-2">{t("dark-mode")}</span>
        </button>
    );
}

export default DarkModeToggle;