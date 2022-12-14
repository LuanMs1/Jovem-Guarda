DROP DATABASE IF EXISTS jovem_guarda;
CREATE DATABASE jovem_guarda;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id serial NOT NULL PRIMARY KEY,
  user_type varchar(15) NOT NULL,
  name varchar(100) NOT NULL,
  email varchar(100) UNIQUE NOT NULL,
  password varchar(100) NOT NULL,
  cpf varchar(11) UNIQUE,
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
);
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
  length time,
  genre varchar(20),
  disc_description text,
  disc_status varchar(50),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz,
  deleted_at timestamptz
);
ALTER TABLE discs ADD CONSTRAINT vynil_type_check CHECK (vynil_type IN ('transparent', 'matte', 'glossy', 'color', 'metallic'));
ALTER TABLE discs ADD CONSTRAINT album_type_check CHECK (album_type IN ('single', 'ep', 'lp'));
ALTER TABLE discs ADD CONSTRAINT disc_status_check CHECK (disc_status IN ('available to trade', 'wishlist', 'own'));
ALTER TABLE discs ADD CONSTRAINT genre_check CHECK (genre IN ('Blues','Country', 'Eletrônica', 'Forró', 'Funk', 'Gospel', 'Hip Hop', 'Jazz', 'MPB',
'Música clássica', 'Pagode', 'Pop', 'Rap', 'Reggae', 'Rock', 'Samba', 'Axé'))

DROP TABLE IF EXISTS exchange;
CREATE TABLE exchange (
  id serial NOT NULL PRIMARY KEY,
  status varchar(50) DEFAULT 'pending_approval',
  user_to integer NOT NULL REFERENCES users(id),
  user_from integer NOT NULL REFERENCES users(id),
  requested_at timestamptz DEFAULT now(),
  finished_at timestamptz
  user_completed int
);
ALTER TABLE exchange ADD CONSTRAINT exchange_status_check CHECK (status IN ('pending_approval', 'rejected', 'pending_exchange', 'cancelled', 'complete'));
ALTER TABLE exchange ADD CONSTRAINT user_completed_fk FOREIGN KEY (user_completed) REFERENCES users(id);

DROP TABLE IF EXISTS exchange_disc_list;
CREATE TABLE exchange_disc_list (
  exchange_id integer NOT NULL REFERENCES exchange(id),
  disc_id integer NOT NULL REFERENCES discs(id)
);
ALTER TABLE exchange_disc_list ADD CONSTRAINT exchange_disc_list_pk PRIMARY KEY (exchange_id, disc_id);

DROP TABLE IF EXISTS avaliations;
CREATE TABLE avaliations (
  id serial NOT NULL PRIMARY KEY,
  user_id integer NOT NULL REFERENCES users(id),
  rate integer NOT NULL,
  description text NOT NULL,
  exchange_id integer NOT NULL REFERENCES exchange(id),
  created_at timestamptz DEFAULT now()
);
DROP TABLE IF EXISTS discs_img;
CREATE TABLE discs_img(
	disc_id int, 
	img VARCHAR,
	PRIMARY KEY (disc_id, img),
	FOREIGN KEY (disc_id) REFERENCES discs(id)
);
