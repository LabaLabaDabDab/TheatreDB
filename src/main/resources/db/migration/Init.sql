CREATE TABLE IF NOT EXISTS gender (
    id serial primary key,
    type varchar(255) NOT NULL unique
);

CREATE TABLE IF NOT EXISTS countries (
    id serial primary key,
    name varchar(255) not null unique
);

CREATE TABLE IF NOT EXISTS authors (
	id serial primary key,
	name varchar(255) NOT NULL,
	genre_id integer references genres(id),
	country_id integer references countries(id),
	birth_date DATE NOT NULL,
	death_date DATE NOT NULL,
    title varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS director (
    id serial primary key,
    employee_id integer NOT NULL REFERENCES employees(id)
);

CREATE TABLE IF NOT EXISTS employees (
    id serial primary key,
    type_id integer references employee_type,
    fio varchar(255),
    gender_id integer references gender,
    birth_date date,
    children_amount integer,
    salary integer,
    hire_date date
);

CREATE TABLE IF NOT EXISTS employee_type(
    id serial primary key,
    type varchar(255)
);

CREATE TABLE IF NOT EXISTS actors (
    id serial primary key,
    employee_id integer references employees(id) on delete cascade,
    is_student boolean,
    height integer
);

CREATE TABLE IF NOT EXISTS producers (
    id serial primary key,
    employee_id integer references employees(id) on delete cascade,
    activity varchar(255)
);

CREATE TABLE IF NOT EXISTS musicians (
    id serial primary key,
    employee_id integer references employees(id) on delete cascade,
    instrument varchar(255)
);

CREATE TABLE IF NOT EXISTS genres (
    id serial primary key,
    name varchar(255) not null unique
);

CREATE TABLE IF NOT EXISTS performances(
   id serial primary key,
   age_limit integer NOT NULL,
   premiere_date DATE NOT NULL,
   author_id integer REFERENCES authors,
   time_duration NUMERIC(3) NOT NULL
);

CREATE TABLE IF NOT EXISTS tickets (
    id serial primary key,
    is_preliminarily_sold BOOLEAN NOT NULL,
    price integer not null,
	performance_id integer NOT NULL REFERENCES performances(id),
	date_id integer REFERENCES Date_of_playing(id) NOT NULL
);

CREATE TABLE IF NOT EXISTS ticket_place (
    ticket_id integer REFERENCES tickets(id) NOT NULL,
    place_id integer REFERENCES place(id) NOT NULL,
    PRIMARY KEY (ticket_id, place_id)
);

CREATE TABLE IF NOT EXISTS place (
    id serial primary key,
    number NUMERIC(3) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS roles (
    id serial primary key,
    name varchar(255) NOT NULL,
    is_main BOOLEAN NOT NULL,
    age integer NOT NULL,
    gender_id integer NOT NULL REFERENCES gender,
    height integer,
    performance_id integer NOT NULL REFERENCES performances(id)
);

CREATE TABLE IF NOT EXISTS achievement (
    id serial primary key,
    date_of_competition DATE NOT NULL,
    title varchar(255) NOT NULL,
    actor_id integer NOT NULL REFERENCES actors(id)
);

CREATE TABLE IF NOT EXISTS Subscription (
   id serial primary key,
   author_id integer references authors,
   genre_id integer references genres
);

CREATE TABLE IF NOT EXISTS Date_of_playing (
    id serial primary key,
    date_of_performance DATE NOT NULL,
    season integer NOT NULL,
    count_of_tickets integer,
    is_tour BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS Date_of_tour (
    id serial primary key,
    date_start DATE NOT NULL,
    date_end DATE NOT NULL,
    performance_id integer NOT NULL REFERENCES performances(id)
);

CREATE TABLE IF NOT EXISTS Actor_tour (
    actor_id  integer NOT NULL REFERENCES actors,
    date_of_tour_id integer NOT NULL REFERENCES Date_of_tour,
    PRIMARY KEY (actor_id, date_of_tour_id)
);

CREATE TABLE IF NOT EXISTS Actor_playing_role (
    is_main BOOLEAN NOT NULL,
    date_of_playing DATE NOT NULL,
    role_id integer NOT NULL REFERENCES roles(id),
    actor_id integer NOT NULL REFERENCES actors(id),
    PRIMARY KEY (role_id, actor_id)
);

CREATE TABLE IF NOT EXISTS Date_Performance (
    date_id integer REFERENCES Date_of_playing(id) NOT NULL,
    performance_id integer REFERENCES performances(id) NOT NULL,
    PRIMARY KEY (date_id, performance_id)
);

CREATE TABLE IF NOT EXISTS Director_Performance (
    director_id integer REFERENCES Director(id) NOT NULL,
    performance_id integer REFERENCES performances(id) NOT NULL,
    PRIMARY KEY (director_id, performance_id)
);