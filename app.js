// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD4q9saPeghhPVBSpoN1EfpJW_GB2TFPtQ",
  authDomain: "demotesting-51adb.firebaseapp.com",
  projectId: "demotesting-51adb",
  storageBucket: "demotesting-51adb.firebasestorage.app",
  messagingSenderId: "697655871930",
  appId: "1:697655871930:web:f1a8ae997ef9dc5be5f583"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let currentUser = null;

// Login from employeeAuth collection
async function login() {
  const empId = document.getElementById("empId").value.trim();
  const empPass = document.getElementById("empPass").value.trim();
  const error = document.getElementById("error");

  if (!empId || !empPass) {
    error.textContent = "Please enter both fields.";
    return;
  }

  try {
    const doc = await db.collection("employeeAuth").doc(empId).get();
    if (!doc.exists) {
      error.textContent = "User not found.";
      return;
    }

    const data = doc.data();
    if (data.password !== empPass) {
      error.textContent = "Incorrect password.";
    } else if (data.role !== "developer") {
      error.textContent = "Access denied. You are not authorized as a developer.";
    } else {
      currentUser = empId;
      document.getElementById("loginContainer").classList.add("hidden");
      document.getElementById("dashboard").classList.remove("hidden");
      loadLogs();
    }
  } catch (err) {
    error.textContent = "Login failed. Check console for details.";
    console.error("Login error:", err);
  }
}

function logout() {
  currentUser = null;
  document.getElementById("loginContainer").classList.remove("hidden");
  document.getElementById("dashboard").classList.add("hidden");
}

// Load all log entries
async function loadLogs() {
  const tableBody = document.querySelector("#logTable tbody");
  tableBody.innerHTML = "";

  try {
    const doc = await db.collection("handsignlogs").doc("detect").get();
    if (!doc.exists) return;

    const data = doc.data();
    Object.values(data).forEach((entry) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.serial_no}</td>
        <td>${entry.date}</td>
        <td>${entry.time}</td>
        <td>${entry.day}</td>
        <td>${entry.user}</td>
        <td>${entry.system_no}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Failed to load logs", error);
  }
}

// Filter logs by search
function filterTable() {
  const filter = document.getElementById("searchBox").value.toLowerCase();
  const rows = document.querySelectorAll("#logTable tbody tr");

  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(filter) ? "" : "none";
  });
}

// Sort table by column
function sortTable(n) {
  const table = document.getElementById("logTable");
  let switching = true, dir = "asc", switchcount = 0;

  while (switching) {
    switching = false;
    const rows = table.rows;

    for (let i = 1; i < rows.length - 1; i++) {
      let shouldSwitch = false;
      let x = rows[i].getElementsByTagName("TD")[n];
      let y = rows[i + 1].getElementsByTagName("TD")[n];

      const valX = isNaN(x.innerHTML) ? x.innerHTML.toLowerCase() : parseFloat(x.innerHTML);
      const valY = isNaN(y.innerHTML) ? y.innerHTML.toLowerCase() : parseFloat(y.innerHTML);

      if ((dir === "asc" && valX > valY) || (dir === "desc" && valX < valY)) {
        shouldSwitch = true;
        break;
      }
    }

    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount === 0 && dir === "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

// Export to CSV
function exportTableToCSV() {
  const rows = document.querySelectorAll("table tr");
  let csv = [];

  rows.forEach(row => {
    const cols = row.querySelectorAll("td, th");
    let rowData = [];
    cols.forEach(col => rowData.push(`"${col.innerText}"`));
    csv.push(rowData.join(","));
  });

  const csvBlob = new Blob([csv.join("\n")], { type: "text/csv" });
  const url = window.URL.createObjectURL(csvBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "hand_logs.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
