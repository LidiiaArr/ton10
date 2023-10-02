import { getHttpEndpoint } from "@orbs-network/ton-access";
import { CHAIN } from "@tonconnect/ui-react";
import { TonClient } from "ton";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";

export function useTonClient() {
    const {network} = useTonConnect()

    return {
        client: useAsyncInitialize(async ()=>{
            if(!network) return;

            return new TonClient({
                endpoint: await getHttpEndpoint({
                    network: network === CHAIN.MAINNET ? "mainnet" : "testnet"
                })
            })
        }, [network])
    }
}

//будет возвращаеть клиент который подключен к нодам блокчейна
//при помощи клиента мы сможем читать информацию из блокчейна
//отправлять транзакции в блокчейн
