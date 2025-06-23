import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD4q9saPeghhPVBSpoN1EfpJW_GB2TFPtQ",
  authDomain: "demotesting-51adb.firebaseapp.com",
  projectId: "demotesting-51adb",
  storageBucket: "demotesting-51adb.firebasestorage.app",
  messagingSenderId: "697655871930",
  appId: "1:697655871930:web:f1a8ae997ef9dc5be5f583"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
    alert("No such document!");
  }
}

window.loadLogs = async function () {
  const table = document.getElementById("logTableBody");

  try {
    const docRef = doc(db, "handsignlogs", "detect");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      Object.values(data).forEach(entry => {
        const row = table.insertRow();
        row.insertCell().textContent = entry.date;
        row.insertCell().textContent = entry.day;
        row.insertCell().textContent = entry.serial_no;
        row.insertCell().textContent = entry.system_no;
        row.insertCell().textContent = entry.time;
        row.insertCell().textContent = entry.user;
      });
    } else {
      alert("No log entries found.");
    }
  } catch (error) {
    console.error("Error loading logs:", error);
  }
};

window.verifySerial = async function () {
  const serial = document.getElementById("serialInput").value;
  const detectRef = doc(db, "handsignlogs", "detect");
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
    if (!found) document.getElementById("result").innerText = "Serial number not found.";
  } else {
    document.getElementById("result").innerText = "No logs found.";
  }
}
