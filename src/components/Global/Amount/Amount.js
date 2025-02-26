

export default function Amount({ amount}) {

    return (
        <>
            {parseFloat(amount).toFixed(2)} $
        </>
    )
}