"use client"
import React, {useEffect, useState} from 'react';
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter, faTelegram, faDiscord, faRedhat } from '@fortawesome/free-brands-svg-icons';
import { faSun as regularSun} from '@fortawesome/free-regular-svg-icons';
import {
    faPaperPlane,
    faArrowRightArrowLeft,
    faEllipsis,
    faAngleDown,
    faAngleRight,
    faPowerOff,
    faBug,
    faCoins,
    faSun,
    faCircleHalfStroke,
    faLanguage,
    faVolumeHigh,
    faVolumeXmark,
    faRotate,
    faGear,
    faChartLine,
    faComments,
    faArrowRight,
    faTimes,
    faBars,
    faSpinner,
    faWallet,
    faClockRotateLeft,
    faEnvelope,
    faSearch,
    faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons'


export const Icon = (props) => <FontAwesomeIcon {...props} />
export const SendIcon = (props) => <Icon icon={faPaperPlane} {...props} />
export const SwapIcon = (props) => <Icon icon={faArrowRightArrowLeft} {...props} />
export const EllipsisIcon = (props) => <Icon icon={faEllipsis} {...props} />
export const AngleDownIcon = (props) => <Icon icon={faAngleDown} {...props} />
export const AngleRightIcon = (props) => <Icon icon={faAngleRight} {...props} />
export const LogoutIcon = (props) => <Icon icon={faPowerOff} {...props} />
export const BugIcon = (props) => <Icon icon={faBug} {...props} />
export const ExplorerIcon = (props) => <Icon icon={faCoins} {...props} />
export const LightModeIcon = (props) => <Icon icon={regularSun} {...props} />
export const DarkModeIcon = (props) => <Icon icon={faSun} {...props}  />
export const AutoModeIcon = (props) => <Icon icon={faCircleHalfStroke} {...props} />
export const LangIcon = (props) => <Icon icon={faLanguage} {...props} />
export const SoundEnableIcon = (props) => <Icon icon={faVolumeHigh} {...props} />
export const SoundDisableIcon = (props) => <Icon icon={faVolumeXmark} {...props} />
export const ReloadIcon = (props) => <Icon icon={faRotate} {...props} />
export const SettingsIcon = (props) => <Icon icon={faGear} {...props} />
export const ChartIcon = (props) => <Icon icon={faChartLine} {...props} />
export const XTwitterIcon = (props) => <Icon icon={faXTwitter} {...props} />
export const TelegramIcon = (props) => <Icon icon={faTelegram} {...props} />
export const RedditIcon = (props) => <Icon icon={faXTwitter} {...props} />
export const DiscordIcon = (props) => <Icon icon={faDiscord} {...props} />
export const ChatIcon = (props) => <Icon icon={faComments} {...props} />
export const ArrowRight = (props) => <Icon icon={faArrowRight} {...props} />
export const CloseIcon = (props) => <Icon icon={faTimes} {...props} />
export const BurgerMenuIcon = (props) => <Icon icon={faBars} {...props} />
export const WalletIcon = (props) => <Icon icon={faWallet} {...props} />
export const HistoryIcon = (props) => <Icon icon={faClockRotateLeft} {...props} />
export const CoinIcon = (props) => <Icon icon={faCoins} {...props} />
export const MessageIcon = (props) => <Icon icon={faEnvelope} {...props} />
export const SearchIcon = (props) => <Icon icon={faSearch} {...props} />
export const QuestionIcon = (props) => <Icon icon={faQuestionCircle} {...props} />
// export const LoadingIcon = ({ className, ...props}) => <Icon icon={faSpinner} spinPulse={true} className={'loading-icon '+ (className || '')} {...props} />
export const LoadingIcon = ({ className, size, color, ...props}) => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        import("ldrs").then(({tailChase}) => {
            tailChase?.register();
            setLoaded(true);
        });
    }, []);
    return (loaded && <l-tail-chase size={size || 30} speed="1.75" color={color || 'black'} {...props} />);
};