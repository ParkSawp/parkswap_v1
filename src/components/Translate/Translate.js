import React from 'react';
import { Trans } from 'react-i18next';

export default function Translate({ children, ...params }) {

    return (
        <>
            <Trans>{children}</Trans>
        </>
    );
}