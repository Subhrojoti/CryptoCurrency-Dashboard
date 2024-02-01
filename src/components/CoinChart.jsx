import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import "./coinChart.css";
import CryptoDropdown from "./CryptoCoinsDropdown";
import Portfolio from "./Portfolio";
import { BaseUrl } from "./baseUrl";
import "./portfolio.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = ({ currency }) => {
  const { id } = useParams();
  const [days, setDays] = useState(1);
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState("line");

  useEffect(() => {
    const fetchCoinChartData = async () => {
      try {
        const defaultCoinId = "bitcoin";
        const coinId = id || defaultCoinId; // for optimization
        const { data } = await axios.get(
          `${BaseUrl}/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setChartData(data.prices);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoinChartData();
  }, [currency, id, days]);

  const myData = {
    labels: chartData.map((value) => {
      const date = new Date(value[0]);
      const time =
        date.getHours() > 12
          ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
          : `${date.getHours()} : ${date.getMinutes()} AM`;
      return days === 1 ? time : date.toLocaleDateString();
    }),

    datasets: [
      {
        label: ` Price in Past Days ${days} in ${currency}`,
        data: chartData.map((value) => value[1]),
        borderColor: "orange",
        backgroundColor: "#FFD580",
        borderWidth: "3",
      },
    ],
  };

  const handleChartTypeSelect = (selectedChartType) => {
    setChartType(selectedChartType);
  };

  return (
    <>
      <div
        className="Days "
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "10px",
          flexWrap: "wrap",
        }}
      >
        <div
          className="all-days"
          style={{
            display: "flex",
            flexGrow: "1",
            width: "auto",
            justifyContent: "space-evenly",
          }}
        >
          <button className="days-btn" onClick={() => setDays(1)}>
            1D
          </button>
          <button className="days-btn" onClick={() => setDays(7)}>
            1W
          </button>
          <button className="days-btn" onClick={() => setDays(30)}>
            1M
          </button>
          <button className="days-btn" onClick={() => setDays(180)}>
            6M
          </button>
          <button className="days-btn" onClick={() => setDays(365)}>
            1Y
          </button>
        </div>
        <CryptoDropdown
          currency={currency}
          onChartTypeSelect={handleChartTypeSelect}
        />
      </div>

      <div className="info">
        <p className="current-currency">{currency ?? "Unknown Currency"}</p>
        <p className="current-coin">
          <span className="bullet">&#8226;</span>
          {id ? id.toUpperCase() : "BITCOIN"}
        </p>
      </div>

      {chartData.length === 0 ? (
        <div className="no-data">
          <h2>CLICK ANY COIN TO ANALYSE📉📊➡</h2>
        </div>
      ) : (
        <div className="graph" style={{ minHeight: "500px" }}>
          {chartType === "line" ? (
            <Line
              data={myData}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
                maintainAspectRatio: false,
                responsive: true,
              }}
            />
          ) : chartType === "bar" ? (
            <Bar
              data={myData}
              options={{
                maintainAspectRatio: false,
                responsive: true,
              }}
            />
          ) : null}
        </div>
      )}
      <Portfolio currency={currency} />
    </>
  );
};

export default CoinChart;
