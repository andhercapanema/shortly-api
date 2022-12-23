--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.5 (Ubuntu 14.5-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    token character varying(36) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    user_id integer NOT NULL,
    short_url character varying(21) NOT NULL,
    long_url text NOT NULL,
    visits_count integer DEFAULT 0 NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password character varying(60) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 1, '5add5867-0142-4bde-b89e-38ead62edb1b', '2022-12-21 11:43:32.452628');
INSERT INTO public.sessions VALUES (2, 2, '657116c0-b2dd-4b82-83af-0640ee9e3aa9', '2022-12-21 17:36:37.138465');
INSERT INTO public.sessions VALUES (44, 4, '2ccf5413-b791-4966-9b7f-0f0f464d54ce', '2022-12-23 09:00:41.948751');
INSERT INTO public.sessions VALUES (45, 3, '27c2905b-0078-47f8-bfcf-75621c865937', '2022-12-23 10:07:15.742084');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (1, 1, '8Stl1o463l1uHQY-8j4mM', 'https://www.youtube.com/watch?v=jfKfPfyJRdk', 0, '2022-12-21 11:45:14.842152');
INSERT INTO public.urls VALUES (16, 3, 'bYYr3srBzwqVnnPhh5kPQ', 'https://translate.google.com.br/?hl=pt-BR', 1, '2022-12-23 08:34:09.116294');
INSERT INTO public.urls VALUES (17, 4, 'p8_dk754l05z2kHgVwkDN', 'https://www.instagram.com/', 7, '2022-12-23 09:00:55.298336');
INSERT INTO public.urls VALUES (19, 4, 'QjdcbgRNu0ZGmZcbCr78R', 'https://drive.google.com/drive/u/0/', 3, '2022-12-23 09:01:18.541614');
INSERT INTO public.urls VALUES (2, 1, 'TNj_8B2GCapyL9rA7j--V', 'https://www.notion.so/515df27d84c947b59350cfb49d25510d?v=5315f88e78a244498a3f51608a6a5f12', 18, '2022-12-21 11:45:23.538447');
INSERT INTO public.urls VALUES (18, 4, 'CtUY_Z7DV0bQonsjy-cwm', 'https://www.canva.com/pt_br/', 2, '2022-12-23 09:01:07.005017');
INSERT INTO public.urls VALUES (3, 2, 'h3lxH0ykq6chrya4FEkBw', 'https://www.figma.com/file/DWg9233KR2GS6RLvfZRwyd/Shortly?node-id=2%3A2&t=vjYdPqPONYnW9DXz-0', 2, '2022-12-21 17:37:28.333997');
INSERT INTO public.urls VALUES (21, 4, 'WQ1cuRhDFo3Yfd-RFChE_', 'https://globoplay.globo.com/', 2, '2022-12-23 09:02:31.58995');
INSERT INTO public.urls VALUES (5, 3, 'UHaUqlw91dBHKXqcO8K1I', 'https://github.com/andherpaulo/shortly-api/commits/main', 4, '2022-12-22 13:42:04.993981');
INSERT INTO public.urls VALUES (4, 3, '03Mxr-_QRJPq3a3Gw0R0i', 'https://ionic.io/ionicons', 10, '2022-12-22 13:41:24.271969');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Luciano', 'luciano@driven.com.br', '$2b$10$SCmxyXJJ9y0DdQum476KDuKuouVJ8FClrVqTqKCgDi7bqBjEw1Mgy', '2022-12-21 11:43:27.882226');
INSERT INTO public.users VALUES (2, 'Paola', 'paola@driven.com.br', '$2b$10$wj4CkClQnabF/IjUtig9cOC0YZdFd31ZxYN6mqvi8rfTIDYkwFwCq', '2022-12-21 17:36:21.023851');
INSERT INTO public.users VALUES (3, 'Pedro', 'pedro@gmail.com', '$2b$10$I1kbzFcoB7X8XvIydyB99utO5oL7OCLrxcH90ldois5zJ5j7WMzfK', '2022-12-22 11:18:06.956942');
INSERT INTO public.users VALUES (4, 'Laryssa', 'laryssa@gmail.com', '$2b$10$E7G5s92MmwuDVnI4RDsE1usSvjUlsDM/U38Fv/9jEBjxRXnmePjKS', '2022-12-23 09:00:34.645641');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 45, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 21, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_key UNIQUE (user_id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_short_url_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_short_url_key UNIQUE (short_url);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: urls urls_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

