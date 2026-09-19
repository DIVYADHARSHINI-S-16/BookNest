-- Phase 1E migration: second-hand condition detail fields.
-- Safe to re-run.

ALTER TABLE second_hand_conditions DROP CONSTRAINT IF EXISTS second_hand_conditions_condition_grade_check;

-- Old data used lowercase grades from Phase 1A; map to the new enum.
UPDATE second_hand_conditions SET condition_grade = 'LIKE_NEW' WHERE condition_grade = 'like_new';
UPDATE second_hand_conditions SET condition_grade = 'VERY_GOOD' WHERE condition_grade = 'good';
UPDATE second_hand_conditions SET condition_grade = 'GOOD' WHERE condition_grade = 'fair';
UPDATE second_hand_conditions SET condition_grade = 'ACCEPTABLE' WHERE condition_grade = 'worn';

ALTER TABLE second_hand_conditions ADD CONSTRAINT second_hand_conditions_condition_grade_check
    CHECK (condition_grade IN ('LIKE_NEW', 'VERY_GOOD', 'GOOD', 'ACCEPTABLE'));

ALTER TABLE second_hand_conditions ADD COLUMN IF NOT EXISTS cover_condition VARCHAR(255);
ALTER TABLE second_hand_conditions ADD COLUMN IF NOT EXISTS page_condition VARCHAR(255);
ALTER TABLE second_hand_conditions ADD COLUMN IF NOT EXISTS visible_wear VARCHAR(255);
ALTER TABLE second_hand_conditions ADD COLUMN IF NOT EXISTS additional_notes TEXT;
ALTER TABLE second_hand_conditions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- One condition record per second-hand book keeps this simple and explainable
-- (a book is a single physical copy in this system, not per-unit tracked).
CREATE UNIQUE INDEX IF NOT EXISTS uq_second_hand_conditions_book_id ON second_hand_conditions(book_id);

DROP TRIGGER IF EXISTS trg_second_hand_conditions_updated_at ON second_hand_conditions;
CREATE TRIGGER trg_second_hand_conditions_updated_at BEFORE UPDATE ON second_hand_conditions
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
