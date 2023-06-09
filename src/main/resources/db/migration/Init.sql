create sequence achievement_seq
    increment by 50;

alter sequence achievement_seq owner to postgres;

create table countries
(
    id   serial
        primary key,
    name varchar(255) not null
        unique
);

alter table countries
    owner to postgres;

create table genres
(
    id   serial
        primary key,
    name varchar(255) not null
        unique
);

alter table genres
    owner to postgres;

create table authors
(
    id         serial
        primary key,
    name       varchar(255) not null,
    genre_id   integer
                            references genres
                                on update cascade on delete set null,
    country_id integer
                            references countries
                                on update cascade on delete set null,
    birth_date date         not null,
    death_date date,
    title      varchar(255)
);

alter table authors
    owner to postgres;

create table employee_type
(
    id   serial
        primary key,
    type varchar(255)
);

alter table employee_type
    owner to postgres;

create table gender
(
    id   serial
        primary key,
    type varchar(255) not null
);

alter table gender
    owner to postgres;

create table employees
(
    id              serial
        primary key,
    fio             varchar(255),
    gender_id       integer
        constraint gender_id
            references gender,
    birth_date      date,
    children_amount integer,
    salary          integer,
    hire_date       date,
    type_id         integer
        constraint type_id
            references employee_type
);

alter table employees
    owner to postgres;

create table actors
(
    id          serial
        primary key,
    employee_id integer
        references employees
            on delete cascade,
    is_student  boolean,
    height      integer
);

alter table actors
    owner to postgres;

create table director
(
    id          serial
        primary key,
    employee_id integer not null
        constraint employee_uniq_pk
            unique
        references employees
);

alter table director
    owner to postgres;

create table achievement
(
    id                  serial
        primary key,
    date_of_competition date         not null,
    competition         varchar(255) not null,
    actor_id            integer      not null
        references actors
            on update set null on delete set null,
    rank                varchar(255)
);

alter table achievement
    owner to postgres;

create table date_of_playing
(
    id                  serial
        primary key,
    date_of_performance date    not null,
    season              integer not null,
    count_of_tickets    integer,
    is_tour             boolean not null
);

alter table date_of_playing
    owner to postgres;

create table musician
(
    id          serial
        primary key,
    employee_id integer
        references employees
);

alter table musician
    owner to postgres;

create table producer
(
    id          serial
        primary key,
    employee_id integer not null
        references employees
);

alter table producer
    owner to postgres;

create table performances
(
    id                      serial
        primary key,
    age_limit               integer,
    author_id               integer
        constraint author_id
            references authors,
    time_duration           numeric(3),
    premiere_date           date,
    director_performance_id integer
        constraint director_performance___fk
            references director,
    musician_id             integer
        constraint musician_perf___fk
            references musician,
    producer_id             integer
        constraint producer_perf___fk
            references producer
);

alter table performances
    owner to postgres;

create table roles
(
    id             serial
        primary key,
    name           varchar(255),
    age            integer,
    gender_id      integer
        constraint gender_id
            references gender
            on update cascade on delete set null,
    is_main        boolean,
    height         integer,
    performance_id integer
        constraint fkk2kisqwgje7rdh4tct2ni9642
            references performances
            on update cascade on delete cascade
);

alter table roles
    owner to postgres;

create table date_of_tour
(
    id             serial
        primary key,
    date_start     date    not null,
    date_end       date    not null,
    performance_id integer not null
        references performances,
    constraint data_check_data_consistency
        check (date_start <= date_end)
);

alter table date_of_tour
    owner to postgres;

create table actor_tour
(
    actor_id        integer not null
        references actors
            on update cascade on delete set null,
    date_of_tour_id integer not null
        references date_of_tour
            on update cascade on delete set null,
    primary key (actor_id, date_of_tour_id)
);

alter table actor_tour
    owner to postgres;

create table date_performance
(
    date_id        integer not null
        references date_of_playing,
    performance_id integer not null
        constraint performance_id_fkey
            references performances,
    primary key (date_id, performance_id)
);

