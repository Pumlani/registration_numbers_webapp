DROP table if EXISTS towns, registration_numbers;

create table towns(
        id serial not null primary key,
        town text not null,
	tag text not null
);

create table registration_numbers (
        id serial not null primary key,
        registration text not null,
        town_id int,
        foreign key (town_id) references towns(id)
);

INSERT into towns (town, tag) values ('Cape Town','CA');
INSERT into towns (town, tag) values ('George','CJ');
INSERT into towns (town, tag) values ('Bellville','CY');
INSERT into towns (town, tag) values ('Kraaifontain','CF');