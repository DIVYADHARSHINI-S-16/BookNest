-- BookNest Phase 1 Seed Data

-- =========================
-- CATEGORIES
-- =========================
INSERT INTO categories (name, slug, description) VALUES
    ('Fiction', 'fiction', 'Novels and narrative fiction'),
    ('Non-Fiction', 'non-fiction', 'Real-world ideas, memoirs, and practical guides'),
    ('Mystery', 'mystery', 'Thrillers, whodunits, and suspense'),
    ('Romance', 'romance', 'Love stories and romantic fiction'),
    ('Biography', 'biography', 'Life stories of notable people'),
    ('Technology', 'technology', 'Software, engineering, and tech craft'),
    ('Children', 'children', 'Books for younger readers')
ON CONFLICT (name) DO NOTHING;

-- =========================
-- BOOKS
-- =========================
INSERT INTO books (title, author, description, isbn, price, cover_image_url, category_id, is_second_hand)
VALUES
    ('The Alchemist', 'Paulo Coelho',
     'A luminous tale about following a dream, listening closely, and finding meaning in the everyday.',
     '9780062315007', 14.99, '', (SELECT id FROM categories WHERE slug = 'fiction'), false),

    ('Atomic Habits', 'James Clear',
     'A practical guide to building good habits, breaking unhelpful ones, and making small changes that compound.',
     '9780735211292', 18.99, '', (SELECT id FROM categories WHERE slug = 'non-fiction'), false),

    ('The Psychology of Money', 'Morgan Housel',
     'Timeless lessons on wealth, greed, happiness, and the surprisingly personal side of money.',
     '9780857197689', 17.50, '', (SELECT id FROM categories WHERE slug = 'non-fiction'), false),

    ('Clean Code', 'Robert C. Martin',
     'A classic guide to writing readable, maintainable code and crafting software with discipline.',
     '9780132350884', 32.00, '', (SELECT id FROM categories WHERE slug = 'technology'), false),

    ('Ikigai', 'Hector Garcia & Francesc Miralles',
     'A gentle exploration of the Japanese concept of ikigai and the small rituals that add up to a long, happy life.',
     '9780143130727', 16.25, '', (SELECT id FROM categories WHERE slug = 'non-fiction'), false),

    ('The Great Gatsby', 'F. Scott Fitzgerald',
     'A spare, shimmering portrait of desire, ambition, and the American dream in the Jazz Age.',
     '9780743273565', 11.99, '', (SELECT id FROM categories WHERE slug = 'fiction'), false),

    ('Harry Potter and the Philosopher''s Stone', 'J.K. Rowling',
     'Harry discovers a hidden world of magic, friendship, and adventure beyond the cupboard under the stairs.',
     '9780747532699', 15.99, '', (SELECT id FROM categories WHERE slug = 'children'), false),

    ('Rich Dad Poor Dad', 'Robert Kiyosaki',
     'A personal story that challenges conventional ideas about work, wealth, and financial education.',
     '9781612680194', 13.75, '', (SELECT id FROM categories WHERE slug = 'biography'), false),

    ('Gone Girl', 'Gillian Flynn',
     'A sharply intelligent mystery about marriage, secrets, and the stories people tell about themselves.',
     '9780307588364', 15.99, '', (SELECT id FROM categories WHERE slug = 'mystery'), false),

    ('Pride and Prejudice', 'Jane Austen',
     'A witty, enduring love story about first impressions, family expectations, and quiet transformation.',
     '9780141439518', 12.50, '', (SELECT id FROM categories WHERE slug = 'romance'), false),

    ('Becoming', 'Michelle Obama',
     'An intimate memoir of family, work, public life, and the experiences that shaped a former First Lady.',
     '9781524763138', 19.99, '', (SELECT id FROM categories WHERE slug = 'biography'), false),

    ('The Hobbit', 'J.R.R. Tolkien',
     'Bilbo Baggins leaves his quiet home for an unforgettable adventure filled with courage and unlikely friendships.',
     '9780547928227', 14.25, '', (SELECT id FROM categories WHERE slug = 'children'), false)
ON CONFLICT (isbn) DO NOTHING;

-- =========================
-- INVENTORY (quantities match screenshots; Rich Dad Poor Dad = out of stock)
-- =========================
INSERT INTO inventory (book_id, quantity)
SELECT id, qty FROM (VALUES
    ('The Alchemist', 12),
    ('Atomic Habits', 8),
    ('The Psychology of Money', 10),
    ('Clean Code', 5),
    ('Ikigai', 7),
    ('The Great Gatsby', 14),
    ('Harry Potter and the Philosopher''s Stone', 9),
    ('Rich Dad Poor Dad', 0),
    ('Gone Girl', 6),
    ('Pride and Prejudice', 11),
    ('Becoming', 8),
    ('The Hobbit', 10)
) AS seed_qty(title, qty)
JOIN books ON books.title = seed_qty.title
ON CONFLICT (book_id) DO NOTHING;

-- Demo customer/admin accounts are seeded separately in seed.ts with
-- properly bcrypt-hashed passwords (see src/db/seed.ts).
