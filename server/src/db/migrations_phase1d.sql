-- Phase 1D migration: order status lifecycle + mock payment fields
-- Safe to re-run.

ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_status_check;

ALTER TABLE orders ALTER COLUMN status SET DEFAULT 'PLACED';

-- Normalize any old lowercase demo data before applying the new constraint.
UPDATE orders SET status = 'PLACED' WHERE status = 'pending';
UPDATE orders SET status = 'CONFIRMED' WHERE status = 'paid';
UPDATE orders SET status = 'SHIPPED' WHERE status = 'shipped';
UPDATE orders SET status = 'DELIVERED' WHERE status = 'delivered';
UPDATE orders SET status = 'CANCELLED' WHERE status = 'cancelled';

ALTER TABLE orders ADD CONSTRAINT orders_status_check
    CHECK (status IN ('PLACED', 'CONFIRMED', 'PACKED', 'SHIPPED', 'DELIVERED', 'CANCELLED'));

ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_method VARCHAR(20) NOT NULL DEFAULT 'MOCK';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_status VARCHAR(20) NOT NULL DEFAULT 'MOCK_PAID';

CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
