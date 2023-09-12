import AppBar from "./components/AppBar";
import Card from "./components/Card";
import CountCard from "./components/CountCard";
import ColumnChart from "./components/ColumnChart";
import firebase from 'firebase/compat/app';
import database from 'firebase/compat/database';
import 'firebase/compat/firestore';
import { firebaseConfig } from "./firebase";
import 'firebase/compat/analytics';
import { useEffect } from "react";
import { useState } from "react";
import { BrowserView, MobileOnlyView } from "react-device-detect";
import CardMobile from "./components/CardMobile";
import dayjs from 'dayjs';

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();

function App() {
  const [visitorCounts, setVisitorCounts] = useState({
    inCount: 0,
    insideCount: 0,
    outCount: 0,
    totalCount: 0,
    totalMonthly: 0,
    totalWeekly: 0
  });

  useEffect(() => {
    // Reference to the 'visitorCounts' node in the database
    const visitorCountsRef = firebase.database().ref('visitorCounts');

    // Attach a listener for 'value' events on the 'visitorCounts' node
    visitorCountsRef.on('value', (snapshot) => {
      // Convert the snapshot's value to the visitorCounts object
      const data = snapshot.val();
      setVisitorCounts(data);
    });

    // Clean up the listener when the component unmounts
    return () => visitorCountsRef.off('value');
  }, []);

  useEffect(() => {
    // Track a page view event
    firebase.analytics().logEvent('page_view');
  }, []);

  const currentTime = dayjs().format('HH:mm');
  const customDate = dayjs(); 
  const formattedDate = customDate.format('D MMMM YYYY');

  const userData = {

    date: formattedDate,
    time: currentTime,
    total_visitor: visitorCounts.inCount,
  };

  const saveUserDataToFirestore = (userData) => {
    // Add a new document with a generated ID
    return db.collection('visitor').add(userData);
  };

  const handleSaveDayCount = () => {
    saveUserDataToFirestore(userData)
      .then((docRef) => {
        alert("Data Berhasil di Simpan")
      })
      .catch((error) => {
        alert('Error adding document: ', error);
      });
  };

  return (
    <div className="sm:mx-4 px-4 py-4 sm:px-12">
        <AppBar />
        <main className="flex flex-col mt-8 justify-between gap-12">
            <BrowserView>
            <div className="flex gap-12 justify-between">
              <div className="flex flex-1 flex-col justify-between gap-12">
                <Card title="SAAT INI" count={visitorCounts.insideCount} />
                <Card title="KELUAR" variant={'success'} count={visitorCounts.outCount} />
              </div>
              <div className="flex flex-1 flex-col justify-center gap-20">
                <div className="flex flex-col gap-4">
                <CountCard title="Hari Ini" count={visitorCounts.inCount} />
                <button className="bg-[#3F3F3F] p-4 rounded-lg text-white text-2xl" onClick={handleSaveDayCount}>Simpan Data</button>
                </div>
                <CountCard title="Minggu Ini" count={visitorCounts.totalWeekly} />
                <CountCard title="Bulan Ini" count={visitorCounts.totalMonthly} />
              </div>
            </div>
            </BrowserView>
            <MobileOnlyView className="flex flex-col gap-8 justify-center">
              <CardMobile insideCount={visitorCounts.insideCount} outCount={visitorCounts.outCount}/>
              <div className="flex flex-1 flex-col justify-center gap-6">
                <div className="flex flex-col gap-4">
                <CountCard title="Hari Ini" count={visitorCounts.inCount} />
                <button className="bg-[#3F3F3F] p-4 rounded-lg text-white text-2xl" onClick={handleSaveDayCount}>Simpan Data</button>
                </div>
                <CountCard title="Minggu Ini" count={visitorCounts.totalWeekly} />
                <CountCard title="Bulan Ini" count={visitorCounts.totalMonthly} />
              </div>
            </MobileOnlyView>
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl text-center font-bold">DATA STATISTIK PENGUNJUNG</h2>
            <ColumnChart />
          </div>
        </main>
    </div>
  );
}

export default App;
