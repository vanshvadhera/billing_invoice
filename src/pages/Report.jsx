import { useEffect, useMemo, useState } from "react";
import { Pie } from "react-chartjs-2";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getUserInvoice } from "../component/ApiFunction";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const quarters = ["Q1", "Q2", "Q3", "Q4"];
const colors = [
  "#007bff", "#28a745", "#ffc107", "#dc3545", "#6610f2", "#20c997",
  "#fd7e14", "#6f42c1", "#17a2b8", "#e83e8c", "#343a40", "#adb5bd"
];

const Report = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("Year");
  const [selectedYear, setSelectedYear] = useState("2025");

  useEffect(() => { getUserInvoice(setInvoices, setLoading); }, []);

  const years = useMemo(() =>
    [...new Set(invoices.map(i => new Date(i.date).getFullYear()))].sort((a, b) => b - a),
    [invoices]
  );

  const groupedData = useMemo(() => {
    const data = {};
    invoices.forEach(inv => {
      const date = new Date(inv.date);
      const year = date.getFullYear();
      const month = months[date.getMonth()];
      const quarter = `Q${Math.floor(date.getMonth() / 3) + 1}`;
      data[year] ??= { months: {}, quarters: {} };
      data[year].months[month] ??= [];
      data[year].quarters[quarter] ??= [];
      data[year].months[month].push(inv);
      data[year].quarters[quarter].push(inv);
    });
    return data;
  }, [invoices]);

  const getStats = (list) => ({
    clients: new Set(list.map(i => i.client_id)).size,
    count: list.length,
    total: list.reduce((sum, i) => sum + Number(i.totalAmount || 0), 0)
  });

  const getFilteredKeys = () =>
    filterType === "Year" ? [selectedYear] : filterType === "Quarter" ? quarters : months;

  const getFilteredList = (key) => {
    if (filterType === "Year") return Object.values(groupedData[selectedYear]?.months || {}).flat();
    const section = filterType === "Month" ? "months" : "quarters";
    return groupedData[selectedYear]?.[section]?.[key] || [];
  };

  const pieChartData = useMemo(() => {
    const keys = getFilteredKeys();
    const tooltipMap = {};
    const data = keys.map(key => {
      const list = getFilteredList(key);
      const stats = getStats(list);
      tooltipMap[key] = stats;
      return stats.clients; // <- showing Clients in pie chart
    });
  
    return {
      labels: keys,
      datasets: [{
        label: "Clients",
        data,
        backgroundColor: colors.slice(0, keys.length)
      }],
      tooltipMap
    };
  }, [groupedData, selectedYear, filterType]);

  const pieOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: ({ label }) => {
            const d = pieChartData.tooltipMap[label];
            return [
              `Invoices: ${d.count}`,
              `Bill: ₹${d.total.toFixed(2)}`,
              `Year: ${selectedYear}`
            ];
          }
        }
      },
      legend: { position: "bottom" }
    }
  };

  const handleDownloadExcel = () => {
    const rows = getFilteredKeys().map(key => {
      const list = getFilteredList(key);
      const { clients, count, total } = getStats(list);
      return count > 0 && {
        [filterType]: key,
        Clients: clients,
        Invoices: count,
        "Bill Amount (₹)": total.toFixed(2)
      };
    }).filter(Boolean);

    const sheet = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, `${filterType} Report`);
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), `Report-${filterType}-${selectedYear}.xlsx`);
  };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center bg-white border-0">
          <h5 className="mb-0">{filterType} Report - {selectedYear}</h5>
          <div className="d-flex gap-2">
            <select className="form-select w-auto" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="Year">Sort by Year</option>
              <option value="Quarter">Sort by Quarter</option>
              <option value="Month">Sort by Month</option>
            </select>
            <button onClick={handleDownloadExcel} className="btn btn-outline-success">Download Excel</button>
          </div>
        </div>

        {loading ? (
          <div className="text-center my-4"><div className="spinner-border text-primary" /></div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-bordered mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>{filterType}</th>
                    <th>Clients</th>
                    <th>Invoices</th>
                    <th>Bill Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredKeys().map(key => {
                    const { clients, count, total } = getStats(getFilteredList(key));
                    return (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{clients}</td>
                        <td>{count}</td>
                        <td>₹{total.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="card-body">
              <h6 className="mb-3">Bill Amount Breakdown - Pie Chart</h6>
              <div style={{ maxWidth: 400, height: 400, margin: "0 auto" }}>
                <Pie data={pieChartData} options={pieOptions} />
              </div>
            </div>
          </>
        )}

        {!loading && (
          <div className="card-footer bg-white text-end">
            {years.map(yr => (
              <button
                key={yr}
                className={`btn btn-outline-primary ms-2 ${selectedYear === String(yr) ? "active" : ""}`}
                onClick={() => setSelectedYear(String(yr))}
              >
                {yr}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Report;
