"use client"

import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import {
  Menu, X, Sun, Moon, Activity, AlertTriangle, MapPin,
  TrendingUp, Users, FileText, Phone, Mail, Shield,
  ChevronRight, Eye, EyeOff, CheckCircle, Clock,
  Thermometer, Droplets, Bug, Zap, Heart, UserCheck
} from 'lucide-react';

import { NavigationBar } from './_components/navbar';

const PublicHealthApp = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('cases');
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [formStep, setFormStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [liveStats, setLiveStats] = useState({
    totalReports: 5432,
    activeCases: 1205,
    recoveries: 3891
  });

  const [dots, setDots] = useState<
    { left: string; top: string; delay: string; duration: string }[]
  >([]);

  // Simulate live counter updates
  useEffect(() => {
    const newDots = Array.from({ length: 10 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random().toFixed(2)}s`,
      duration: `${(Math.random() * 3 + 2).toFixed(2)}s`,
    }));
    setDots(newDots);
  }, []);

  const diseases = [
    {
      id: 'cholera',
      name: 'Cholera',
      icon: <Droplets className="w-8 h-8 text-blue-500" />,
      summary: 'Acute diarrheal infection caused by contaminated food or water',
      prevention: [
        'Drink only bottled or boiled water',
        'Eat fully cooked hot foods',
        'Avoid raw vegetables and fruits',
        'Practice good hand hygiene'
      ],
      symptoms: ['Severe watery diarrhea', 'Vomiting', 'Dehydration', 'Muscle cramps'],
      cases: 342
    },
    {
      id: 'typhoid',
      name: 'Typhoid',
      icon: <Thermometer className="w-8 h-8 text-red-500" />,
      summary: 'Bacterial infection causing prolonged fever and weakness',
      prevention: [
        'Get vaccinated if traveling',
        'Drink safe water',
        'Eat properly cooked food',
        'Wash hands frequently'
      ],
      symptoms: ['High fever', 'Headache', 'Abdominal pain', 'Weakness'],
      cases: 256
    },
    {
      id: 'malaria',
      name: 'Malaria',
      icon: <Bug className="w-8 h-8 text-green-500" />,
      summary: 'Mosquito-borne disease causing fever and flu-like symptoms',
      prevention: [
        'Use mosquito nets while sleeping',
        'Apply insect repellent',
        'Wear long sleeves at dusk',
        'Remove standing water'
      ],
      symptoms: ['Fever and chills', 'Headache', 'Nausea', 'Fatigue'],
      cases: 189
    },
    {
      id: 'dengue',
      name: 'Dengue',
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      summary: 'Viral infection transmitted by Aedes mosquitoes',
      prevention: [
        'Eliminate mosquito breeding sites',
        'Use protective clothing',
        'Apply mosquito repellent',
        'Keep surroundings clean'
      ],
      symptoms: ['High fever', 'Severe headache', 'Eye pain', 'Muscle aches'],
      cases: 423
    }
  ];

  const chartData = [
    { month: 'Jan', cases: 120, recoveries: 98 },
    { month: 'Feb', cases: 145, recoveries: 132 },
    { month: 'Mar', cases: 189, recoveries: 156 },
    { month: 'Apr', cases: 234, recoveries: 201 },
    { month: 'May', cases: 312, recoveries: 278 },
    { month: 'Jun', cases: 289, recoveries: 245 }
  ];

  const pieData = [
    { name: 'Dengue', value: 423, color: '#FFC107' },
    { name: 'Cholera', value: 342, color: '#2196F3' },
    { name: 'Typhoid', value: 256, color: '#F44336' },
    { name: 'Malaria', value: 189, color: '#4CAF50' }
  ];

  type FormData = {
    age: string;
    gender: string;
    location: string;
    symptoms: string[];
    severity: string;
    duration: string;
  };

  const [formData, setFormData] = useState<FormData>({
    age: '',
    gender: '',
    location: '',
    symptoms: [],
    severity: '',
    duration: ''
  });

  const symptomsList = [
    'Fever', 'Headache', 'Nausea', 'Vomiting', 'Diarrhea',
    'Fatigue', 'Muscle aches', 'Chills', 'Dehydration'
  ];

  const handleSymptomToggle = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };




  const handleSubmitReport = () => {
    setFormSubmitted(true);
    setFormStep(1);
    setFormData({
      age: '',
      gender: '',
      location: '',
      symptoms: [],
      severity: '',
      duration: ''
    });
  };

  type Disease = {
    id: string;
    name: string;
    icon: React.ReactNode;
    summary: string;
    prevention: string[];
    symptoms: string[];
    cases: number;
  };

  interface DiseaseModalProps {
    disease: Disease;
    onClose: () => void;
  }

  const DiseaseModal: React.FC<DiseaseModalProps> = ({ disease, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`max-w-md w-full rounded-2xl p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            {disease.icon}
            <h3 className="text-2xl font-bold">{disease.name}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Symptoms:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {disease.symptoms.map((symptom, i) => (
                <li key={i}>{symptom}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Prevention:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {disease.prevention.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>

          <div className={`p-3 rounded-lg ${darkMode ? 'bg-red-900' : 'bg-red-50'}`}>
            <p className="text-sm text-red-600 dark:text-red-300">
              <strong>Current Cases:</strong> {disease.cases} reported this month
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation */}
      <header className="sticky inset-x-0 top-0 z-50">
        <NavigationBar
          role="Public"
          onDarkModeChange={(value) => setDarkMode(value)}
        />
      </header>


      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

        {/* Animated background particles */}
        <div className="absolute inset-0">
          {dots.map((dot, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: dot.left,
                top: dot.top,
                animationDelay: dot.delay,
                animationDuration: dot.duration,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeInUp">
            Stay Informed. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Stay Safe.
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto animate-fadeInUp animation-delay-200">
            Real-time monitoring of disease outbreaks in your community. Together, we build healthier neighborhoods.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-400">
            <button
              onClick={() => document.getElementById('statistics')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold transition-all transform hover:scale-105 hover:shadow-2xl"
            >
              <Activity className="inline w-5 h-5 mr-2" />
              View Live Reports
            </button>
            <button
              onClick={() => document.getElementById('reports')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 rounded-full text-lg font-semibold transition-all transform hover:scale-105"
            >
              <FileText className="inline w-5 h-5 mr-2" />
              Report Symptoms
            </button>
          </div>

          {/* Live Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6">
              <div className="text-3xl font-bold text-green-400">{liveStats.totalReports.toLocaleString()}</div>
              <div className="text-sm opacity-80">Reports Submitted</div>
            </div>
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6">
              <div className="text-3xl font-bold text-yellow-400">{liveStats.activeCases.toLocaleString()}</div>
              <div className="text-sm opacity-80">Active Cases</div>
            </div>
            <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-6">
              <div className="text-3xl font-bold text-blue-400">{liveStats.recoveries.toLocaleString()}</div>
              <div className="text-sm opacity-80">Recoveries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Disease Info Cards */}
      <section id="diseases" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Current Disease Outbreaks</h2>
            <p className="text-xl opacity-80 max-w-3xl mx-auto">
              Stay informed about active disease outbreaks in your area. Click on any card to learn more about prevention and symptoms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {diseases.map((disease) => (
              <div
                key={disease.id}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'
                  } shadow-lg hover:shadow-2xl`}
                onClick={() => setSelectedDisease(disease)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    {disease.icon}
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${disease.cases > 300 ? 'bg-red-100 text-red-800' :
                      disease.cases > 200 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                      {disease.cases} cases
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{disease.name}</h3>
                  <p className="text-sm opacity-80 mb-4">{disease.summary}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-500">Learn More</span>
                    <ChevronRight className="w-4 h-4 text-blue-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics & Charts */}
      <section id="statistics" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Disease Statistics & Trends</h2>
            <p className="text-xl opacity-80">Real-time data visualization of disease patterns and outbreak trends</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className={`flex rounded-full p-1 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              {['cases', 'trends', 'distribution'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-full font-semibold capitalize transition-all ${activeTab === tab
                    ? 'bg-blue-500 text-white shadow-lg'
                    : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  {tab === 'distribution' ? 'Disease Distribution' : tab}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Content */}
          <div className={`rounded-2xl p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
            {activeTab === 'cases' && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Monthly Cases Overview</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="cases" fill="#3B82F6" />
                    <Bar dataKey="recoveries" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {activeTab === 'trends' && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Disease Trend Analysis</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="cases" stroke="#EF4444" strokeWidth={3} />
                    <Line type="monotone" dataKey="recoveries" stroke="#10B981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {activeTab === 'distribution' && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Disease Distribution</h3>
                <div className="flex justify-center">
                  <ResponsiveContainer width={400} height={400}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Citizen Report Form */}
      <section id="reports" className={`py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Report Your Symptoms</h2>
            <p className="text-xl opacity-80">Help us track disease patterns by reporting your symptoms. Your data helps protect the community.</p>
          </div>

          {!formSubmitted ? (
            <div className={`rounded-2xl p-8 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} shadow-xl`}>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Step {formStep} of 3</span>
                  <span className="text-sm text-gray-500">{Math.round((formStep / 3) * 100)}% Complete</span>
                </div>
                <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(formStep / 3) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Step 1: Basic Info */}
              {formStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold mb-6">Basic Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Age</label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-500`}
                        placeholder="Enter your age"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Gender</label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-500`}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-500`}
                      placeholder="Enter your city/area"
                    />
                  </div>

                  <button
                    onClick={() => setFormStep(2)}
                    disabled={!formData.age || !formData.gender || !formData.location}
                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors"
                  >
                    Next: Symptoms <ChevronRight className="inline w-5 h-5 ml-2" />
                  </button>
                </div>
              )}

              {/* Step 2: Symptoms */}
              {formStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold mb-6">Select Your Symptoms</h3>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {symptomsList.map((symptom) => (
                      <button
                        key={symptom}
                        onClick={() => handleSymptomToggle(symptom)}
                        className={`p-3 rounded-lg border-2 text-left transition-all ${formData.symptoms.includes(symptom)
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : darkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{symptom}</span>
                          {formData.symptoms.includes(symptom) && (
                            <CheckCircle className="w-5 h-5 text-blue-500" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Severity</label>
                      <select
                        value={formData.severity}
                        onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                        className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-500`}
                      >
                        <option value="">Select severity</option>
                        <option value="mild">Mild</option>
                        <option value="moderate">Moderate</option>
                        <option value="severe">Severe</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Duration</label>
                      <select
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className={`w-full p-3 rounded-lg border ${darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-blue-500`}
                      >
                        <option value="">Select duration</option>
                        <option value="1-2 days">1-2 days</option>
                        <option value="3-5 days">3-5 days</option>
                        <option value="1 week">1 week</option>
                        <option value="more than 1 week">More than 1 week</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setFormStep(1)}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setFormStep(3)}
                      disabled={formData.symptoms.length === 0 || !formData.severity || !formData.duration}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      Next: Review <ChevronRight className="inline w-5 h-5 ml-2" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review & Submit */}
              {formStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold mb-6">Review & Submit</h3>

                  <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <strong>Age:</strong> {formData.age}
                      </div>
                      <div>
                        <strong>Gender:</strong> {formData.gender}
                      </div>
                    </div>
                    <div className="mt-4">
                      <strong>Location:</strong> {formData.location}
                    </div>
                    <div className="mt-4">
                      <strong>Symptoms:</strong> {formData.symptoms.join(', ')}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <strong>Severity:</strong> {formData.severity}
                      </div>
                      <div>
                        <strong>Duration:</strong> {formData.duration}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setFormStep(2)}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmitReport}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      Submit Report <CheckCircle className="inline w-5 h-5 ml-2" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Success Message */
            <div className="text-center py-16">
              <div className="mb-8">
                <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-4">🎉 Thank You!</h3>
                <p className="text-xl mb-4">You helped your community stay safe!</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Your report has been submitted successfully. Health authorities will review it shortly.
                </p>
              </div>
              <button
                onClick={() => setFormSubmitted(false)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Submit Another Report
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-800'} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="w-8 h-8 text-blue-500" />
                <span className="font-bold text-2xl">HealthGuard</span>
              </div>
              <p className="text-gray-300 mb-6">
                Built for Safe Communities 🚑
              </p>
              <p className="text-sm text-gray-400">
                Empowering citizens with real-time health information and disease outbreak monitoring.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Emergency Helplines</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-red-400" />
                  <div>
                    <div className="font-semibold">National Health Helpline</div>
                    <div className="text-gray-300">104 / 1075</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-red-400" />
                  <div>
                    <div className="font-semibold">Emergency Services</div>
                    <div className="text-gray-300">108</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="font-semibold">Health Department</div>
                    <div className="text-gray-300">health@gov.in</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Quick Links</h4>
              <div className="space-y-3">
                <a href="#diseases" className="block text-gray-300 hover:text-white transition-colors">Disease Information</a>
                <a href="#statistics" className="block text-gray-300 hover:text-white transition-colors">Live Statistics</a>
                <a href="#reports" className="block text-gray-300 hover:text-white transition-colors">Report Symptoms</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Disease Modal */}
      {selectedDisease && (
        <DiseaseModal
          disease={selectedDisease}
          onClose={() => setSelectedDisease(null)}
        />
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
};

export default PublicHealthApp;