"use client"
import Image from "next/image";
import { Drawer, DrawerBody, DrawerHeader, DrawerFooter, DrawerOverlay, DrawerContent, Divider, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import Link from "next/link";

import LanguageDropdown from "@/components/LanguageDropdown";
import userType from "@/assets/icons/frame.png"
import menuIcon from "@/assets/icons/menu-1.png";
import productList from "@/assets/icons/document-text.png";
import favorites from "@/assets/icons/heart.png";
import notifications from "@/assets/icons/notification.png"
import shoppingCart from "@/assets/icons/shopping-cart.png";
import uploadItem from "@/assets/icons/additem.png";
import updateItem from "@/assets/icons/arrange-square-2.png";
import removeItem from "@/assets/icons/trash.png";
import manageReturns from "@/assets/icons/receipt.png";
import settings from "@/assets/icons/setting-2.png";
import help from "@/assets/icons/message.png";
import logout from "@/assets/icons/logout-1.png";
import DarkModeToggle from "@/components/DarkModeToggle";

type DrawerDashboardProps = {
    typeUser: string,
}

const DrawerDashborad = (props: DrawerDashboardProps) => {
    const { t } = useTranslation("global");
    const { isOpen, onToggle } = useDisclosure()
    const btnRef = useRef<HTMLImageElement | null>(null);

    return (
        <>
            <section className="flex justify-between items-end px-16 pt-12">
                <section className="flex items-end">
                    <Image
                        src={menuIcon}
                        width={24}
                        alt="menu"
                        className="mb-1"
                        ref={btnRef}
                        onClick={onToggle}
                    />
                    <span className="ml-4 text-2xl font-extrabold tracking-tighter">​
                        {t("drawer.dashboard-title")}
                    </span>
                </section>
                <section className="flex items-center">
                    <DarkModeToggle />
                    <section className="flex mr-4">
                        <Image
                            src={userType}
                            width={24}
                            alt="user type"
                        />
                        <span>
                            {`${t("drawer.type-user")}: ${props.typeUser}`}
                        </span>
                    </section>
                    <LanguageDropdown />
                </section>
            </section>
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onToggle}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
                    <DrawerHeader>
                        <h2 className="mt-8 text-2xl text-center font-bold tracking-tighter">
                            {t("drawer.title")}
                        </h2>
                    </DrawerHeader>
                    <DrawerBody>
                        <ul className="flex flex-col">
                            { props.typeUser === "client" ? (
                                <>
                                <span className="mb-4 px-4 text-xl font-semibold tracking-tighter">PRINCIPAL</span>
                                <Divider />
                                <li className="my-5 px-4">
                                    <Link
                                        href={`/${props.typeUser}/home`}
                                        onClick={onToggle}
                                        className="flex"
                                    >
                                        <Image
                                            src={productList}
                                            width={24}
                                            alt="products list"
                                            className="mr-2"
                                        />
                                        {t("drawer.client.products-list")}
                                    </Link>
                                </li>
                                <Divider />
                                <li className="my-5 px-4">
                                    <Link
                                        href={`/${props.typeUser}/favorites-list`}
                                        onClick={onToggle}
                                        className="flex"
                                    >
                                        <Image
                                            src={favorites}
                                            width={24}
                                            alt="favorites"
                                            className="mr-2"
                                        />
                                        {t("drawer.client.favorite-list")}
                                    </Link>
                                </li>
                                <Divider />
                                <li className="my-5 px-4">
                                    <Link
                                        href={`/${props.typeUser}/your-notifications`}
                                        onClick={onToggle}
                                        className="flex"
                                    >
                                        <Image
                                            src={notifications}
                                            width={24}
                                            alt="notifications"
                                            className="mr-2"
                                        />
                                        {t("drawer.client.your-notifications")}
                                    </Link>
                                </li>
                                <Divider />
                                <li className="my-5 px-4">
                                    <Link
                                        href={`/${props.typeUser}/all-reports`}
                                        onClick={onToggle}
                                        className="flex"
                                    >
                                        <Image
                                            src={manageReturns}
                                            width={24}
                                            alt="reports"
                                            className="mr-2"
                                        />
                                        {t("drawer.client.all-reports")}
                                    </Link>
                                </li>
                                <Divider />
                                <li className="my-5 px-4">
                                    <Link
                                        href={`/${props.typeUser}/shopping-cart`}
                                        onClick={onToggle}
                                        className="flex"
                                    >
                                        <Image
                                            src={shoppingCart}
                                            width={24}
                                            alt="shopping cart"
                                            className="mr-2"
                                        />
                                        {t("drawer.client.shopping-cart")}
                                    </Link>
                                </li>
                                <Divider />
                                <span className="mt-6 mb-2 px-4 text-xl font-semibold tracking-tighter">
                                    {t("drawer.preferences")}
                                </span>
                                <li className="my-5 px-4">
                                    <Link
                                        href={`/${props.typeUser}/configurations`}
                                        onClick={onToggle}
                                        className="flex"
                                    >
                                        <Image
                                            src={settings}
                                            width={24}
                                            alt="settings"
                                            className="mr-2"
                                        />
                                        {t("drawer.configurations")}
                                    </Link>
                                </li>
                                <Divider />
                                <li className="my-5 px-4">
                                    <Link
                                        href={`/${props.typeUser}/help`}
                                        onClick={onToggle}
                                        className="flex"
                                    >
                                        <Image
                                            src={help}
                                            width={24}
                                            alt="help"
                                            className="mr-2"
                                        />
                                        {t("drawer.help-center")}
                                    </Link>
                                </li>
                                <Divider />
                                </>
                            ): (
                                <>
                                <span className="mb-4 px-4 text-xl font-semibold tracking-tighter">PRINCIPAL</span>
                                <Divider />
                                <li className="my-5 px-4">
                                    <Link
                                        href={`/${props.typeUser}/home`}
                                        onClick={onToggle}
                                        className="flex"
                                    >
                                        <Image
                                            src={productList}
                                            width={24}
                                            alt="orders list"
                                            className="mr-2"
                                        />
                                        {t("drawer.staff.orders-list")}
                                    </Link>
                                </li>
                                <Divider />
                                <li className="my-4 px-4">
                                    <Link
                                        href={`/${props.typeUser}/upload-item`}
                                        onClick={onToggle}
                                        className="flex"
                                    >
                                        <Image
                                            src={uploadItem}
                                            width={24}
                                            alt="upload item"
                                            className="mr-2"
                                        />
                                        {t("drawer.staff.upload-item")}
                                    </Link>
                                </li>
                                <Divider />
                                <li className="my-4 px-4">
                                    <Link
                                        href={`/${props.typeUser}/update-item`}
                                        onClick={onToggle}
                                        className="flex"
                                    >
                                        <Image
                                            src={updateItem}
                                            width={24}
                                            alt="update item"
                                            className="mr-2"
                                        />
                                        {t("drawer.staff.update-item")}
                                    </Link>
                                </li>
                                <Divider />
                                <li className="my-4 px-4">
                                    <Link
                                        href={`/${props.typeUser}/remove-item`}
                                        onClick={onToggle}
                                        className="flex"
                                    >
                                        <Image
                                            src={removeItem}
                                            width={24}
                                            alt="remove item"
                                            className="mr-2"
                                        />
                                        {t("drawer.staff.remove-item")}
                                    </Link>
                                </li>
                                <Divider />
                                <li className="my-4 px-4">
                                    <Link
                                        href={`/${props.typeUser}/manage-returns`}
                                        onClick={onToggle}
                                        className="flex"
                                    >
                                        <Image
                                            src={manageReturns}
                                            width={24}
                                            alt="manage returns"
                                            className="mr-2"
                                        />
                                        {t("drawer.staff.manage-returns")}
                                    </Link>
                                </li>
                                <Divider />
                                <span className="mt-6 mb-2 px-4 text-xl font-semibold tracking-tighter">Preferences</span>
                                <li className="my-5 px-4">
                                    <Link
                                        href={`/${props.typeUser}/configurations`}
                                        onClick={onToggle}
                                        className="flex"
                                    >
                                        <Image
                                            src={settings}
                                            width={24}
                                            alt="settings"
                                            className="mr-2"
                                        />
                                        {t("drawer.configurations")}
                                    </Link>
                                </li>
                                <Divider />
                                <li className="my-5 px-4">
                                    <Link
                                        href={`/${props.typeUser}/help`}
                                        onClick={onToggle}
                                        className="flex"
                                    >
                                        <Image
                                            src={help}
                                            width={24}
                                            alt="help"
                                            className="mr-2"
                                        />
                                        {t("drawer.help-center")}
                                    </Link>
                                </li>
                                <Divider />
                                </>
                            )}
                        </ul>
                    </DrawerBody>
                    <DrawerFooter>
                        <section className="flex justify-self-start w-full my-5 px-4">
                            <Link
                                href="/login"
                                onClick={ () => {
                                    onToggle();
                                    localStorage.removeItem("token");
                                }}
                                className="flex"
                            >
                                <Image
                                    src={logout}
                                    width={24}
                                    alt="logout"
                                    className="mr-2"
                                />
                                {t("drawer.logout")}
                            </Link>
                        </section>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default DrawerDashborad;