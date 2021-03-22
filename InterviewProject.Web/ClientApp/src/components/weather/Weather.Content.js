import React from "react";
const formatDates = (date) => {
  const d = new Date(date);
  return d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
};
export default function WeatherContent({ forecasts }) {
  return (
    <table className="table table-striped" aria-labelledby="tabelLabel">
      <thead>
        <tr>
          <th>Date</th>
          <th>Temp. (C)</th>
          <th>Temp. (F)</th>
          <th>Summary</th>
        </tr>
      </thead>
      <tbody>
        {forecasts.map((forecast) => (
          <tr key={forecast.date}>
            <td>{formatDates(forecast.date)}</td>
            <td>{forecast.temperatureC}</td>
            <td>{forecast.temperatureF}</td>
            <td>{forecast.summary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
