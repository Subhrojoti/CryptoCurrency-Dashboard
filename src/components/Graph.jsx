// Graph.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "./baseUrl";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import CoinChart from "./CoinChart";

const Graph = ({ currency }) => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const getCoin = async () => {
      try {
        const { data } = await axios.get(`${BaseUrl}/coins/${id}`);
        //console.log(data);
        setCoin(data); // Store the data in state
        setLoading(false); // Set loading to false when data is loaded
      } catch (error) {
        console.log(error);
        setLoading(false); // to handel error
      }
    };

    getCoin();
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <CoinChart currency={currency} />
        </>
      )}
    </>
  );
};

export default Graph;
