import { CHAIN, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { Address } from "ton-core";
import { SenderArguments } from "ton-core";
import { Sender } from "ton-core";

export function useTonConnect(): {
    sender: Sender;
    //будет возвращать sender
    connected: boolean;
    //флаг
    wallet: string | null;
    network: CHAIN | null;
} {
    const [tonConnectUI] = useTonConnectUI()
    //объект tonConnectUI с его помощью сможем отправлять транзакции
    const wallet = useTonWallet()
    //для доставания адреса кошелька

    return {
        sender: {
            send: async (args: SenderArguments) => {
                //асинхронная функция которая будет принимать аргументы
              tonConnectUI.sendTransaction({
                  //отправка транзакций через объект tonConnectUI
                messages: [
                  {
                    address: args.to.toString(),
                      //адрес на какой контракт будем отправлять сообщение
                    amount: args.value.toString(),
                    payload: args.body?.toBoc().toString("base64"),
                      //тело сообщения в формате ячейки и нам нужно преобразовать в формат base64
                  },
                ],
                validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
                  //сколько сообщения будут валидными
              });
            },
            address: wallet?.account?.address ? Address.parse(wallet?.account?.address as string) : undefined
            //parse() это статический метод класса Address - можно использовать без создания инстанса
          }, 

        connected: !!wallet?.account.address,
        //если у wallet существует какой-то адресс, то это означает что мы подключены
        wallet: wallet?.account.address ?? null,
        network: wallet?.account.chain ?? null
        //Есть ли у объекта "wallet" свойство "account", и если есть, то возвращает значение свойства "chain"
        // этого объекта. Если свойство "account" или "chain" не существует, то возвращается значение "null"
    }
}