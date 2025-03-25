import React from 'react';
import {Trans, useTranslation} from 'react-i18next';

export default function Translate({ children, ...params }) {
    const { t } = useTranslation();

    return (
        <>
            <Trans>{t(children)}</Trans>
        </>
    );
}