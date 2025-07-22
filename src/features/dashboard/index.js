import React, { useState, useEffect } from "react";
import {
  Heart,
  Users,
  Calendar,
  UserCheck,
  Building,
  Droplets,
  Activity,
  Weight,
  Thermometer,
  Wind,
  Stethoscope,
  FileText,
  BarChart3,
  Settings,
  Plus,
  Search,
  Bell,
  Maximize,
  Mic,
  Phone,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const VitalStatsCard = ({
  icon: Icon,
  title,
  value,
  unit,
  lastRecorded,
  color,
  delay = 0,
  isUpdating = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (isUpdating) {
      setPulseAnimation(true);
      const timer = setTimeout(() => setPulseAnimation(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isUpdating, value]);

  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${pulseAnimation ? "ring-2 ring-blue-200 ring-opacity-75" : ""}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-3 rounded-full ${color} transform transition-all duration-300 ${
            pulseAnimation ? "scale-110 shadow-lg" : "hover:scale-110"
          }`}
        >
          <Icon
            className={`w-6 h-6 text-white transition-all duration-300 ${
              pulseAnimation ? "animate-pulse" : ""
            }`}
          />
        </div>
        {isUpdating && (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            <span className="text-xs text-green-600 font-medium">LIVE</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <span
            className={`text-2xl font-bold text-gray-900 transition-all duration-500 ${
              pulseAnimation ? "text-blue-600" : ""
            }`}
          >
            {value}
          </span>
          <span className="text-sm font-medium text-gray-500">{unit}</span>
        </div>
        <p
          className={`text-xs transition-colors duration-300 ${
            pulseAnimation ? "text-green-600" : "text-gray-400"
          }`}
        >
          {lastRecorded}
        </p>
        <p className="text-sm font-medium text-gray-700">{title}</p>
      </div>

      <div
        className={`mt-4 h-1 ${color.replace(
          "bg-",
          "bg-gradient-to-r from-"
        )} rounded-full transform transition-all duration-1000 ${
          isVisible ? "scale-x-100" : "scale-x-0"
        } origin-left ${pulseAnimation ? "animate-pulse" : ""}`}
      ></div>
    </div>
  );
};

const ECGCard = ({
  title,
  value,
  unit,
  lastRecorded,
  color,
  delay = 0,
  isUpdating = false,
  ecgData,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [pulseAnimation, setPulseAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (isUpdating) {
      setPulseAnimation(true);
      const timer = setTimeout(() => setPulseAnimation(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isUpdating, value]);

  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      } ${pulseAnimation ? "ring-2 ring-blue-200 ring-opacity-75" : ""}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-3 rounded-full ${color} transform transition-all duration-300 ${
            pulseAnimation ? "scale-110 shadow-lg" : "hover:scale-110"
          }`}
        >
          <Heart
            className={`w-6 h-6 text-white transition-all duration-300 ${
              pulseAnimation ? "animate-pulse" : ""
            }`}
          />
        </div>
        {isUpdating && (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
            <span className="text-xs text-red-600 font-medium">LIVE ECG</span>
          </div>
        )}
      </div>

      {/* Heart Rate Value */}
      <div className="flex items-baseline space-x-2 mb-3">
        <span
          className={`text-2xl font-bold text-white-900 transition-all duration-500 ${
            pulseAnimation ? "text-blue-600" : ""
          }`}
        >
          {value}
        </span>
        <span className="text-sm font-medium text-gray-500">{unit}</span>
      </div>

      {/* ECG Chart */}
      <div className="h-20 mb-3 bg-white-900 rounded-lg p-2 relative overflow-hidden">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 300 60"
          className="absolute inset-0"
        >
          {/* Grid */}
          <defs>
            <pattern
              id="ecg-grid"
              width="15"
              height="12"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 15 0 L 0 0 0 12"
                fill="none"
                stroke="#374151"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
            <pattern
              id="ecg-grid-major"
              width="75"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 75 0 L 0 0 0 60"
                fill="none"
                stroke="#f3f3f3ff"
                strokeWidth="0.8"
                opacity="0.4"
              />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#ecg-grid)" />
          <rect width="100%" height="100%" fill="url(#ecg-grid-major)" />

          {/* ECG Waveform */}
          {ecgData && ecgData.length > 0 && (
            <polyline
              fill="none"
              stroke="#b92410ff"
              strokeWidth="1.5"
              points={ecgData
                .map(
                  (point, i) =>
                    `${(i / ecgData.length) * 300},${30 - point.voltage * 25}`
                )
                .join(" ")}
              className="drop-shadow-sm"
            />
          )}

          {/* Y-axis labels */}
          <text x="5" y="10" fill="#9CA3AF" fontSize="8" fontFamily="monospace">
            +1mV
          </text>
          <text x="5" y="35" fill="#9CA3AF" fontSize="8" fontFamily="monospace">
            0mV
          </text>
          <text x="5" y="55" fill="#9CA3AF" fontSize="8" fontFamily="monospace">
            -1mV
          </text>

          {/* X-axis labels */}
          <text
            x="20"
            y="58"
            fill="#9CA3AF"
            fontSize="8"
            fontFamily="monospace"
          >
            1s
          </text>
          <text
            x="120"
            y="58"
            fill="#9CA3AF"
            fontSize="8"
            fontFamily="monospace"
          >
            2s
          </text>
          <text
            x="220"
            y="58"
            fill="#9CA3AF"
            fontSize="8"
            fontFamily="monospace"
          >
            3s
          </text>
        </svg>

        {/* Sweep line animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="w-0.5 h-full bg-green-400 opacity-60 animate-pulse"
            style={{
              marginLeft: `${(Date.now() / 50) % 300}px`,
              transition: "margin-left 0.05s linear",
            }}
          ></div>
        </div>
      </div>

      <div className="space-y-1">
        <p
          className={`text-xs transition-colors duration-300 ${
            pulseAnimation ? "text-green-600" : "text-gray-400"
          }`}
        >
          {lastRecorded}
        </p>
        <p className="text-sm font-medium text-gray-700">{title}</p>
      </div>

      <div
        className={`mt-2 h-1 ${color.replace(
          "bg-",
          "bg-gradient-to-r from-"
        )} rounded-full transform transition-all duration-1000 ${
          isVisible ? "scale-x-100" : "scale-x-0"
        } origin-left ${pulseAnimation ? "animate-pulse" : ""}`}
      ></div>
    </div>
  );
};

const AppointmentCard = ({ doctor, patient, time, type, price }) => (
  <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
        <span className="text-blue-600 font-medium text-sm">
          {doctor
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
      </div>
      <div>
        <p className="font-medium text-gray-900">{patient}</p>
        <p className="text-sm text-gray-500">{type}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-sm font-medium text-gray-900">{time}</p>
      <p className="text-sm text-gray-500">${price}</p>
    </div>
    <button className="text-blue-600 hover:text-blue-700 ml-4">
      <Phone className="w-4 h-4" />
    </button>
  </div>
);

const PatientListItem = ({ patient, isActive, onClick }) => (
  <div
    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
      isActive
        ? "bg-blue-50 border-2 border-blue-200"
        : "hover:bg-gray-50 border-2 border-transparent"
    }`}
    onClick={onClick}
  >
    <div className="flex items-center space-x-3">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          isActive ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"
        }`}
      >
        <span className="font-medium text-sm">
          {patient.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
      </div>
      <div>
        <p
          className={`font-medium ${
            isActive ? "text-blue-900" : "text-gray-900"
          }`}
        >
          {patient.name}
        </p>
        <p className="text-sm text-gray-500">Age: {patient.age}</p>
      </div>
    </div>
    <div className="text-right">
      <p className={`text-xs ${isActive ? "text-blue-600" : "text-gray-400"}`}>
        {patient.condition}
      </p>
      {isActive && (
        <div className="flex items-center space-x-1 mt-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
          <span className="text-xs text-green-600 font-medium">Active</span>
        </div>
      )}
    </div>
  </div>
);

const DoctorListItem = ({ name, specialty }) => (
  <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
        <span className="text-green-600 font-medium text-sm">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
      </div>
      <div>
        <p className="font-medium text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{specialty}</p>
      </div>
    </div>
    <button className="text-gray-400 hover:text-gray-600">
      <MoreHorizontal className="w-4 h-4" />
    </button>
  </div>
);

const SidebarItem = ({
  icon: Icon,
  label,
  isActive,
  onClick,
  hasSubmenu,
  children,
}) => (
  <div className="mb-1">
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-blue-50 text-blue-600"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <div className="flex items-center space-x-3">
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
      </div>
      {hasSubmenu && <ChevronRight className="w-4 h-4" />}
    </button>
    {children && isActive && (
      <div className="ml-8 mt-2 space-y-1">{children}</div>
    )}
  </div>
);

const HealthAdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activePatientId, setActivePatientId] = useState(1);
  const [showHeartbeatChart, setShowHeartbeatChart] = useState(false);
  const [heartbeatData, setHeartbeatData] = useState([]);

  // Patient database with different medical profiles
  const [patients] = useState([
    {
      id: 1,
      name: "John Smith",
      age: 45,
      condition: "Hypertension",
      vitals: {
        bp: { systolic: 140, diastolic: 90 },
        hr: 85,
        spo2: 96,
        weight: 75,
        temp: 36.8,
        rr: 18,
      },
    },
    {
      id: 2,
      name: "Sarah Johnson",
      age: 32,
      condition: "Normal",
      vitals: {
        bp: { systolic: 118, diastolic: 78 },
        hr: 72,
        spo2: 98,
        weight: 62,
        temp: 36.4,
        rr: 16,
      },
    },
    {
      id: 3,
      name: "Michael Brown",
      age: 58,
      condition: "COPD",
      vitals: {
        bp: { systolic: 125, diastolic: 82 },
        hr: 88,
        spo2: 94,
        weight: 80,
        temp: 36.6,
        rr: 22,
      },
    },
    {
      id: 4,
      name: "Emma Davis",
      age: 28,
      condition: "Pregnancy",
      vitals: {
        bp: { systolic: 115, diastolic: 75 },
        hr: 90,
        spo2: 99,
        weight: 68,
        temp: 36.9,
        rr: 17,
      },
    },
    {
      id: 5,
      name: "Robert Wilson",
      age: 67,
      condition: "Heart Disease",
      vitals: {
        bp: { systolic: 135, diastolic: 88 },
        hr: 95,
        spo2: 95,
        weight: 85,
        temp: 36.5,
        rr: 20,
      },
    },
    {
      id: 6,
      name: "Lisa Anderson",
      age: 41,
      condition: "Diabetes",
      vitals: {
        bp: { systolic: 128, diastolic: 84 },
        hr: 78,
        spo2: 97,
        weight: 58,
        temp: 36.7,
        rr: 15,
      },
    },
    {
      id: 7,
      name: "David Martinez",
      age: 35,
      condition: "Athletic",
      vitals: {
        bp: { systolic: 110, diastolic: 70 },
        hr: 55,
        spo2: 99,
        weight: 73,
        temp: 36.2,
        rr: 14,
      },
    },
    {
      id: 8,
      name: "Jennifer Taylor",
      age: 52,
      condition: "Anemia",
      vitals: {
        bp: { systolic: 108, diastolic: 68 },
        hr: 98,
        spo2: 96,
        weight: 55,
        temp: 36.3,
        rr: 19,
      },
    },
    {
      id: 9,
      name: "James Garcia",
      age: 29,
      condition: "Asthma",
      vitals: {
        bp: { systolic: 120, diastolic: 80 },
        hr: 82,
        spo2: 95,
        weight: 70,
        temp: 36.8,
        rr: 24,
      },
    },
    {
      id: 10,
      name: "Amanda White",
      age: 64,
      condition: "Hypertension",
      vitals: {
        bp: { systolic: 145, diastolic: 92 },
        hr: 75,
        spo2: 97,
        weight: 63,
        temp: 36.6,
        rr: 17,
      },
    },
  ]);

  const [vitals, setVitals] = useState(() => {
    const patient = patients.find((p) => p.id === activePatientId);
    return {
      bloodPressure: {
        systolic: patient.vitals.bp.systolic,
        diastolic: patient.vitals.bp.diastolic,
        lastUpdated: new Date(),
      },
      heartRate: { value: patient.vitals.hr, lastUpdated: new Date() },
      oxygenSaturation: { value: patient.vitals.spo2, lastUpdated: new Date() },
      weight: { value: patient.vitals.weight, lastUpdated: new Date() },
      temperature: { value: patient.vitals.temp, lastUpdated: new Date() },
      respiratoryRate: { value: patient.vitals.rr, lastUpdated: new Date() },
    };
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Generate ECG-style heartbeat data with more points for smooth rendering
  useEffect(() => {
    const generateHeartbeatData = () => {
      const data = [];
      const currentHR = vitals.heartRate.value;
      const beatsToShow = 3; // Show 3 complete heartbeats
      const pointsPerBeat = 60;
      const totalPoints = beatsToShow * pointsPerBeat;

      for (let i = 0; i < totalPoints; i++) {
        const beatPosition = i % pointsPerBeat;
        const timeMs = (i / totalPoints) * 3000; // 3 seconds of data
        let voltage = 0;

        // Create realistic ECG waveform pattern
        if (beatPosition < 8) {
          // P wave
          voltage = Math.sin((beatPosition / 8) * Math.PI) * 0.15;
        } else if (beatPosition < 15) {
          // PR segment
          voltage = 0.02 * (Math.random() - 0.5);
        } else if (beatPosition < 25) {
          // QRS complex
          const qrsPos = (beatPosition - 15) / 10;
          if (qrsPos < 0.2) voltage = -0.1; // Q wave
          else if (qrsPos < 0.5)
            voltage = (qrsPos - 0.2) * 3.33; // R wave (upstroke)
          else if (qrsPos < 0.7)
            voltage = 1.0 - (qrsPos - 0.5) * 5; // R wave (downstroke)
          else voltage = -0.3 * Math.sin(((qrsPos - 0.7) / 0.3) * Math.PI); // S wave
        } else if (beatPosition < 35) {
          // ST segment
          voltage = 0.05 * (Math.random() - 0.5);
        } else if (beatPosition < 50) {
          // T wave
          voltage = Math.sin(((beatPosition - 35) / 15) * Math.PI) * 0.25;
        } else {
          // Baseline
          voltage = 0.02 * (Math.random() - 0.5);
        }

        data.push({
          time: timeMs,
          voltage: voltage + (Math.random() - 0.5) * 0.02,
          x: i,
          y: voltage,
        });
      }
      return data;
    };

    const updateInterval = setInterval(() => {
      setHeartbeatData(generateHeartbeatData());
    }, 1000); // Update ECG every second

    // Initial data
    setHeartbeatData(generateHeartbeatData());

    return () => clearInterval(updateInterval);
  }, [vitals.heartRate.value]);

  // Real-time vitals update simulation based on active patient
  useEffect(() => {
    const updateVitals = () => {
      const currentPatient = patients.find((p) => p.id === activePatientId);
      const baseVitals = currentPatient.vitals;

      setVitals((prev) => ({
        bloodPressure: {
          systolic: Math.max(
            baseVitals.bp.systolic - 10,
            Math.min(
              baseVitals.bp.systolic + 10,
              prev.bloodPressure.systolic + (Math.random() - 0.5) * 4
            )
          ),
          diastolic: Math.max(
            baseVitals.bp.diastolic - 8,
            Math.min(
              baseVitals.bp.diastolic + 8,
              prev.bloodPressure.diastolic + (Math.random() - 0.5) * 3
            )
          ),
          lastUpdated: new Date(),
        },
        heartRate: {
          value: Math.max(
            baseVitals.hr - 15,
            Math.min(
              baseVitals.hr + 15,
              prev.heartRate.value + (Math.random() - 0.5) * 6
            )
          ),
          lastUpdated: new Date(),
        },
        oxygenSaturation: {
          value: Math.max(
            baseVitals.spo2 - 3,
            Math.min(
              baseVitals.spo2 + 2,
              prev.oxygenSaturation.value + (Math.random() - 0.5) * 1
            )
          ),
          lastUpdated: new Date(),
        },
        weight: {
          value: Math.max(
            baseVitals.weight - 2,
            Math.min(
              baseVitals.weight + 2,
              prev.weight.value + (Math.random() - 0.5) * 0.1
            )
          ),
          lastUpdated: new Date(),
        },
        temperature: {
          value: Math.max(
            baseVitals.temp - 0.5,
            Math.min(
              baseVitals.temp + 0.8,
              prev.temperature.value + (Math.random() - 0.5) * 0.2
            )
          ),
          lastUpdated: new Date(),
        },
        respiratoryRate: {
          value: Math.max(
            baseVitals.rr - 4,
            Math.min(
              baseVitals.rr + 4,
              prev.respiratoryRate.value + (Math.random() - 0.5) * 2
            )
          ),
          lastUpdated: new Date(),
        },
      }));
    };

    const interval = setInterval(updateVitals, 3000); // Update every 3 seconds
    return () => clearInterval(interval);
  }, [activePatientId, patients]);

  // Switch to different patient
  const switchToPatient = (patientId) => {
    const patient = patients.find((p) => p.id === patientId);
    setActivePatientId(patientId);

    // Immediately update vitals to new patient's baseline
    setVitals({
      bloodPressure: {
        systolic: patient.vitals.bp.systolic,
        diastolic: patient.vitals.bp.diastolic,
        lastUpdated: new Date(),
      },
      heartRate: { value: patient.vitals.hr, lastUpdated: new Date() },
      oxygenSaturation: { value: patient.vitals.spo2, lastUpdated: new Date() },
      weight: { value: patient.vitals.weight, lastUpdated: new Date() },
      temperature: { value: patient.vitals.temp, lastUpdated: new Date() },
      respiratoryRate: { value: patient.vitals.rr, lastUpdated: new Date() },
    });
  };

  const formatTimestamp = (date) => {
    return `Last Recorded: ${date.toLocaleDateString(
      "en-GB"
    )} | ${date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}`;
  };

  // Sample data for remaining components
  const appointmentData = [
    { name: "Male", value: 35, color: "#3B82F6" },
    { name: "Female", value: 30, color: "#06B6D4" },
    { name: "Child", value: 20, color: "#EF4444" },
    { name: "German", value: 15, color: "#F59E0B" },
  ];

  const sidebarItems = [
    { icon: BarChart3, label: "Dashboard", key: "dashboard", hasSubmenu: true },
    { icon: Calendar, label: "Appointments", key: "appointments" },
    { icon: Users, label: "Patients", key: "patients" },
    { icon: Stethoscope, label: "Doctors", key: "doctors" },
  ];

  const dashboardSubItems = [];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`w-64 bg-white shadow-lg border-r border-gray-200 transform transition-transform duration-300 ${
          isLoaded ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Rhythm Admin
            </span>
          </div>
        </div>

        {/* Emergency Help */}
        <div className="p-4">
          <button className="w-full bg-red-500 hover:bg-red-600 text-white rounded-lg p-3 flex items-center space-x-2 transition-colors">
            <Mic className="w-5 h-5" />
            <div className="text-left">
              <p className="font-medium">Emergency</p>
              <p className="text-sm opacity-90">help</p>
            </div>
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-1 max-h-96 overflow-y-auto">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.key}
              icon={item.icon}
              label={item.label}
              isActive={activeSection === item.key}
              onClick={() => setActiveSection(item.key)}
              hasSubmenu={item.hasSubmenu}
            >
              {item.key === "dashboard" &&
                dashboardSubItems.map((subItem, index) => (
                  <button
                    key={index}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    • {subItem}
                  </button>
                ))}
            </SidebarItem>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="p-4 mt-8">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-4 text-white">
            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-8 h-8" />
            </div>
            <h4 className="font-medium text-center mb-1">
              Make an Appointments
            </h4>
            <p className="text-xs text-center opacity-90 mb-3">
              Best Health Care here →
            </p>
            <p className="text-xs text-center">Rhythm Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header
          className={`bg-white shadow-sm border-b border-gray-200 px-6 py-4 transform transition-all duration-500 ${
            isLoaded ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Maximize className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Johen Doe</p>
                  <p className="text-xs text-gray-500">ADMIN</p>
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JD</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Active Patient Info */}
          <div
            className={`mb-6 transform transition-all duration-500 delay-200 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-4 text-white mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">
                    Patient Monitoring Dashboard
                  </h1>
                  <p className="opacity-90">
                    Currently monitoring:{" "}
                    {patients.find((p) => p.id === activePatientId)?.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90">Condition</p>
                  <p className="font-medium">
                    {patients.find((p) => p.id === activePatientId)?.condition}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            {/* Left Section: Real-time Vital Signs Cards (3x2 grid) */}
            <div className="lg:col-span-3">
              {/* First Row: Blood Pressure, Heart Rate, Temperature */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <VitalStatsCard
                  icon={Droplets}
                  title="Blood Pressure"
                  value={`${Math.round(
                    vitals.bloodPressure.systolic
                  )}/${Math.round(vitals.bloodPressure.diastolic)}`}
                  unit="mmHg"
                  lastRecorded={formatTimestamp(
                    vitals.bloodPressure.lastUpdated
                  )}
                  color="bg-red-500"
                  delay={0}
                  isUpdating={true}
                />
                <ECGCard
                  title="Pulse/Heart Rate"
                  value={Math.round(vitals.heartRate.value)}
                  unit="bpm"
                  lastRecorded={formatTimestamp(vitals.heartRate.lastUpdated)}
                  color="bg-red-500"
                  delay={100}
                  isUpdating={true}
                  ecgData={heartbeatData}
                />
                <VitalStatsCard
                  icon={Thermometer}
                  title="Temperature"
                  value={vitals.temperature.value.toFixed(1)}
                  unit="°C"
                  lastRecorded={formatTimestamp(vitals.temperature.lastUpdated)}
                  color="bg-orange-500"
                  delay={200}
                  isUpdating={true}
                />
              </div>

              {/* Second Row: SPO2, Weight, Respiratory Rate */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <VitalStatsCard
                  icon={Activity}
                  title="SPO2 (Blood Oxygen Saturation)"
                  value={Math.round(vitals.oxygenSaturation.value)}
                  unit="%"
                  lastRecorded={formatTimestamp(
                    vitals.oxygenSaturation.lastUpdated
                  )}
                  color="bg-blue-500"
                  delay={300}
                  isUpdating={true}
                />
                <VitalStatsCard
                  icon={Weight}
                  title="Weight"
                  value={vitals.weight.value.toFixed(1)}
                  unit="kg"
                  lastRecorded={formatTimestamp(vitals.weight.lastUpdated)}
                  color="bg-green-500"
                  delay={400}
                  isUpdating={true}
                />
                <VitalStatsCard
                  icon={Wind}
                  title="Respiratory Rate"
                  value={Math.round(vitals.respiratoryRate.value)}
                  unit="breaths/min"
                  lastRecorded={formatTimestamp(
                    vitals.respiratoryRate.lastUpdated
                  )}
                  color="bg-cyan-500"
                  delay={500}
                  isUpdating={true}
                />
              </div>
            </div>

            {/* Right Section: Patient List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Patients
                  </h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                    <span className="text-xs text-green-600 font-medium">
                      Live
                    </span>
                  </div>
                </div>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {patients.map((patient) => (
                    <PatientListItem
                      key={patient.id}
                      patient={patient}
                      isActive={patient.id === activePatientId}
                      onClick={() => switchToPatient(patient.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            {/* Doctor List */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Doctor List
                </h3>
                <span className="text-sm text-blue-600">Today</span>
              </div>
              <div className="space-y-1">
                <DoctorListItem name="Dr. Jaylon Stanton" specialty="Dentist" />
                <DoctorListItem
                  name="Dr. Carla Schleifer"
                  specialty="Oculist"
                />
                <DoctorListItem name="Dr. Hanna Geidt" specialty="Surgeon" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HealthAdminDashboard;
