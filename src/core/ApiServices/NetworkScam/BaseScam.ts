

export default class BaseScam {


    public static async getTransactionByHash(hash: string): Promise<any> {

        const params = new URLSearchParams({
            apikey: process.env.BASE_SCAM_API_KEY,
            module: 'transaction',
            action: 'getstatus',
            txhash: hash,
        });

        const res = await fetch(process.env.BASE_SCAM_URL +'?'+ params.toString());
        return await res.json();
    }


}