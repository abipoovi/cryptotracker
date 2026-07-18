import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CoinChart = ({ historicaldata }) => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    console.log(historicaldata)
    if (historicaldata?.prices) {
      const dataCopy = historicaldata.prices.map((item) => ({
        date: new Date(item[0]).toLocaleDateString(),
        price: item[1],
      }));
      console.log(dataCopy)
      setDatas(dataCopy);
    }
  }, [historicaldata]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={datas}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" angle={-90} textAnchor="end" height={70} fontSize={12} />
        <YAxis domain={['auto','auto']} fontSize={12}/>
        <Tooltip />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#7927ff"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CoinChart;