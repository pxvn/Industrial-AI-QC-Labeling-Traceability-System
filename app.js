// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4q9saPeghhPVBSpoN1EfpJW_GB2TFPtQ",
  authDomain: "demotesting-51adb.firebaseapp.com",
  projectId: "demotesting-51adb",
  storageBucket: "demotesting-51adb.firebasefirestorage.app",
  messagingSenderId: "697655871930",
  appId: "1:697655871930:web:f1a8ae997ef9dc5be5f583"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Employee login handler
window.loginEmployee = async function () {
  const id = document.getElementById("empId").value;
  const password = document.getElementById("empPass").value;

  const docRef = doc(db, "employeeAuth", "EmployeeList");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    if (data.Id === id && data.Password === password) {
      localStorage.setItem("employeeName", data.Name);
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid ID or Password");
    }
  } else {
    alert("No such employee record found!");
  }
};

// Load product verification logs
window.loadLogs = async function () {
  const table = document.getElementById("logTableBody");

  try {
    const docRef = doc(db, "productLogs", "verify");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      Object.values(data).forEach(entry => {
        const row = table.insertRow();
        row.insertCell().textContent = entry.date;
        row.insertCell().textContent = entry.day;
        row.insertCell().textContent = entry.serial_no;
        row.insertCell().textContent = entry.product_name || "N/A";
        row.insertCell().textContent = entry.time;
        row.insertCell().textContent = entry.verified_by || entry.user || "Unknown";
      });
    } else {
      alert("No product verification entries found.");
    }
  } catch (error) {
    console.error("Error loading verification logs:", error);
  }
};

// Serial number verification handler
window.verifySerial = async function () {
  const serial = document.getElementById("serialInput").value;
  const detectRef = doc(db, "productLogs", "verify");
  const detectSnap = await getDoc(detectRef);

  if (detectSnap.exists()) {
    const data = detectSnap.data();
    let found = false;

    for (const key in data) {
      if (data[key].serial_no == serial) {
        document.getElementById("result").innerText = JSON.stringify(data[key], null, 2);
        found = true;
        break;
      }
    }

    if (!found) {
      document.getElementById("result").innerText = "Product with this serial number not found.";
    }
  } else {
    document.getElementById("result").innerText = "No verification logs available.";
  }
};
