--countries
Insert into countries
(id, name)
values (1, 'Англия'),
       (2, 'Российская империя'),
       (3, 'Франция'),
       (4, 'Россия'),
       (5, 'Дания'),
       (6, 'Германия');

--genders
insert into gender (id, type) VALUES (1, 'Мужчина'), (2, 'Женщина');

--genres
INSERT INTO genres (id, name)
VALUES (1, 'Комедия'),
       (2, 'Драма'),
       (3, 'Трагедия'),
       (4, 'Опера');

--employee_type
INSERT INTO employee_type (id, type)
VALUES (1, 'Актер'),
       (2, 'Продюсер'),
       (3, 'Музыкант'),
       (4, 'Директор');

INSERT INTO employees
(id, type_id, birth_date, gender_id, hire_date, children_amount, salary, fio)
VALUES (1, 1, to_date('14-06-1985', 'DD-MM-YYYY'), 1, to_date('19-07-2007', 'DD-MM-YYYY'), 0, 35000, 'Изюм Иван Игнатьевич'),
       (2, 1, to_date('23-03-1991', 'DD-MM-YYYY'), 1, to_date('12-05-2011', 'DD-MM-YYYY'), 0, 15000, 'Пончик Петр Петрович'),
       (3, 2, to_date('17-08-1995', 'DD-MM-YYYY'), 1, to_date('04-09-2015', 'DD-MM-YYYY'), 2, 55000, 'Булка Борис Борисович'),
       (4, 3, to_date('06-12-2000', 'DD-MM-YYYY'), 2, to_date('01-01-2019', 'DD-MM-YYYY'), 1, 45000, 'Желе Зинаида Захаровна'),
       (5, 4, to_date('02-02-1997', 'DD-MM-YYYY'), 1, to_date('03-03-2018', 'DD-MM-YYYY'), 1, 70000, 'Чайник Чарли Чернов'),
       (6, 1, to_date('11-11-1983', 'DD-MM-YYYY'), 2, to_date('21-12-2006', 'DD-MM-YYYY'), 2, 40000, 'Картофель Констанc Константиновна'),
       (7, 2, to_date('01-09-1999', 'DD-MM-YYYY'), 2, to_date('0-09-2021', 'DD-MM-YYYY'), 1, 50000, 'Виноград Влада Владимировна'),
       (8, 3, to_date('28-04-1988', 'DD-MM-YYYY'), 1, to_date('08-06-2010', 'DD-MM-YYYY'), 0, 20000, 'Чеснок Чеслав Чеснов'),
       (9, 2, to_date('07-07-1992', 'DD-MM-YYYY'), 1, to_date('15-07-2013', 'DD-MM-YYYY'), 3, 60000, 'Печенье Петр Печенкин'),
       (10, 1, to_date('15-05-2002', 'DD-MM-YYYY'), 2, to_date('05-06-2020', 'DD-MM-YYYY'), 0, 30000, 'Конфетка Кира Кирилловна'),
       (11, 4, to_date('22-10-1986', 'DD-MM-YYYY'), 1, to_date('24-11-2008', 'DD-MM-YYYY'), 2, 80000, 'Пицца Павел Павлович'),
       (12, 2, to_date('31-01-1994', 'DD-MM-YYYY'), 1, to_date('02-02-2016', 'DD-MM-YYYY'), 1, 55000, 'Щи Степан Степанович'),
       (13, 1, to_date('25-12-1989', 'DD-MM-YYYY'), 1, to_date('30-12-2012', 'DD-MM-YYYY'), 0, 35000, 'Бульон Борис Бульонов');

INSERT INTO authors
(id, country_id, name, title, genre_id, birth_date, death_date)
VALUES
       (5, 4, 'Данте Алигьери', 'Божественная комедия', 2, '21-05-1265', '13-09-1321'),
       (9, 5, 'Джек Лондон', 'Зов предков', 1,  '12-01-1876', '22-11-1916');


INSERT INTO actors
(id, employee_id, height, is_student)
VALUES (1, 1, 178, false),
       (2, 2, 100, true),
       (3, 6, 180, false),
       (4, 10, 150, true),
       (5, 13, 190, true);

INSERT INTO director
(id, employee_id)
VALUES (1, 5),
       (2, 11);

INSERT INTO achievement
(id, date_of_competition, title, actor_id)
VALUES (1, '24-05-2022', 'Заслуженный артист России', 1);

