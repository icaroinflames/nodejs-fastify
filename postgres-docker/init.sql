-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    user_id SERIAL,
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(60) COLLATE pg_catalog."default" NOT NULL,
    "timestamp" timestamp without time zone NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (user_id),
    CONSTRAINT email UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to admin;