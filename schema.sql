DROP DATABASE IF EXISTS jovem_guarda;
CREATE DATABASE jovem_guarda;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id serial NOT NULL PRIMARY KEY,
  user_type varchar(15) NOT NULL,
  name varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  password varchar(100) NOT NULL,
  picture text,
  about text,
  address_street varchar(100),
  address_number varchar(50),
  address_city varchar(50),
  address_state varchar(50),
  address_zip varchar(10),
  phone varchar(15),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz,
  deleted_at timestamptz
)
ALTER TABLE users ADD CONSTRAINT user_type_check CHECK (user_type IN ('collectors', 'admin'));

DROP TABLE IF EXISTS discs;
CREATE TABLE discs (
  id serial NOT NULL PRIMARY KEY,
  user_id integer NOT NULL REFERENCES users(id),
  album varchar(100) NOT NULL,
  artist varchar(100) NOT NULL,
  release_year integer NOT NULL,
  img text,
  vynil_type varchar(100),
  album_type varchar(100),
  lenght time,
  disc_description text,
  disc_status varchar(50),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz,
  deleted_at timestamptz
)
ALTER TABLE discs ADD CONSTRAINT vynil_type_check CHECK (vynil_type IN ('transparent', 'matte', 'glossy', 'color', 'metallic'));
ALTER TABLE discs ADD CONSTRAINT album_type_check CHECK (album_type IN ('single', 'ep', 'lp'));
ALTER TABLE discs ADD CONSTRAINT disc_status_check CHECK (disc_status IN ('available to trade', 'wishlist', 'own'));
