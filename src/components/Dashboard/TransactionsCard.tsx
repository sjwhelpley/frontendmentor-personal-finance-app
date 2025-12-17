import Image from "next/image";
import data from "../../data.json";
import CardTemplate from "./CardTemplate";

export default function TransactionsCard() {
  const { transactions } = data;

  function Transaction({
    transaction,
    lastItem,
  }: {
    transaction: { avatar: string; name: string; date: string; amount: number };
    lastItem: boolean;
  }) {
    const { avatar, name, date, amount } = transaction;

    return (
      <div>
        <div className="flex flex-row items-center justify-between gap-[16px]">
          <div className="flex flex-row items-center gap-[16px]">
            <Image
              src={avatar}
              alt="Avatar"
              width="40"
              height="40"
              className="rounded-[50%]"
            />
            <p className="text-preset-4-bold">{name}</p>
          </div>

          <div className="flex flex-col items-end">
            <p
              className="text-preset-4-bold"
              style={{ color: amount < 0 ? "#201F24" : "#277C78" }}
            >
              {amount < 0
                ? `-${Math.abs(amount).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}`
                : `+${amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}`}
            </p>
            <p className="text-preset-5 text-[#696868]">
              {new Date(date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {!lastItem && (
          <div className="w-full border-b-1 border-[#F2F2F2] my-[20px]"></div>
        )}
      </div>
    );
  }

  return (
    <CardTemplate
      titleLabel="Transactions"
      buttonLabel="View All"
      buttonClickPath="/transactions"
    >
      <div className="mt-[20px]">
        <div className="w-full">
          {transactions.slice(0, 5).map((t, index) => (
            <Transaction key={t.date} transaction={t} lastItem={index === 4} />
          ))}
        </div>
      </div>
    </CardTemplate>
  );
}
