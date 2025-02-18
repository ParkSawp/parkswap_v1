import React from 'react';
import { Trans } from 'react-i18next';

export default function Translate({ children, ...params }) {

    console.log({ params });

    return (
        <>
            <Trans>{children}</Trans>
        </>
    );
}