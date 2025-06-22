// Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyD4q9saPeghhPVBSpoN1EfpJW_GB2TFPtQ",
  authDomain: "demotesting-51adb.firebaseapp.com",
  projectId: "demotesting-51adb",
  storageBucket: "demotesting-51adb.firebasestorage.app",
  messagingSenderId: "697655871930",
  appId: "1:697655871930:web:f1a8ae997ef9dc5be5f583"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function fetchData() {
  const serial = document.getElementById("serialInput").value;
  const resultDiv = document.getElementById("result");
  const errorMsg = document.getElementById("errorMsg");

  resultDiv.classList.add("hidden");
  errorMsg.textContent = "";

  if (!serial) {
    errorMsg.textContent = "Please enter a serial number.";
    return;
  }

  try {
    const doc = await db.collection("handsignlogs").doc("detect").get();
    if (doc.exists) {
      const data = doc.data();
      const entry = data[`entry_${serial}`];
      if (entry) {
        document.getElementById("serial").textContent = entry.serial_no;
        document.getElementById("date").textContent = entry.date;
        document.getElementById("time").textContent = entry.time;
        document.getElementById("day").textContent = entry.day;
        document.getElementById("user").textContent = entry.user;
        resultDiv.classList.remove("hidden");
      } else {
        errorMsg.textContent = "No record found for that serial number.";
      }
    } else {
      errorMsg.textContent = "No data available in Firestore.";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    errorMsg.textContent = "An error occurred while fetching data.";
  }
}
