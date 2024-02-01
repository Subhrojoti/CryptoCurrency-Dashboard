const CoinCard = ({ item, currencySymbol }) => {
  const profit = item.market_cap_change_percentage_24h > 0;

  return (
    <>
      <div className="market-cap">
        <div>
          <div className="image flex mt-4">
            <img className="h-10 w-10 mt-2 ml-4" src={item.image} alt="logo" />
            <div className="name mt-4 ml-2 font-bold">{item.name}</div>
            <div
              className="ml-auto text-red-500 font-bold pt-2 pl-2 pr-2 pb-0 mt-"
              style={profit ? { color: "green" } : { color: "red" }}
            >
              {profit
                ? "+" + item.market_cap_change_percentage_24h.toFixed(2)
                : item.market_cap_change_percentage_24h.toFixed(2)}
            </div>
          </div>
          <div className="market-cap1 font-bold text-left ml-4 ">{`Mkt.Cap ${currencySymbol}${item.market_cap}`}</div>
        </div>
      </div>
    </>
  );
};

export default CoinCard;
