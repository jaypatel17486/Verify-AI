-- Users/Login table
CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP
);

-- Claims table
CREATE TABLE IF NOT EXISTS claims (
    claim_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    claim_type VARCHAR(50) NOT NULL, -- 'TEXT', 'URL', or 'IMAGE'
    claim_text TEXT NOT NULL,
    ai_research TEXT,
    ai_response TEXT,
    credibility_score INT CHECK (credibility_score >= 0 AND credibility_score <= 100),
    is_archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    archived_at TIMESTAMP
);

-- Archives table (for old/archived claims)
CREATE TABLE IF NOT EXISTS archives (
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

-- Indexes
CREATE INDEX IF NOT EXISTS idx_claims_user_id ON claims(user_id);
CREATE INDEX IF NOT EXISTS idx_claims_is_archived ON claims(is_archived);
CREATE INDEX IF NOT EXISTS idx_claims_created_at ON claims(created_at);
CREATE INDEX IF NOT EXISTS idx_archives_user_id ON archives(user_id);
CREATE INDEX IF NOT EXISTS idx_archives_claim_id ON archives(claim_id);
CREATE INDEX IF NOT EXISTS idx_archives_archived_at ON archives(archived_at);
