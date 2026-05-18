import sqlite3

def init_db():
    conn = sqlite3.connect('urls.db')
    conn.execute('CREATE TABLE IF NOT EXISTS urls (id TEXT PRIMARY KEY, original TEXT)')
    conn.commit()
    conn.close()
