-- Additional catalog titles (Indian rupee pricing, real Open Library covers)

INSERT INTO books (title, author, description, isbn, price, cover_image_url, category_id, is_second_hand)
VALUES
    ('1984', 'George Orwell',
     'A chilling vision of a totalitarian future where truth is rewritten and every thought is watched.',
     '9780451524935', 249, 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg',
     (SELECT id FROM categories WHERE slug = 'fiction'), false),

    ('Sapiens', 'Yuval Noah Harari',
     'A sweeping look at how Homo sapiens came to dominate the planet, from cognitive revolution to today.',
     '9780062316097', 499, 'https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg',
     (SELECT id FROM categories WHERE slug = 'non-fiction'), false),

    ('The Silent Patient', 'Alex Michaelides',
     'A woman shoots her husband and then never speaks again — a psychotherapist becomes obsessed with why.',
     '9781250301697', 349, 'https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg',
     (SELECT id FROM categories WHERE slug = 'mystery'), false),

    ('Educated', 'Tara Westover',
     'A memoir of a girl who leaves her survivalist family and, through education, discovers a wider world.',
     '9780399590504', 449, 'https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg',
     (SELECT id FROM categories WHERE slug = 'biography'), false),

    ('The Design of Everyday Things', 'Don Norman',
     'A foundational look at why some products satisfy customers and others frustrate them, from a design pioneer.',
     '9780465050659', 549, 'https://covers.openlibrary.org/b/isbn/9780465050659-L.jpg',
     (SELECT id FROM categories WHERE slug = 'technology'), false),

    ('Me Before You', 'Jojo Moyes',
     'An unlikely bond forms between a young woman and the paralyzed man she is hired to care for.',
     '9780143124542', 299, 'https://covers.openlibrary.org/b/isbn/9780143124542-L.jpg',
     (SELECT id FROM categories WHERE slug = 'romance'), false),

    ('Charlotte''s Web', 'E.B. White',
     'A pig named Wilbur and a clever spider named Charlotte form a friendship that becomes a small miracle.',
     '9780064400558', 249, 'https://covers.openlibrary.org/b/isbn/9780064400558-L.jpg',
     (SELECT id FROM categories WHERE slug = 'children'), false),

    ('Deep Work', 'Cal Newport',
     'Rules for focused success in a distracted world, and why the ability to concentrate is a superpower.',
     '9781455586691', 399, 'https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg',
     (SELECT id FROM categories WHERE slug = 'non-fiction'), false)
ON CONFLICT (isbn) DO NOTHING;

-- Inventory for the new titles
INSERT INTO inventory (book_id, quantity)
SELECT id, qty FROM (VALUES
    ('1984', 15),
    ('Sapiens', 9),
    ('The Silent Patient', 7),
    ('Educated', 6),
    ('The Design of Everyday Things', 4),
    ('Me Before You', 10),
    ('Charlotte''s Web', 13),
    ('Deep Work', 8)
) AS seed_qty(title, qty)
JOIN books ON books.title = seed_qty.title
ON CONFLICT (book_id) DO NOTHING;