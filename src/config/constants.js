import {ChatIcon, DiscordIcon, XTwitterIcon, TelegramIcon} from "@/src/components/Icon/Icon";

export const PUBLIC_WALLETCONNECT_PROJECT_ID = "d4a7715acb2b89e6fdb0480c35b71b6f";

export const MAX_ALLOWANCE =
    115792089237316195423570985008687907853269984665640564039457584007913129639935n;

export const ERC20_ABI = [
    'function transfer(address to, uint256 amount) public returns (bool)',
];

export const USD_PRICE_REFRESH_TIME = 1000;

export const MINIMUM_VALUE_TO_DISPLAY =0.0001;

export const SOCIALS_NETWORKS = [
    { icon: XTwitterIcon, href: 'https://x.com/ParkSwap_x', className: 'is-twitterX', name: 'TwitterX'},
    { icon: DiscordIcon, href: 'https://discord.gg/qVDj7wrZUd', className: 'is-discord', name: 'Discord' },
    // { icon: TelegramIcon, href: '', className: 'is-telegram', name: 'Telegram' },
    // { icon: ChatIcon, href: '', className: 'is-chat', name: 'Chat' },
];
export const ContactMails = {
    contact: 'contactparkswap@proton.me'
};

export const PORTFOLIO = {
    REFRESH_INTERVAL: 120 * 1000
};