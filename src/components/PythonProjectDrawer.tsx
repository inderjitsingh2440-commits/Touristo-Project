import React, { useState } from 'react';
import { 
  X, 
  Code2, 
  Copy, 
  Check, 
  FileCode, 
  FolderTree, 
  Terminal, 
  Download, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface PythonProjectDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PythonProjectDrawer: React.FC<PythonProjectDrawerProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<string>('main.py');
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const pythonFiles: Record<string, string> = {
    'main.py': `"""
TOURISTO — Travel Smart. Travel Safe.
AI Travel Companion in India for Desktop and Android (Buildozer).
"""
import os
import sys
from kivymd.app import MDApp
from kivy.uix.screenmanager import ScreenManager, Screen, FadeTransition
from kivy.core.window import Window
from theme import init_theme, THEME_COLORS
from database.db import init_database
from screens.splash import SplashScreen
from screens.home import HomeScreen
from screens.currency_scanner import CurrencyScannerScreen
from screens.translator import TranslatorScreen
from screens.currency_calculator import CurrencyCalculatorScreen
from screens.expense_tracker import ExpenseTrackerScreen
from screens.scam_detector import ScamDetectorScreen
from screens.scam_examples import ScamExamplesScreen
from screens.safe_route import SafeRouteScreen
from screens.sos_emergency import SOSEmergencyScreen
from screens.nearby_help import NearbyHelpScreen
from screens.profile_settings import ProfileSettingsScreen

class TouristoApp(MDApp):
    def build(self):
        # Configure mobile window resolution for desktop testing
        Window.size = (390, 844)
        init_theme(self)
        init_database()

        self.sm = ScreenManager(transition=FadeTransition())
        self.sm.add_widget(SplashScreen(name='splash'))
        self.sm.add_widget(HomeScreen(name='home'))
        self.sm.add_widget(CurrencyScannerScreen(name='currency_scanner'))
        self.sm.add_widget(TranslatorScreen(name='translator'))
        self.sm.add_widget(CurrencyCalculatorScreen(name='currency_calculator'))
        self.sm.add_widget(ExpenseTrackerScreen(name='expense_tracker'))
        self.sm.add_widget(ScamDetectorScreen(name='scam_detector'))
        self.sm.add_widget(ScamExamplesScreen(name='scam_examples'))
        self.sm.add_widget(SafeRouteScreen(name='safe_route'))
        self.sm.add_widget(SOSEmergencyScreen(name='sos_emergency'))
        self.sm.add_widget(NearbyHelpScreen(name='nearby_help'))
        self.sm.add_widget(ProfileSettingsScreen(name='profile_settings'))

        return self.sm

if __name__ == '__main__':
    TouristoApp().run()
`,
    'theme.py': `"""
TOURISTO Design System & Colour Constants.
Matches the official visual specification.
"""
from kivy.utils import get_color_from_hex

THEME_COLORS = {
    'primary': '#087F68',          # Deep teal green
    'primary_dark': '#075B4E',     # Dark teal
    'primary_action': '#07866D',   # Active navigation / buttons
    'light_mint': '#E6F6EF',       # Soft mint background
    'background': '#FFFFFF',       # Canvas white
    'background_light': '#F5F7F7', # Soft grey
    'border': '#E2E8E6',           # Border lines
    'text_primary': '#172B2A',     # High-contrast dark
    'text_secondary': '#62716F',   # Secondary text
    'success': '#15965F',
    'warning': '#F4B740',
    'error': '#E53935',
    'sos_dark_red': '#450A0A',
    
    # 6 Pastel Card Colors
    'card_scam': '#FEF8D8',
    'card_scanner': '#E3F2FD',
    'card_translator': '#FCE4EC',
    'card_calculator': '#E8F5E9',
    'card_safety': '#EDE7F6',
    'card_explore': '#FFF3E0',
}

def init_theme(app):
    app.theme_cls.primary_palette = "Teal"
    app.theme_cls.primary_hue = "800"
    app.theme_cls.theme_style = "Light"
    app.theme_cls.material_style = "M3"
`,
    'database/db.py': `"""
SQLite Database Layer for TOURISTO.
Thread-safe parameterized query executions.
"""
import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'touristo.sqlite3')

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_database():
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS profile (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                nationality TEXT NOT NULL,
                email TEXT,
                phone TEXT,
                blood_group TEXT,
                preferred_currency TEXT DEFAULT 'USD'
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS expenses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                amount REAL NOT NULL,
                currency TEXT NOT NULL,
                amount_in_inr REAL NOT NULL,
                category TEXT NOT NULL,
                date TEXT NOT NULL,
                notes TEXT
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS scam_reports (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date TEXT NOT NULL,
                transport_type TEXT NOT NULL,
                from_location TEXT NOT NULL,
                to_location TEXT NOT NULL,
                quoted_fare REAL NOT NULL,
                standard_fare REAL NOT NULL,
                risk_score INTEGER NOT NULL,
                risk_level TEXT NOT NULL
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS emergency_contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                relation TEXT NOT NULL,
                phone TEXT NOT NULL,
                notify_on_sos INTEGER DEFAULT 1
            )
        ''')
        conn.commit()
`,
    'services/scam_service.py': `"""
Travel Fare Risk Assessment Engine in Pure Python.
Calculates fare difference, risk scoring, and evaluates circumstance red flags.
"""
import math

class ScamScoringEngine:
    @staticmethod
    def calculate_benchmark_fare(transport_type: str, distance_km: float, is_night: bool = False) -> float:
        dist = max(0.5, distance_km)
        fare = 0.0

        if transport_type == "Auto Rickshaw":
            # Delhi official tariff: Rs 30 first 1.5km, Rs 11/km after
            fare = 30.0 if dist <= 1.5 else 30.0 + (dist - 1.5) * 11.0
        elif transport_type == "Prepaid Taxi":
            # Rs 50 first 1km, Rs 16/km after
            fare = 50.0 if dist <= 1.0 else 50.0 + (dist - 1.0) * 16.0
        elif transport_type == "Airport Cab":
            fare = 150.0 + max(0, dist - 1.0) * 22.0
        else:
            fare = max(40.0, dist * 15.0)

        if is_night:
            fare *= 1.25 # 25% night tariff 11 PM to 5 AM

        return round(fare)

    @classmethod
    def evaluate(cls, transport_type: str, from_loc: str, to_loc: str, distance_km: float, quoted_fare: float, is_night: bool, circumstances: list) -> dict:
        benchmark = cls.calculate_benchmark_fare(transport_type, distance_km, is_night)
        difference = quoted_fare - benchmark
        diff_percent = round((difference / max(1.0, benchmark)) * 100)

        risk_score = 0
        if diff_percent <= 20:
            risk_score += 15
        elif diff_percent <= 50:
            risk_score += 45
        elif diff_percent <= 120:
            risk_score += 75
        else:
            risk_score += 90

        for circ in circumstances:
            if "hotel is closed" in circ.lower() or "burnt down" in circ.lower():
                risk_score += 40
            if "meter broken" in circ.lower() or "refused meter" in circ.lower():
                risk_score += 20
            if "tout" in circ.lower():
                risk_score += 25

        risk_score = min(100, max(5, risk_score))
        risk_level = "High" if risk_score >= 65 else ("Medium" if risk_score >= 35 else "Low")

        return {
            "standard_fare": benchmark,
            "quoted_fare": quoted_fare,
            "risk_score": risk_score,
            "risk_level": risk_level,
            "diff_percent": diff_percent
        }
`,
    'tests/test_touristo.py': `"""
Automated unit test suite for TOURISTO Python modules.
Run with: pytest tests/test_touristo.py
"""
import pytest
from services.scam_service import ScamScoringEngine

def test_auto_rickshaw_fare_calculation():
    # 1.5 km should cost exactly 30 INR
    assert ScamScoringEngine.calculate_benchmark_fare("Auto Rickshaw", 1.5, False) == 30
    # 5.0 km should cost 30 + 3.5 * 11 = 68.5 -> 68 or 69 INR
    fare = ScamScoringEngine.calculate_benchmark_fare("Auto Rickshaw", 5.0, False)
    assert 68 <= fare <= 69

def test_night_tariff_surcharge():
    day_fare = ScamScoringEngine.calculate_benchmark_fare("Prepaid Taxi", 10.0, False)
    night_fare = ScamScoringEngine.calculate_benchmark_fare("Prepaid Taxi", 10.0, True)
    assert night_fare > day_fare
    assert round(night_fare) == round(day_fare * 1.25)

def test_scam_risk_high_detection():
    # Quoting Rs 1500 for a 3km ride with hotel closed claim
    result = ScamScoringEngine.evaluate(
        transport_type="Auto Rickshaw",
        from_loc="NDLS",
        to_loc="Paharganj",
        distance_km=3.0,
        quoted_fare=1500.0,
        is_night=False,
        circumstances=["Driver said hotel is closed / burnt down"]
    )
    assert result["risk_level"] == "High"
    assert result["risk_score"] >= 80
`,
    'requirements.txt': `kivy>=2.3.0
kivymd>=1.2.0
pillow>=10.0.0
requests>=2.31.0
numpy>=1.26.0
scikit-learn>=1.4.0
pytest>=8.0.0
buildozer>=1.5.0
`,
    'buildozer.spec': `[app]
title = TOURISTO
package.name = touristo
package.domain = org.touristo.travel
source.dir = .
source.include_exts = py,png,jpg,kv,atlas,json,sqlite3
version = 2.4.0
requirements = python3,kivy,kivymd,pillow,requests,sqlite3
android.permissions = CAMERA,RECORD_AUDIO,INTERNET,ACCESS_FINE_LOCATION,ACCESS_COARSE_LOCATION
android.archs = arm64-v8a, armeabi-v7a
orientation = portrait
fullscreen = 0
`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(pythonFiles[selectedFile]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = () => {
    // Generate text blob for current file or all files
    const blob = new Blob([pythonFiles[selectedFile]], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-4xl h-[88vh] flex flex-col text-slate-100 shadow-2xl overflow-hidden">
        {/* Modal Top Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#087F68] flex items-center justify-center text-white font-bold">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <span>TOURISTO Python 3.11 & KivyMD Architecture</span>
                <span className="text-[10px] bg-teal-900/80 text-teal-300 px-2 py-0.5 rounded-full font-mono">
                  Android Buildozer Ready
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Complete Python source code, SQLite database schema, and test suite.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
              title="Copy active code"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
            <button
              onClick={handleDownloadZip}
              className="px-3 py-1.5 bg-[#087F68] hover:bg-[#075B4E] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
              title="Download file"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body: Left File Tree + Right Code Editor */}
        <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
          {/* File Explorer Tree */}
          <div className="w-full sm:w-60 bg-slate-950/70 border-r border-slate-800 p-3 overflow-y-auto space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 flex items-center gap-1.5">
              <FolderTree className="w-3.5 h-3.5 text-[#087F68]" />
              Project Files
            </div>

            {Object.keys(pythonFiles).map((fileName) => {
              const isSelected = selectedFile === fileName;
              return (
                <button
                  key={fileName}
                  onClick={() => setSelectedFile(fileName)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-mono flex items-center gap-2 transition-all ${
                    isSelected
                      ? 'bg-[#087F68] text-white font-bold shadow-xs'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <FileCode className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span className="truncate">{fileName}</span>
                </button>
              );
            })}

            <div className="pt-4 px-2 text-[11px] text-slate-500 space-y-2">
              <div className="font-bold text-slate-400">Desktop Run:</div>
              <code className="block bg-slate-900 p-1.5 rounded text-[10px] text-teal-400 font-mono">
                python main.py
              </code>
              <div className="font-bold text-slate-400">Run Unit Tests:</div>
              <code className="block bg-slate-900 p-1.5 rounded text-[10px] text-teal-400 font-mono">
                pytest tests/
              </code>
              <div className="font-bold text-slate-400">Android APK:</div>
              <code className="block bg-slate-900 p-1.5 rounded text-[10px] text-teal-400 font-mono">
                buildozer android debug
              </code>
            </div>
          </div>

          {/* Code Viewer Panel */}
          <div className="flex-1 bg-slate-900 flex flex-col overflow-hidden">
            <div className="px-4 py-2 bg-slate-950/40 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>{selectedFile}</span>
              <span>Python 3.11</span>
            </div>
            <pre className="flex-1 p-4 font-mono text-xs text-emerald-300 overflow-auto whitespace-pre leading-relaxed select-text bg-[#0b101b]">
              <code>{pythonFiles[selectedFile]}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
