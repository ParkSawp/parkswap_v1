import {useTranslation} from "react-i18next";


export default function Amount({ amount}) {
    const { i18n } = useTranslation();

    const amountFormatted = new Intl.NumberFormat(i18n.language).format(parseFloat(amount).toFixed(2));

    return (
        <>
            {amountFormatted} $
        </>
    )
}