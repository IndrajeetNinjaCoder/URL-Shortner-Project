import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const COLORS = ["#4ade80", "#60a5fa", "#facc15", "#f87171", "#a78bfa", "#34d399"];

export const Chart = () => {
  const [click, setClick] = useState([]);
  const [deviceData, setDeviceData] = useState(new Map());
  const [browserData, setBrowserData] = useState(new Map());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/clicks");
        setClick(response.data);

        const devices = new Map();
        const browsers = new Map();
        response.data.forEach((click) => {
          // console.log(click)
          const deviceType = click.deviceType;
          const browserType = click.browser;
          devices.set(deviceType, (devices.get(deviceType) || 0) + 1);
          browsers.set(browserType, (browsers.get(browserType) || 0) + 1);
          // console.log(deviceType)
          // console.log(browserType)
        });

        setDeviceData(devices);
        setBrowserData(browsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(browserData);

  // Convert Map to array format compatible with Recharts
  const deviceChartData = Array.from(deviceData.entries()).map(
    ([name, value]) => ({
      name,
      value,
    })
  );
  const browserChartData = Array.from(browserData.entries()).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return (
    <div className="p-4 bg-white shadow-2xl rounded-2xl border border-gray-200 my-10">
      <h2 className="text-lg font-semibold mb-4">Device & Browser Breakdown</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Device Pie Chart */}
        <div>
          <h3 className="text-md font-medium mb-2">Devices</h3>
          <PieChart width={300} height={250}>
            <Pie
              data={deviceChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {deviceChartData.map((entry, index) => (
                <Cell
                  key={`device-cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Browser Pie Chart */}
        <div>
          <h3 className="text-md font-medium mb-2">Browsers</h3>
          <PieChart width={300} height={250}>
            <Pie
              data={browserChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {browserChartData.map((entry, index) => (
                <Cell
                  key={`browser-cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};
