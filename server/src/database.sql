create TABLE users(
    id SERIAL PRiMARY KEY,
    user_name VARCHAR(125) NOT NULL,
    user_surname VARCHAR(125) NOT NULL,
    user_email VARCHAR(125),
    user_pass VARCHAR(255) NOT NULL,
    is_active BOOLEAN,
    activation_link VARCHAR(255) NOT NULL,
    date_register VARCHAR(255) NOT NULL
);

create TABLE tokenList(
    userId INTEGER,
    refreshToken VARCHAR(255),
    FOREIGN KEY (userId) REFERENCES users (id)
);

create TABLE posts(
    id SERIAL PRIMARY KEY,
    author_id INTEGER NOT NULL,
    category_id INTEGER,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_date TIMESTAMP NOT NULL,
    likes_count INTEGER,
    comments_count INTEGER,
    FOREIGN KEY (author_id) REFERENCES users (id)
    -- FOREIGN KEY (category_id) REFERENCES categories (id)
);

create TABLE categories(
    id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);

	
INSERT INTO posts VALUES (2, 28, 1, 'Поиск альтернативы Trello и переезд в Kaiten — личный опыт веб-студии Pyrobyte', 'В статье расскажем, как и зачем переехали из Trello в новый инструмент с встроенным тайм-трекингом, организовали работу разных заказчиков, начали анализировать эффективность сотрудников, используя модуль «Учет времени», и создали собственный плагин для визуализации отчетов на открытом API Kaiten.', '2022-02-15');
