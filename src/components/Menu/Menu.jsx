import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import styles from "./Menu.module.css";
import CustomConnectButton from "@/src/components/Global/CustomConnectButton/CustomConnectButton";
import { useAccount, useDisconnect } from "wagmi";
import { AngleDownIcon, LogoutIcon, BugIcon, ExplorerIcon, CloseIcon, BurgerMenuIcon } from "@/src/components/Icon/Icon";
import ColorSchemeButton from "@/src/components/Menu/ColorSchemeButton/ColorSchemButton";
import LangButton from "@/src/components/Menu/LangButton/LangButton";
import NotificationSoundButton from "@/src/components/Menu/NotificationSoundButton/NotificationSoundButton";
import {useTranslation} from "react-i18next";


const MenuList = ({ menu }) =>  {

    const availableMenu = menu.filter((item) => item.available);

    return (
        <ul className={styles["nav-menu-list-container"]} >
            {
                availableMenu.map((menuItem, index) => {
                    const submenus = menuItem.submenus?.filter((item) => item.available) || [];
                    const hasSubMenu = submenus.length > 0;

                    return (
                        <li className={styles["nav-menu-item"]} key={'menu-'+index} >
                            {
                                menuItem.isComponent
                                ?  <menuItem.Component className={menuItem.className} onClick={menuItem.onClick}  />
                                : (
                                    <div className={menuItem.className +' '+ styles['nav-menu-item-description']}  onClick={menuItem.onClick} >
                                        {
                                            menuItem.icon
                                            &&
                                            (
                                                typeof menuItem.icon === 'string'
                                                    ? <img width={22} height={22} src={menuItem.icon} alt={menuItem.text}/>
                                                    : menuItem.icon
                                            )
                                        }
                                        <Link href={menuItem.href || ''} target={menuItem.target} className={styles['nav-menu-item-link']} >{menuItem.text}</Link>
                                        { hasSubMenu && <AngleDownIcon /> }
                                    </div>
                                )
                            }

                            {
                                hasSubMenu
                                &&
                                (
                                    <div className={styles["nav-menu-submenu"]}>
                                        <ul>
                                            {
                                                submenus.map((subMenuItem, index) => (
                                                    <li key={'submenu-'+index} className={styles["nav-menu-submenu-item"]} >
                                                        <a href={subMenuItem.href} target={subMenuItem.target} className={styles["nav-menu-submenu-link"]} onClick={subMenuItem.onClick} >
                                                            <span className={styles["icon"]}>
                                                                {
                                                                    typeof subMenuItem.icon === 'string'
                                                                        ? <img width="20px" height="20px" src={subMenuItem.icon} alt={subMenuItem.text}/>
                                                                        : subMenuItem.icon
                                                                }
                                                            </span>
                                                            <span className={styles["title"]}>{subMenuItem.text}</span>
                                                        </a>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                )
                            }
                        </li>
                    )
                })
            }
        </ul>
    )
}


const Menu = ({openSettings, settingsButtonVal}) => {
    const { disconnect } = useDisconnect()
    const {  isDisconnected } = useAccount();
    const { t } = useTranslation();

    const [isMobileMenuExtended, setIsMobileMenuExtended] = useState(false);

    const leftMenu = [
        {
            href: '/home',
            text: t('Home'),
            title: '',
            available: true,
            icon: null,
            submenus: []
        },
        {
            href: '/app',
            text: t('Trade'),
            title: '',
            available: true,
            icon: null,
            submenus: [
                {
                    href: '/',
                    text: t('Simple mode'),
                    title: t('The most user-friendly way to trade'),
                    available: false,
                    icon: '/svg/icons/simple_mode.svg'
                },
                {
                    href: '/',
                    text: t('Advanced Mode'),
                    title: t('Take advantage of all the familiar tools'),
                    available: false,
                    icon: '/svg/icons/advanced_mode.svg'
                },
                {
                    href: '/',
                    text: t('Limit Order'),
                    title: t('Schedule a swap to get the best price'),
                    available: false,
                    icon: '/svg/icons/limit_order.svg',
                }
            ]
        },
        {
            href: '/portfolio',
            text: t('Portfolio'),
            title: '',
            available: false,
            icon: null,
            submenus: []
        },
        {
            href: '/',
            text: t('Marché'),
            title: '',
            available: false,
            icon: null,
            submenus: [
                {
                    href: '/',
                    text: t('Marché DeFi'),
                    title: t('Decentralize finance'),
                    available: false,
                    icon: '/svg/icons/simple_mode.svg',
                },
                {
                    href: '/',
                    text: t('Marché Trad.Fi'),
                    title: t('Traditional Finance'),
                    available: false,
                    icon: '/svg/icons/advanced_mode.svg',
                }
            ]
        },
        {
            href: '/Bridge',
            text: t('Bridge'),
            title: t('bridge'),
            available: false,
            icon: null,
            submenus: []
        },
        {
            href: '/',
            text: t('Plus'),
            title: t('More'),
            available: false,
            icon: null,
            submenus: [
                {
                    href: '/',
                    text: t('Documentation'),
                    title: t('Documentation'),
                    available: false,
                    icon: '/svg/icons/doc_icon.svg',
                },
                {
                    href: '',
                    text: t('Blog'),
                    title: t('Blog'),
                    available: false,
                    icon: '/svg/icons/blog_icon.svg',
                },
                {
                    href: '/',
                    text: t('Help'),
                    title: t('Help'),
                    available: false,
                    icon: '/svg/icons/help_icon.svg',
                },
                {
                    href: '/',
                    text: t('Stats'),
                    title: t('Stats'),
                    available: false,
                    icon: '/svg/icons/screening_icon.svg',
                },
                {
                    href: '/',
                    text: t('About'),
                    title: t('About'),
                    available: false,
                    icon: '/svg/icons/about_icon.svg',
                },
                {
                    href: '/',
                    text: t('Suggest a Feature'),
                    title: t('Suggest a Feature'),
                    available: false,
                    icon: '/svg/icons/suggest_icon.svg',
                },
                {
                    href: '/',
                    text: t('Report a Bug'),
                    title: t('Report a Bug'),
                    available: false,
                    icon: '/svg/icons/bug_icon.svg',
                },
            ]
        }
    ];
    const rightButtonsMenu = [
        {
            href: '/',
            text: t('Base Mainnet'),
            title: '',
            available: true,
            icon: '/svg/icons/base-logo.svg',
            className: styles['network-btn'],
            submenus: [
                {
                    href: 'https://basescan.org/',
                    target: '_blank',
                    text: t('Base Scan'),
                    title: t('Base Scan'),
                    available: true,
                    icon: <BugIcon />,
                },
                {
                    href: '/explorer',
                    target: '_blank',
                    text: t('ParkSwap Explorer'),
                    title: t('ParkSwap Explorer'),
                    available: false,
                    icon: <ExplorerIcon />,
                },
            ]
        },
        {
            isComponent: true,
            available: true,
            Component: CustomConnectButton,
            submenus: (
                !isDisconnected ? [
                    {
                        text: t("Log out"),
                        available: true,
                        onClick: disconnect,
                        icon: <LogoutIcon />
                    },
                ]: null
            )
        },
    ]
    const rightMenu = [
        {
            isComponent: true,
            available: true,
            className: styles['circular-menu-item'],
            Component: ColorSchemeButton,
        },
        {
            isComponent: true,
            available: true,
            className: styles['circular-menu-item'],
            Component: LangButton,
        },
        {
            isComponent: true,
            available: true,
            className: styles['circular-menu-item'],
            Component: NotificationSoundButton,
        }
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuExtended(!isMobileMenuExtended);
    };

    return(
        <nav className={styles["app-navigation"]+ ' '+ (!isMobileMenuExtended ? styles['mobile-navigation-not-extended'] : '')}>
          <div className={styles["app-navigation-logo"]}>
            <Link href="/" className={styles["app-navigation-home-link"]}>
              <Image
                src="/img/main_logo.png"
                width={44}
                height={40}
                alt="ParkSwap Logo"
              />
            </Link>
              <div className={styles["app-navigation-close"]} onClick={toggleMobileMenu}>
                  {
                      isMobileMenuExtended
                        ? <CloseIcon />
                        : <BurgerMenuIcon />
                  }


              </div>
          </div>
          <div className={styles["app-navigation-nav"]}>
              <MenuList menu={leftMenu} />
          </div>
          <div className={styles["app-navigation-buttons"]}>
              <MenuList menu={rightButtonsMenu}  />
              <MenuList menu={rightMenu}  />
          </div>
        </nav>
    )
}

export default Menu