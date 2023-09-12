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

  const [dailyData, setDailyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  // console.log(weeklyData[0].total_visitor)
  console.log(dailyData)
  console.log(monthlyData)

  useEffect(() => {
    // Function to calculate weekly data from daily data
    const calculateWeeklyData = () => {
      // Group daily data into weekly data
      const weeklyData = dailyData.reduce((weeklyData, dailyEntry) => {
        const date = dayjs(dailyEntry.date);
        const weekStart = date.startOf("week").format("YYYY-MM-DD");
        const weekEnd = date.endOf("week").format("YYYY-MM-DD");
        const weekKey = `${weekStart}-${weekEnd}`;

        if (!weeklyData[weekKey]) {
          weeklyData[weekKey] = {
            startOfWeek: weekStart,
            endOfWeek: weekEnd,
            total_visitor: 0, // Initialize total_visitor to 0
          };
        }

        weeklyData[weekKey].total_visitor += dailyEntry.total_visitor; // Add daily total_visitor to weekly total_visitor

        return weeklyData;
      }, {});

      // Convert weeklyData object into an array
      const weeklyDataArray = Object.values(weeklyData);

      // Set the weekly data in your component's state
      setWeeklyData(weeklyDataArray);
    };

    // Call the function to calculate weekly data when dailyData changes
    calculateWeeklyData();
  }, [dailyData]);

  useEffect(() => {
    // Function to calculate monthly data from weekly data
    const calculateMonthlyData = () => {
      // Group weekly data into monthly data
      const monthlyData = weeklyData.reduce((monthlyData, weeklyEntry) => {
        const monthKey = dayjs(weeklyEntry.startOfWeek).format("YYYY-MM");

        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = {
            startOfMonth: dayjs(weeklyEntry.startOfWeek).startOf("month").format("YYYY-MM-DD"),
            endOfMonth: dayjs(weeklyEntry.startOfWeek).endOf("month").format("YYYY-MM-DD"),
            total_visitor: 0, // Initialize total_visitor to 0
          };
        }

        monthlyData[monthKey].total_visitor += weeklyEntry.total_visitor; // Add weekly total_visitor to monthly total_visitor

        return monthlyData;
      }, {});

      // Convert monthlyData object into an array
      const monthlyDataArray = Object.values(monthlyData);

      // Set the monthly data in your component's state
      setMonthlyData(monthlyDataArray);
    };

    // Call the function to calculate monthly data when weeklyData changes
    calculateMonthlyData();
  }, [weeklyData]);

  useEffect(() => {
    // Function to fetch and filter data from Firestore
    const fetchDataFromFirestore = async () => {
      try {
        const collectionRef = db.collection("visitor");
        const snapshot = await collectionRef.orderBy("date", "desc").get();
        
        const filteredData = [];
        const dateMap = new Map();

        snapshot.forEach((doc) => {
          const documentData = doc.data();
          const currentDate = documentData.date;

          // Check if we have already encountered this date
          if (!dateMap.has(currentDate)) {
            dateMap.set(currentDate, documentData);
          } else {
            // If we have encountered this date, compare times and keep the latest one
            const existingData = dateMap.get(currentDate);
            if (documentData.time > existingData.time) {
              dateMap.set(currentDate, documentData);
            }
          }
        });

        // Convert the map values back to an array
        filteredData.push(...dateMap.values());

        // Set the filtered data in your component's state
        setDailyData(filteredData);
      } catch (error) {
        console.error("Error fetching and filtering data from Firestore:", error);
      }
    };

    // Call the fetch function when the component mounts
    fetchDataFromFirestore();
  }, []);

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
  const formattedDate = customDate.format('YYYY-MM-DD');

  const userData = {
    date: formattedDate,
    time: currentTime,
    total_visitor: visitorCounts.inCount,
  };

  const saveUserDataToFirestore = (userData) => {
    // Add a new document with a generated ID
    return db.collection('visitor').add(userData);
  };

  const saveWeeklyDataToFirestore = (data) => {
    // Add a new document with a generated ID
    return db.collection('visitor-weekly').add(data);
  };
  
  const saveMonthlyDataToFirestore = (data) => {
    // Add a new document with a generated ID
    return db.collection('visitor-monthly').add(data);
  };
  

  useEffect(() => {
    if (weeklyData.length > 0) {
      const userData = {
        date: `${weeklyData[0].startOfWeek} - ${weeklyData[0].endOfWeek}`,
        time: currentTime,
        total_visitor: weeklyData[0].total_visitor,
      };
      saveWeeklyDataToFirestore(userData)
    }
  }, [weeklyData])

  useEffect(() => {
    if (monthlyData.length > 0) {
      const userData = {
        date: `${monthlyData[0].startOfMonth} - ${monthlyData[0].endOfMonth}`,
        time: currentTime,
        total_visitor: monthlyData[0].total_visitor,
      };
      saveMonthlyDataToFirestore(userData)
    }
  }, [monthlyData])

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
