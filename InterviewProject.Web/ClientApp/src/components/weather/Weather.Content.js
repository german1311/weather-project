import React from "react";
const formatDates = (date) => {
  const d = new Date(date);
  return d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
};

const formatDecimal = (num) => {
  return Math.round(num * 100) / 100;
};

export default function WeatherContent({ forecasts }) {
  const limitFive =
    (forecasts || []).length > 0 ? forecasts.slice(0, 5) : forecasts;
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
        {limitFive.map((forecast) => (
          <tr key={forecast.date}>
            <td>{formatDates(forecast.date)}</td>
            <td>{formatDecimal(forecast.temperatureC)}</td>
            <td>{formatDecimal(forecast.temperatureF)}</td>
            <td>{forecast.summary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
