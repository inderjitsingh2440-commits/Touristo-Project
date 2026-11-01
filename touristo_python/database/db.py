"""
SQLite Database Layer for TOURISTO
Handles schema initialization, parameterized queries, and persistence.
"""
import sqlite3
import os
from typing import List, Dict, Any, Optional
from database.models import Expense, EmergencyContact, ScamReport

DB_NAME = "touristo.sqlite3"

def get_connection(db_path: str = DB_NAME) -> sqlite3.Connection:
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn

def init_db(db_path: str = DB_NAME):
    with get_connection(db_path) as conn:
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
            CREATE TABLE IF NOT EXISTS emergency_contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                relation TEXT NOT NULL,
                phone TEXT NOT NULL,
                notify_on_sos INTEGER DEFAULT 1
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
        
        # Seed initial contacts if empty
        cursor.execute("SELECT COUNT(*) FROM emergency_contacts")
        if cursor.fetchone()[0] == 0:
            cursor.execute('''
                INSERT INTO emergency_contacts (name, relation, phone, notify_on_sos)
                VALUES 
                ('Sarah Jenkins (Sister)', 'Family', '+15552345678', 1),
                ('Embassy Duty Officer', 'Embassy', '+911124198000', 1)
            ''')
        conn.commit()

def add_expense(expense: Expense, db_path: str = DB_NAME) -> int:
    with get_connection(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO expenses (title, amount, currency, amount_in_inr, category, date, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (expense.title, expense.amount, expense.currency, expense.amount_in_inr, expense.category, expense.date, expense.notes))
        conn.commit()
        return cursor.lastrowid

def get_expenses(db_path: str = DB_NAME) -> List[Dict[str, Any]]:
    with get_connection(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM expenses ORDER BY id DESC")
        return [dict(row) for row in cursor.fetchall()]

def delete_expense(expense_id: int, db_path: str = DB_NAME):
    with get_connection(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM expenses WHERE id = ?", (expense_id,))
        conn.commit()
