

export default function useGetNetworks() {
    const data = [
        {
            name: 'Ethereum',
            symbol: 'ETH',
            logo_uri: '/svg/icons/eth_icon.svg'
        },
        {
            name: 'Dai',
            symbol: 'DAI',
            logo_uri: '/svg/icons/dai-logo.svg'
        },
        {
            name: 'Solana',
            symbol: 'SOL',
            logo_uri: '/svg/icons/sol-logo.svg'
        },
        {
            name: 'StarkNet',
            symbol: 'STRK',
            logo_uri: '/svg/icons/strk-logo.svg'
        }
    ];

    return {
        networks: data
    }
}