INSERT INTO performances
(id, age_limit, premiere_date, author_id, time_duration)
VALUES (1, 18, '01-01-2018', 1, 135),
       (2, 12, '10-04-2005', 2, 125),
       (3, 16, '10-11-2022', 4, 130),
       (4, 18, '05-06-2019', 3, 145),
       (5, 16, '15-03-2017', 5, 120),
       (6, 12, '20-09-2015', 6, 150),
       (7, 18, '25-12-2019', 7, 175),
       (8, 16, '18-07-2020', 8, 130),
       (9, 14, '05-02-2014', 9, 110),
       (10, 18, '30-08-2016', 10, 160);

INSERT INTO date_of_tour
(id, date_start, date_end, performance_id)
VALUES (1, '27-11-2023', '05-12-2023', 1),
       (2,'10-01-2022', '24-01-2022', 3);

INSERT INTO actor_tour
(actor_id, date_of_tour_id)
VALUES (2, 1),
       (3, 2),
       (1, 1);

INSERT INTO director_performance
(director_id, performance_id)
VALUES (1, 1),
       (1, 2),
       (2, 3);

INSERT INTO date_of_playing
(id, date_of_performance, count_of_tickets, is_tour, season)
VALUES
       (1, to_date('20-03-2021', 'DD-MM-YYYY'), 200, false, date_part('years', age(to_date('20-03-2021', 'DD-MM-YYYY'), to_date('01-09-1980', 'DD-MM-YYYY')))),
       (2, to_date('10-04-2005', 'DD-MM-YYYY'), 200, false, date_part('years', age(to_date('12-09-2000', 'DD-MM-YYYY'), to_date('01-09-1980', 'DD-MM-YYYY')))),
       (3, to_date('24-10-2025', 'DD-MM-YYYY'), 200, true, date_part('years', age(to_date('24-10-2025', 'DD-MM-YYYY'), to_date('01-09-1980', 'DD-MM-YYYY')))),
       (4, to_date('31-03-2019', 'DD-MM-YYYY'), 200, false, date_part('years', age(to_date('31-03-2019', 'DD-MM-YYYY'), to_date('01-09-1980', 'DD-MM-YYYY')))),
       (5, to_date('15-09-2010', 'DD-MM-YYYY'), 200, false, date_part('years', age(to_date('15-09-2010', 'DD-MM-YYYY'), to_date('01-09-1980', 'DD-MM-YYYY'))));

INSERT INTO date_performance
(performance_id, date_id)
VALUES (1, 1),
       (1, 2),
       (2, 2),
       (2, 3),
       (3, 4),
       (1, 5);

INSERT INTO place
(id, number)
VALUES (1, 1), (2, 2), (3, 3), (4, 4), (5, 5), (6, 6), (7, 7), (8, 8), (9, 9), (10, 10);

INSERT INTO tickets
(id, is_preliminarily_sold, price, performance_id, date_id)
VALUES (1, false, 100, 1, 1),
       (2, true, 100, 2, 2),
       (3, false, 100, 1, 5),
       (4, false, 150, 2, 5);

INSERT INTO Ticket_place
(ticket_id, place_id)
VALUES (1, 1),
       (1, 2),
       (2, 1),
       (3, 1),
       (3, 3),
       (4, 5);

INSERT INTO subscription
(id, author_id, genre_id)
VALUES (1, 1, 3);

INSERT INTO roles
(id, name, is_main, age, gender_id, height, performance_id)
VALUES (1, 'Джон Сноу', true, 30, 1, 170, 1),
       (2, 'Гарри Поттер', true, 25, 1, 165, 1),
       (3, 'Алексей Каренин', false, 45, 1, 180, 1),
       (4, 'Ленора', false, 60, 2, 175, 1),
       (5, 'Виргилий', true, 40, 1, 185, 2),
       (6, 'Данте', true, 35, 1, 178, 2),
       (7, 'Дарт Вейдер', false, 28, 2, 170, 2),
       (8, 'Шарик', true, 25, 1, 175, 3),
       (9, 'Хомча', true, 20, 2, 165, 3),
       (10, 'Пожилая бебра', false, 30, 2, 180, 3);

INSERT INTO actor_playing_role
(is_main, date_of_playing, role_id, actor_id)
VALUES (true, '15-09-2002', 1, 1),
       (false, '20-03-2020', 1, 2);
