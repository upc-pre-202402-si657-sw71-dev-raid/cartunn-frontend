"use client"
import { useState } from "react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

import EeuuFlag from "@/assets/images/eeuu-flag.webp";
import MexicoFlag from "@/assets/images/mexico-flag.webp";
import languages from "@/assets/icons/language-square.png"

const LanguageDropdown = () => {
    const { i18n } = useTranslation("global");
    const { t } = useTranslation("global");
    const [language, setLanguage] = useState("English");

    const handleChangeLangugage = (lang: string) => {
        i18n.changeLanguage(lang);
    }

    return (
        <Menu isLazy>
            <MenuButton>
                <section className="flex">
                    <Image
                        src={languages}
                        width={24}
                        alt="languages"
                        className="dark:invert"
                    />
                    <span className="ml-2">
                        {`${t("drawer.language")}: ${language}`}
                    </span>
                </section>
            </MenuButton>
            <MenuList>
                <MenuItem
                    px={6}
                    py={3}
                    _hover={{ bg: "gray.50" }}
                    onClick={ () => {
                        handleChangeLangugage("en");
                        setLanguage("english");
                    }}
                >
                    <Image
                        src={ EeuuFlag }
                        alt="Eeuu flag"
                        width={40}
                        height={40}
                        className="mr-3"
                    />
                    English
                </MenuItem>
                <MenuItem
                    px={6}
                    py={3}
                    _hover={{ bg: "gray.50" }}
                    onClick={ () => {
                        handleChangeLangugage("es");
                        setLanguage("spanish");
                    }}
                >
                    <Image
                        src={ MexicoFlag }
                        alt="Mexico flag"
                        width={40}
                        height={40}
                        className="mr-3"
                    />
                    Spanish
                </MenuItem>
            </MenuList>
        </Menu>
    );
}

export default LanguageDropdown;