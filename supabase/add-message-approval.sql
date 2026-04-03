-- Add approval field to messages table
-- Messages default to unapproved; only admin-approved messages are visible to the recipient
ALTER TABLE messages ADD COLUMN IF NOT EXISTS is_approved BOOLEAN DEFAULT FALSE;