alter table date_performance
    owner to postgres;

create table tickets
(
    id             serial
        primary key,
    price          integer not null,
    performance_id bigint  not null
        references performances,
    date_id        bigint  not null
        references date_of_playing
);

alter table tickets
    owner to postgres;

create table ticket_number
(
    ticket_id        bigint not null
        constraint ticket_place_ticket_id_fkey
            references tickets
            on delete cascade,
    number_ticket_id bigint not null,
    is_sold          boolean,
    constraint ticket_number_pk
        primary key (ticket_id, number_ticket_id)
);

alter table ticket_number
    owner to postgres;

create table director_performances
(
    director_id     bigint not null
        constraint fkbq4ga21x668pnky19bp9d576k
            references director,
    performances_id bigint not null
        constraint uk_9pfqnf6t2ruknrsrb9xjic7r9
            unique
        constraint fkaj3t8o96pnyjsis5jx8jxffg6
            references performances
);

alter table director_performances
    owner to postgres;

create table musician_performances
(
    musician_id     bigint not null
        constraint fk25nqg2iaq6jqby1cpla2ov676
            references musician,
    performances_id bigint not null
        constraint uk_t8eq2qj4th325hk0n2d27wdi9
            unique
        constraint fkljinpupcqul7mt4sqxwjinbie
            references performances
);

alter table musician_performances
    owner to postgres;

create table producer_performances
(
    producer_id     bigint not null
        constraint fkjmg8c5h4o1i70h25otowfrxiv
            references producer,
    performances_id bigint not null
        constraint uk_nt937tbcv33snfi4s2wcpj8xv
            unique
        constraint fk9w4qfupelxjg3wmq8qqh7y6ih
            references performances
);

alter table producer_performances
    owner to postgres;

create table actor_playing_role
(
    is_main         boolean not null,
    date_of_playing date    not null,
    role_id         integer not null
        references roles
            on update set null on delete set null,
    actor_id        integer not null
        references actors,
    primary key (role_id, actor_id)
);

alter table actor_playing_role
    owner to postgres;

create function delete_actor_data() returns trigger
    language plpgsql
as
$$
BEGIN
    IF OLD.type_id = (SELECT id FROM Employee_type WHERE type = 'Актёр') THEN
        DELETE FROM Achievement WHERE actor_id = OLD.id;
        DELETE FROM Actor_playing_role WHERE actor_id = OLD.id;
        DELETE FROM Actor_tour WHERE actor_id = OLD.id;
        DELETE FROM actors WHERE id = OLD.id;
    END IF;
    RETURN OLD;
END;
$$;

alter function delete_actor_data() owner to postgres;

create trigger delete_actor_data_trigger
    before delete
    on employees
    for each row
execute procedure delete_actor_data();

create function delete_date_of_tour() returns trigger
    language plpgsql
as
$$
BEGIN
    DELETE FROM Actor_tour WHERE date_of_tour_id = OLD.id;
    RETURN OLD;
END;
$$;

alter function delete_date_of_tour() owner to postgres;

create trigger cascade_delete_date_of_tour
    before delete
    on date_of_tour
    for each row
execute procedure delete_date_of_tour();

create function delete_role() returns trigger
    language plpgsql
as
$$
BEGIN
    DELETE FROM Actor_playing_role WHERE role_id = OLD.id;
    RETURN OLD;
END;
$$;

alter function delete_role() owner to postgres;

create trigger cascade_delete_role
    before delete
    on roles
    for each row
execute procedure delete_role();

create function delete_performance() returns trigger
    language plpgsql
as
$$
BEGIN
    DELETE FROM Date_performance WHERE performance_id = OLD.id;
    DELETE FROM tickets WHERE performance_id = OLD.id;
    DELETE FROM Date_of_tour WHERE performance_id = OLD.id;
    DELETE FROM roles WHERE performance_id = OLD.id;
    RETURN OLD;
END;
$$;

alter function delete_performance() owner to postgres;

create trigger cascade_delete_performance
    before delete
    on performances
    for each row
execute procedure delete_performance();