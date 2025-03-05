

export default function Amount({ amount}) {

    const amountFormatted = new Intl.NumberFormat("en-IN").format(parseFloat(amount).toFixed(2));

    return (
        <>
            {amountFormatted} $
        </>
    )
}