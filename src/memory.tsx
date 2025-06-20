import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type DataPoint = {
  id: number;
  timestamp: string;
  applicationId: string;
  memoryUtilization: string;
};

type Application = {
  id: string;
  name: string;
};

const MemoryChart: React.FC = () => {
  const [chartData, setChartData] = useState<{ name: string; data: [number, number][] }[]>([]);
  const [appMapping, setAppMapping] = useState<Record<string, string>>({});

  useEffect(() => {
    // Fetch application names and store them in a mapping object
    fetch("https://retoolapi.dev/71NNjB/applications")
      .then(response => response.json())
      .then((apps: Application[]) => {
        const mapping: Record<string, string> = {};
        apps.forEach(app => {
          mapping[app.id] = app.name;
        });
        setAppMapping(mapping);
      })
      .catch(error => console.error("Error fetching application data:", error));
  }, []);

  useEffect(() => {
    fetch("https://retoolapi.dev/ybFVVH/memoryutilization")
      .then(response => response.json())
      .then((data: DataPoint[]) => {
        const groupedData: Record<string, [number, number][]> = {};

        data.forEach(item => {
          const timestamp = new Date(Number(item.timestamp) * 1000).getTime();
          const value = Number(item.memoryUtilization);
          const appName = appMapping[item.applicationId] || `Unknown App (${item.applicationId})`;

          if (!groupedData[appName]) {
            groupedData[appName] = [];
          }
          groupedData[appName].push([timestamp, value]);
        });

        const formattedSeries = Object.keys(groupedData).map(appName => ({
          name: appName,
          data: groupedData[appName],
          type: "line"
        }));

        setChartData(formattedSeries);
      })
      .catch(error => console.error("Error fetching memory utilization data:", error));
  }, [appMapping]); // Re-run when appMapping updates

  const options = {
    chart: {
      height: 280
    },
    title: { text: "Memory Utilization Over Time" },
    xAxis: { type: "datetime", title: { text: "Time" } },
    yAxis: { title: { text: "Memory Utilization (MB)" } },
    series: chartData,
    legend: { enabled: true }
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default MemoryChart;
