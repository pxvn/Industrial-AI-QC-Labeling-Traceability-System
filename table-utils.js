// Search table rows by keyword
window.searchTable = function () {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const rows = document.querySelectorAll("#logTable tbody tr");

  rows.forEach(row => {
    const cells = Array.from(row.getElementsByTagName("td"));
    const match = cells.some(cell => cell.textContent.toLowerCase().includes(input));
    row.style.display = match ? "" : "none";
  });
};

let sortDirection = true;

// Sort table by column index
window.sortTable = function (columnIndex) {
  const table = document.getElementById("logTable");
  const tbody = table.tBodies[0];
  const rows = Array.from(tbody.rows);

  rows.sort((a, b) => {
    const cellA = a.cells[columnIndex].textContent.trim().toLowerCase();
    const cellB = b.cells[columnIndex].textContent.trim().toLowerCase();
    return (cellA > cellB ? 1 : -1) * (sortDirection ? 1 : -1);
  });

  sortDirection = !sortDirection;
  rows.forEach(row => tbody.appendChild(row));
};

// Download table data as CSV
window.downloadCSV = function () {
  const rows = Array.from(document.querySelectorAll("#logTable tr"));
  const csvContent = rows.map(row =>
    Array.from(row.cells).map(cell => `"${cell.textContent}"`).join(",")
  ).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "product_verification_logs.csv"; // ✅ Updated filename
  link.click();
  URL.revokeObjectURL(url);
};
