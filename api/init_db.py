#!/usr/bin/env python3
"""
Database initialization script
Run this to set up the VerifyAI database schema
"""

import os
import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'shared'))

from db import get_conn

def init_database():
    """Create the users, claims, and archives tables."""

    conn = get_conn()
    cur = conn.cursor()

    try:
        print("Dropping existing tables...")
        cur.execute("DROP TABLE IF EXISTS archives CASCADE;")
        cur.execute("DROP TABLE IF EXISTS claims CASCADE;")
        cur.execute("DROP TABLE IF EXISTS users CASCADE;")

        print("Creating users table...")
        cur.execute("""
            CREATE TABLE users (
                user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                full_name TEXT,
                email TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                is_deleted BOOLEAN DEFAULT FALSE,
                deleted_at TIMESTAMP
            );
        """)

        print("Creating claims table...")
        cur.execute("""
            CREATE TABLE claims (
                claim_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
                claim_type VARCHAR(50) NOT NULL,
                claim_text TEXT NOT NULL,
                ai_research TEXT,
                ai_response TEXT,
                credibility_score INT CHECK (credibility_score >= 0 AND credibility_score <= 100),
                is_archived BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                archived_at TIMESTAMP
            );
        """)

        print("Creating archives table...")
        cur.execute("""
            CREATE TABLE archives (
                archive_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
                claim_id UUID NOT NULL REFERENCES claims(claim_id) ON DELETE CASCADE,
                original_claim_text TEXT NOT NULL,
                original_claim_type VARCHAR(50),
                original_ai_research TEXT,
                original_ai_response TEXT,
                original_credibility_score INT,
                archived_reason VARCHAR(255),
                archived_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                restored_at TIMESTAMP,
                is_restored BOOLEAN DEFAULT FALSE
            );
        """)

        print("Creating indexes...")
        cur.execute("CREATE INDEX IF NOT EXISTS idx_claims_user_id ON claims(user_id);")
        cur.execute("CREATE INDEX IF NOT EXISTS idx_claims_is_archived ON claims(is_archived);")
        cur.execute("CREATE INDEX IF NOT EXISTS idx_claims_created_at ON claims(created_at);")
        cur.execute("CREATE INDEX IF NOT EXISTS idx_archives_user_id ON archives(user_id);")
        cur.execute("CREATE INDEX IF NOT EXISTS idx_archives_claim_id ON archives(claim_id);")
        cur.execute("CREATE INDEX IF NOT EXISTS idx_archives_archived_at ON archives(archived_at);")

        conn.commit()
        print("✅ Database initialized successfully!")

    except Exception as e:
        conn.rollback()
        print(f"❌ Error initializing database: {e}")
        sys.exit(1)
    finally:
        cur.close()
        conn.close()

if __name__ == '__main__':
    print("Initializing VerifyAI database...")
    init_database()
