import AlchemyProvider from "@/src/core/ApiServices/TokensProvider/AlchemyProvider";


export default class ParkSwapFee {

    public static async getFeeBps(symbol: string, amount: number): Promise<{fee: number}> {
        let fee = Number(process.env.API_FEE_BPS);
        try {
            const response = await AlchemyProvider.usd(symbol);

            let amountTotal = 0;

            if(response.value) {
                amountTotal = amount * response.value;
                if(amountTotal > 10000 && amountTotal < 100000) {
                    fee = Number(process.env.API_FEE_L2_BPS || '200');
                }
                else if(amountTotal > 100000) {
                    fee = Number(process.env.API_FEE_L3_BPS || '300');
                }
            }

            console.log({ feeCalculator: fee, amountTotal, response, symbol });
        } catch (e) {}

        return { fee };
    }

}