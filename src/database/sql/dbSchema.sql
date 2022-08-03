--
-- PostgreSQL database cluster dump
--

-- Started on 2022-07-30 14:13:26

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE sms_appserver;
ALTER ROLE sms_appserver WITH NOSUPERUSER INHERIT NOCREATEROLE CREATEDB LOGIN REPLICATION NOBYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:JkjVhKGZ4pUJ94Ws+28x4w==$veidYiXI9olWVi7VKJpNbn4eqIGm5vVMAc2ly2yC7XA=:bF8h/VKVsEb4icSKJlbRR5E5Tj1xr1UTxQz5FR75ThQ=';






--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

-- Started on 2022-07-30 14:13:26

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

-- Completed on 2022-07-30 14:13:26

--
-- PostgreSQL database dump complete
--

--
-- Database "studentmanagementsystem" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

-- Started on 2022-07-30 14:13:27

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

--
-- TOC entry 3215 (class 1262 OID 51067)
-- Name: studentmanagementsystem; Type: DATABASE; Schema: -; Owner: sms_appserver
--

CREATE DATABASE studentmanagementsystem WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';


ALTER DATABASE studentmanagementsystem OWNER TO sms_appserver;

\connect studentmanagementsystem

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

--
-- TOC entry 2 (class 3079 OID 51068)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 3216 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- TOC entry 229 (class 1255 OID 51079)
-- Name: auto_add_guardian(); Type: FUNCTION; Schema: public; Owner: sms_appserver
--

CREATE FUNCTION public.auto_add_guardian() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	INSERT INTO guardians(student_id) 
	VALUES (NEW.id);
	RETURN NEW;
END;
$$;


ALTER FUNCTION public.auto_add_guardian() OWNER TO sms_appserver;

--
-- TOC entry 230 (class 1255 OID 51080)
-- Name: update_timestamp(); Type: FUNCTION; Schema: public; Owner: sms_appserver
--

CREATE FUNCTION public.update_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	IF NOT 'updated_at' = ANY(SELECT jsonb_object_keys(to_jsonb(NEW))) THEN
		RAISE EXCEPTION '`updated_at` column does not exist in table %', TG_TABLE_NAME;
	END IF;
	
	NEW.updated_at := now();
	RETURN NEW;
END
$$;


ALTER FUNCTION public.update_timestamp() OWNER TO sms_appserver;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 201 (class 1259 OID 51081)
-- Name: academic_terms; Type: TABLE; Schema: public; Owner: sms_appserver
--

CREATE TABLE public.academic_terms (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(60) NOT NULL,
    is_hidden boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT valid_update_date CHECK ((updated_at >= created_at))
);


ALTER TABLE public.academic_terms OWNER TO sms_appserver;

--
-- TOC entry 202 (class 1259 OID 51089)
-- Name: api_keys; Type: TABLE; Schema: public; Owner: sms_appserver
--

CREATE TABLE public.api_keys (
    key uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(40) NOT NULL,
    privilege integer NOT NULL,
    is_revoked boolean DEFAULT false NOT NULL
);


ALTER TABLE public.api_keys OWNER TO sms_appserver;

--
-- TOC entry 203 (class 1259 OID 51102)
-- Name: configuration; Type: TABLE; Schema: public; Owner: sms_appserver
--

CREATE TABLE public.configuration (
    key text NOT NULL,
    value text,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.configuration OWNER TO sms_appserver;

--
-- TOC entry 204 (class 1259 OID 51109)
-- Name: course_schedules; Type: TABLE; Schema: public; Owner: sms_appserver
--

CREATE TABLE public.course_schedules (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    course_id uuid NOT NULL,
    academic_term_id uuid NOT NULL,
    name character varying(60) NOT NULL,
    is_hidden boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    year_level character varying(30) NOT NULL,
    CONSTRAINT valid_update_date CHECK ((updated_at >= created_at))
);


ALTER TABLE public.course_schedules OWNER TO sms_appserver;

--
-- TOC entry 205 (class 1259 OID 51117)
-- Name: course_schedules_contents; Type: TABLE; Schema: public; Owner: sms_appserver
--

CREATE TABLE public.course_schedules_contents (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    course_schedule_id uuid NOT NULL,
    schedule_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.course_schedules_contents OWNER TO sms_appserver;

--
-- TOC entry 206 (class 1259 OID 51122)
-- Name: courses; Type: TABLE; Schema: public; Owner: sms_appserver
--

CREATE TABLE public.courses (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(60) NOT NULL,
    department_id uuid NOT NULL,
    is_hidden boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    code character varying(30)
);


ALTER TABLE public.courses OWNER TO sms_appserver;

--
-- TOC entry 207 (class 1259 OID 51129)
-- Name: departments; Type: TABLE; Schema: public; Owner: sms_appserver
--

CREATE TABLE public.departments (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(60) NOT NULL,
    is_hidden boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT valid_update_date CHECK ((updated_at >= created_at))
);


ALTER TABLE public.departments OWNER TO sms_appserver;

--
-- TOC entry 208 (class 1259 OID 51137)
-- Name: enrollment_reg_num; Type: SEQUENCE; Schema: public; Owner: sms_appserver
--

CREATE SEQUENCE public.enrollment_reg_num
    START WITH 3127427
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 9999999
    CACHE 1
    CYCLE;


ALTER TABLE public.enrollment_reg_num OWNER TO sms_appserver;

--
-- TOC entry 209 (class 1259 OID 51139)
-- Name: enrollments; Type: TABLE; Schema: public; Owner: sms_appserver
--

CREATE TABLE public.enrollments (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    academic_term_id uuid NOT NULL,
    student_id uuid NOT NULL,
    course_schedule_id uuid NOT NULL,
    is_revoked boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    status character varying(16) NOT NULL,
    _reg_num integer DEFAULT nextval('public.enrollment_reg_num'::regclass) NOT NULL
);


ALTER TABLE public.enrollments OWNER TO sms_appserver;

--
-- TOC entry 210 (class 1259 OID 51147)
-- Name: enrollments_view; Type: VIEW; Schema: public; Owner: sms_appserver
--

CREATE VIEW public.enrollments_view AS
 SELECT enrollments.id,
    enrollments.academic_term_id,
    enrollments.student_id,
    enrollments.course_schedule_id,
    enrollments.is_revoked,
    enrollments.created_at,
    enrollments.updated_at,
    enrollments.status,
    concat((date_part('year'::text, enrollments.created_at))::text, lpad((enrollments._reg_num)::text, 7, '0'::text)) AS reg_num
   FROM public.enrollments;


ALTER TABLE public.enrollments_view OWNER TO sms_appserver;

--
-- TOC entry 211 (class 1259 OID 51151)
-- Name: grades; Type: TABLE; Schema: public; Owner: sms_appserver
--

CREATE TABLE public.grades (
    enrollment_id uuid NOT NULL,
    subject_id uuid NOT NULL,
    grade real NOT NULL,
    is_hidden boolean DEFAULT false NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.grades OWNER TO sms_appserver;

--
-- TOC entry 212 (class 1259 OID 51156)
-- Name: guardians; Type: TABLE; Schema: public; Owner: sms_appserver
--

CREATE TABLE public.guardians (
    student_id uuid NOT NULL,
    first_name character varying(60),
    middle_name character varying(60),
    last_name character varying(60),
    phone_number character varying(20),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    address character varying(100),
    first_name_2 character varying(60),
    middle_name_2 character varying(60),
    last_name_2 character varying(60),
    phone_number_2 character varying(20),
    address_2 character varying(100),
    CONSTRAINT valid_update_date CHECK ((updated_at >= created_at))
);


ALTER TABLE public.guardians OWNER TO sms_appserver;

--
-- TOC entry 213 (class 1259 OID 51165)
-- Name: management_accounts; Type: TABLE; Schema: public; Owner: sms_appserver
--

CREATE TABLE public.management_accounts (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying(40) NOT NULL,
    password character varying(64) NOT NULL,
    privilege integer NOT NULL,
    is_deactivated boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    name character varying(60) NOT NULL
);


ALTER TABLE public.management_accounts OWNER TO sms_appserver;

--
-- TOC entry 214 (class 1259 OID 51172)
-- Name: professors; Type: TABLE; Schema: public; Owner: sms_appserver
--

CREATE TABLE public.professors (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    department_id uuid NOT NULL,
    first_name character varying(60) NOT NULL,
    middle_name character varying(60) NOT NULL,
    last_name character varying(60) NOT NULL,
    phone_number character varying(20),
    is_hidden boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.professors OWNER TO sms_appserver;

--
-- TOC entry 215 (class 1259 OID 51195)
-- Name: schedules; Type: TABLE; Schema: public; Owner: sms_appserver
--

CREATE TABLE public.schedules (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    professor_id uuid NOT NULL,
    subject_id uuid NOT NULL,
    room character varying(30) NOT NULL,
    class character varying(30) NOT NULL,
    capacity integer NOT NULL,
    time_start time without time zone NOT NULL,
    time_duration interval NOT NULL,
    days integer NOT NULL,
    is_hidden boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT valid_update_date CHECK ((updated_at >= created_at))
);


ALTER TABLE public.schedules OWNER TO sms_appserver;

--
-- TOC entry 216 (class 1259 OID 51203)
-- Name: students; Type: TABLE; Schema: public; Owner: sms_appserver
--

CREATE TABLE public.students (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    school_id character varying(30),
    first_name character varying(60) NOT NULL,
    middle_name character varying(60) NOT NULL,
    last_name character varying(60) NOT NULL,
    sex character varying(20) NOT NULL,
    birth_date date NOT NULL,
    phone_number character varying(15),
    email_address character varying(60),
    is_currently_enrolled boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    is_hidden boolean DEFAULT false NOT NULL,
    a_street character varying(60) NOT NULL,
    a_barangay character varying(60) NOT NULL,
    a_city character varying(40) NOT NULL,
    a_province character varying(40) NOT NULL,
    a_zip_code integer NOT NULL,
    CONSTRAINT valid_update_date CHECK ((updated_at >= created_at))
);


ALTER TABLE public.students OWNER TO sms_appserver;

--
-- TOC entry 217 (class 1259 OID 51215)
-- Name: students_fix; Type: VIEW; Schema: public; Owner: sms_appserver
--

CREATE VIEW public.students_fix AS
 SELECT students.id,
    students.school_id,
    students.first_name,
    students.middle_name,
    students.last_name,
    students.a_street,
    students.a_barangay,
    students.a_city,
    students.a_province,
    students.a_zip_code,
    concat_ws(', '::text, students.a_street, students.a_barangay, students.a_city, concat_ws(' '::text, students.a_zip_code, students.a_province)) AS address,
    students.sex,
    (students.birth_date)::text AS birth_date,
    students.phone_number,
    students.email_address,
    students.is_currently_enrolled,
    students.is_hidden,
    students.created_at,
    students.updated_at
   FROM public.students;


ALTER TABLE public.students_fix OWNER TO sms_appserver;

--
-- TOC entry 218 (class 1259 OID 51220)
-- Name: subjects; Type: TABLE; Schema: public; Owner: sms_appserver
--

CREATE TABLE public.subjects (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    code character varying(60) NOT NULL,
    name character varying(60) NOT NULL,
    is_hidden boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    unit_lec real DEFAULT 0 NOT NULL,
    unit_lab real DEFAULT 0 NOT NULL
);


ALTER TABLE public.subjects OWNER TO sms_appserver;

--
-- TOC entry 2995 (class 2606 OID 51230)
-- Name: academic_terms academic_terms_pkey; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.academic_terms
    ADD CONSTRAINT academic_terms_pkey PRIMARY KEY (id);


--
-- TOC entry 2999 (class 2606 OID 51232)
-- Name: api_keys api_keys_pkey; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.api_keys
    ADD CONSTRAINT api_keys_pkey PRIMARY KEY (key);


--
-- TOC entry 3001 (class 2606 OID 51240)
-- Name: configuration configuration_pkey; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.configuration
    ADD CONSTRAINT configuration_pkey PRIMARY KEY (key);


--
-- TOC entry 3008 (class 2606 OID 51242)
-- Name: course_schedules_contents course_schedules_contents_pkey; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.course_schedules_contents
    ADD CONSTRAINT course_schedules_contents_pkey PRIMARY KEY (id);


--
-- TOC entry 3003 (class 2606 OID 51244)
-- Name: course_schedules course_schedules_pkey; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.course_schedules
    ADD CONSTRAINT course_schedules_pkey PRIMARY KEY (id);


--
-- TOC entry 3014 (class 2606 OID 51246)
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- TOC entry 3019 (class 2606 OID 51248)
-- Name: departments departments_pkey; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (id);


--
-- TOC entry 3024 (class 2606 OID 51250)
-- Name: enrollments enrollments_pkey; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT enrollments_pkey PRIMARY KEY (id);


--
-- TOC entry 3029 (class 2606 OID 51252)
-- Name: guardians guardians_pkey; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.guardians
    ADD CONSTRAINT guardians_pkey PRIMARY KEY (student_id);


--
-- TOC entry 3031 (class 2606 OID 51254)
-- Name: management_accounts management_accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.management_accounts
    ADD CONSTRAINT management_accounts_pkey PRIMARY KEY (id);


--
-- TOC entry 3033 (class 2606 OID 51256)
-- Name: management_accounts management_accounts_username_key; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.management_accounts
    ADD CONSTRAINT management_accounts_username_key UNIQUE (username);


--
-- TOC entry 3026 (class 2606 OID 51258)
-- Name: grades pk_enrollment_id_subject_id; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.grades
    ADD CONSTRAINT pk_enrollment_id_subject_id PRIMARY KEY (enrollment_id, subject_id);


--
-- TOC entry 3036 (class 2606 OID 51260)
-- Name: professors professors_pkey; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.professors
    ADD CONSTRAINT professors_pkey PRIMARY KEY (id);


--
-- TOC entry 3041 (class 2606 OID 51264)
-- Name: schedules schedules_pkey; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT schedules_pkey PRIMARY KEY (id);


--
-- TOC entry 3044 (class 2606 OID 51266)
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- TOC entry 3047 (class 2606 OID 51268)
-- Name: subjects subjects_pkey; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_pkey PRIMARY KEY (id);


--
-- TOC entry 2997 (class 2606 OID 51270)
-- Name: academic_terms unique_academic_term_name; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.academic_terms
    ADD CONSTRAINT unique_academic_term_name UNIQUE (name);


--
-- TOC entry 3016 (class 2606 OID 51272)
-- Name: courses unique_course_name; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT unique_course_name UNIQUE (name);


--
-- TOC entry 3011 (class 2606 OID 51274)
-- Name: course_schedules_contents unique_course_schedule_content_pair; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.course_schedules_contents
    ADD CONSTRAINT unique_course_schedule_content_pair UNIQUE (course_schedule_id, schedule_id);


--
-- TOC entry 3006 (class 2606 OID 51276)
-- Name: course_schedules unique_course_schedule_set; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.course_schedules
    ADD CONSTRAINT unique_course_schedule_set UNIQUE (course_id, academic_term_id, name, year_level);


--
-- TOC entry 3021 (class 2606 OID 51278)
-- Name: departments unique_department_name; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.departments
    ADD CONSTRAINT unique_department_name UNIQUE (name);


--
-- TOC entry 3038 (class 2606 OID 51280)
-- Name: professors unique_prof_names; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.professors
    ADD CONSTRAINT unique_prof_names UNIQUE (first_name, middle_name, last_name);


--
-- TOC entry 3049 (class 2606 OID 51284)
-- Name: subjects unique_subject_pair; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT unique_subject_pair UNIQUE (code, name);


--
-- TOC entry 2974 (class 2606 OID 51285)
-- Name: professors valid_update_date; Type: CHECK CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE public.professors
    ADD CONSTRAINT valid_update_date CHECK ((updated_at >= created_at)) NOT VALID;


--
-- TOC entry 2992 (class 2606 OID 51286)
-- Name: subjects valid_update_date; Type: CHECK CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE public.subjects
    ADD CONSTRAINT valid_update_date CHECK ((updated_at >= created_at)) NOT VALID;


--
-- TOC entry 2960 (class 2606 OID 51287)
-- Name: enrollments valid_update_date; Type: CHECK CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE public.enrollments
    ADD CONSTRAINT valid_update_date CHECK ((updated_at >= created_at)) NOT VALID;


--
-- TOC entry 2949 (class 2606 OID 51288)
-- Name: courses valid_update_date; Type: CHECK CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE public.courses
    ADD CONSTRAINT valid_update_date CHECK ((updated_at >= created_at)) NOT VALID;


--
-- TOC entry 2993 (class 1259 OID 51289)
-- Name: academic_terms_index; Type: INDEX; Schema: public; Owner: sms_appserver
--

CREATE INDEX academic_terms_index ON public.academic_terms USING btree (id);


--
-- TOC entry 3012 (class 1259 OID 51292)
-- Name: courses_index; Type: INDEX; Schema: public; Owner: sms_appserver
--

CREATE INDEX courses_index ON public.courses USING btree (id);


--
-- TOC entry 3004 (class 1259 OID 51293)
-- Name: cs_index; Type: INDEX; Schema: public; Owner: sms_appserver
--

CREATE INDEX cs_index ON public.course_schedules USING btree (id);


--
-- TOC entry 3009 (class 1259 OID 51294)
-- Name: csc_index; Type: INDEX; Schema: public; Owner: sms_appserver
--

CREATE INDEX csc_index ON public.course_schedules_contents USING btree (id);


--
-- TOC entry 3017 (class 1259 OID 51295)
-- Name: department_index; Type: INDEX; Schema: public; Owner: sms_appserver
--

CREATE INDEX department_index ON public.departments USING btree (id);


--
-- TOC entry 3022 (class 1259 OID 51296)
-- Name: enrollment_index; Type: INDEX; Schema: public; Owner: sms_appserver
--

CREATE INDEX enrollment_index ON public.enrollments USING btree (id);


--
-- TOC entry 3027 (class 1259 OID 51297)
-- Name: guardian_index; Type: INDEX; Schema: public; Owner: sms_appserver
--

CREATE INDEX guardian_index ON public.guardians USING btree (student_id);


--
-- TOC entry 3034 (class 1259 OID 51298)
-- Name: professor_index; Type: INDEX; Schema: public; Owner: sms_appserver
--

CREATE INDEX professor_index ON public.professors USING btree (id);


--
-- TOC entry 3039 (class 1259 OID 51299)
-- Name: schedule_index; Type: INDEX; Schema: public; Owner: sms_appserver
--

CREATE INDEX schedule_index ON public.schedules USING btree (id);


--
-- TOC entry 3042 (class 1259 OID 51300)
-- Name: student_index; Type: INDEX; Schema: public; Owner: sms_appserver
--

CREATE INDEX student_index ON public.students USING btree (id);


--
-- TOC entry 3045 (class 1259 OID 51301)
-- Name: subject_index; Type: INDEX; Schema: public; Owner: sms_appserver
--

CREATE INDEX subject_index ON public.subjects USING btree (id);


--
-- TOC entry 3075 (class 2620 OID 51302)
-- Name: students auto_add_guardian; Type: TRIGGER; Schema: public; Owner: sms_appserver
--

CREATE TRIGGER auto_add_guardian AFTER INSERT ON public.students FOR EACH ROW EXECUTE FUNCTION public.auto_add_guardian();


--
-- TOC entry 3064 (class 2620 OID 51303)
-- Name: academic_terms update_timestamp; Type: TRIGGER; Schema: public; Owner: sms_appserver
--

CREATE TRIGGER update_timestamp BEFORE UPDATE ON public.academic_terms FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- TOC entry 3065 (class 2620 OID 51304)
-- Name: configuration update_timestamp; Type: TRIGGER; Schema: public; Owner: sms_appserver
--

CREATE TRIGGER update_timestamp BEFORE UPDATE ON public.configuration FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- TOC entry 3066 (class 2620 OID 51305)
-- Name: course_schedules update_timestamp; Type: TRIGGER; Schema: public; Owner: sms_appserver
--

CREATE TRIGGER update_timestamp BEFORE UPDATE ON public.course_schedules FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- TOC entry 3067 (class 2620 OID 51306)
-- Name: courses update_timestamp; Type: TRIGGER; Schema: public; Owner: sms_appserver
--

CREATE TRIGGER update_timestamp BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- TOC entry 3068 (class 2620 OID 51307)
-- Name: departments update_timestamp; Type: TRIGGER; Schema: public; Owner: sms_appserver
--

CREATE TRIGGER update_timestamp BEFORE UPDATE ON public.departments FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- TOC entry 3069 (class 2620 OID 51308)
-- Name: enrollments update_timestamp; Type: TRIGGER; Schema: public; Owner: sms_appserver
--

CREATE TRIGGER update_timestamp BEFORE UPDATE ON public.enrollments FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- TOC entry 3070 (class 2620 OID 51309)
-- Name: grades update_timestamp; Type: TRIGGER; Schema: public; Owner: sms_appserver
--

CREATE TRIGGER update_timestamp BEFORE UPDATE ON public.grades FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- TOC entry 3071 (class 2620 OID 51310)
-- Name: guardians update_timestamp; Type: TRIGGER; Schema: public; Owner: sms_appserver
--

CREATE TRIGGER update_timestamp BEFORE UPDATE ON public.guardians FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- TOC entry 3072 (class 2620 OID 51311)
-- Name: management_accounts update_timestamp; Type: TRIGGER; Schema: public; Owner: sms_appserver
--

CREATE TRIGGER update_timestamp BEFORE UPDATE ON public.management_accounts FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- TOC entry 3073 (class 2620 OID 51312)
-- Name: professors update_timestamp; Type: TRIGGER; Schema: public; Owner: sms_appserver
--

CREATE TRIGGER update_timestamp BEFORE UPDATE ON public.professors FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- TOC entry 3074 (class 2620 OID 51314)
-- Name: schedules update_timestamp; Type: TRIGGER; Schema: public; Owner: sms_appserver
--

CREATE TRIGGER update_timestamp BEFORE UPDATE ON public.schedules FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- TOC entry 3076 (class 2620 OID 51315)
-- Name: students update_timestamp; Type: TRIGGER; Schema: public; Owner: sms_appserver
--

CREATE TRIGGER update_timestamp BEFORE UPDATE ON public.students FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- TOC entry 3077 (class 2620 OID 51316)
-- Name: subjects update_timestamp; Type: TRIGGER; Schema: public; Owner: sms_appserver
--

CREATE TRIGGER update_timestamp BEFORE UPDATE ON public.subjects FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- TOC entry 3055 (class 2606 OID 51322)
-- Name: enrollments fk_academic_term_id; Type: FK CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT fk_academic_term_id FOREIGN KEY (academic_term_id) REFERENCES public.academic_terms(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3050 (class 2606 OID 51327)
-- Name: course_schedules fk_academic_term_id; Type: FK CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.course_schedules
    ADD CONSTRAINT fk_academic_term_id FOREIGN KEY (academic_term_id) REFERENCES public.academic_terms(id);


--
-- TOC entry 3051 (class 2606 OID 51337)
-- Name: course_schedules fk_course_id; Type: FK CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.course_schedules
    ADD CONSTRAINT fk_course_id FOREIGN KEY (course_id) REFERENCES public.courses(id);


--
-- TOC entry 3052 (class 2606 OID 51342)
-- Name: course_schedules_contents fk_course_schedule_id; Type: FK CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.course_schedules_contents
    ADD CONSTRAINT fk_course_schedule_id FOREIGN KEY (course_schedule_id) REFERENCES public.course_schedules(id);


--
-- TOC entry 3056 (class 2606 OID 51347)
-- Name: enrollments fk_course_schedule_id; Type: FK CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT fk_course_schedule_id FOREIGN KEY (course_schedule_id) REFERENCES public.course_schedules(id) NOT VALID;


--
-- TOC entry 3061 (class 2606 OID 51352)
-- Name: professors fk_department_id; Type: FK CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.professors
    ADD CONSTRAINT fk_department_id FOREIGN KEY (department_id) REFERENCES public.departments(id) NOT VALID;


--
-- TOC entry 3054 (class 2606 OID 51357)
-- Name: courses fk_department_id; Type: FK CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT fk_department_id FOREIGN KEY (department_id) REFERENCES public.departments(id) NOT VALID;


--
-- TOC entry 3058 (class 2606 OID 51367)
-- Name: grades fk_enrollments_id; Type: FK CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.grades
    ADD CONSTRAINT fk_enrollments_id FOREIGN KEY (enrollment_id) REFERENCES public.enrollments(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3062 (class 2606 OID 51372)
-- Name: schedules fk_professor_id; Type: FK CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT fk_professor_id FOREIGN KEY (professor_id) REFERENCES public.professors(id);


--
-- TOC entry 3053 (class 2606 OID 51382)
-- Name: course_schedules_contents fk_schedule_id; Type: FK CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.course_schedules_contents
    ADD CONSTRAINT fk_schedule_id FOREIGN KEY (schedule_id) REFERENCES public.schedules(id);


--
-- TOC entry 3057 (class 2606 OID 51387)
-- Name: enrollments fk_student_id; Type: FK CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.enrollments
    ADD CONSTRAINT fk_student_id FOREIGN KEY (student_id) REFERENCES public.students(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3060 (class 2606 OID 51402)
-- Name: guardians fk_student_id; Type: FK CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.guardians
    ADD CONSTRAINT fk_student_id FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3063 (class 2606 OID 51407)
-- Name: schedules fk_subject_id; Type: FK CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT fk_subject_id FOREIGN KEY (subject_id) REFERENCES public.subjects(id);


--
-- TOC entry 3059 (class 2606 OID 51412)
-- Name: grades fk_subjects_id; Type: FK CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.grades
    ADD CONSTRAINT fk_subjects_id FOREIGN KEY (subject_id) REFERENCES public.subjects(id) NOT VALID;


-- Completed on 2022-07-30 14:13:27

--
-- PostgreSQL database dump complete
--

--
-- Database "studentmanagementsystem_auth" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

-- Started on 2022-07-30 14:13:27

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

--
-- TOC entry 3036 (class 1262 OID 51007)
-- Name: studentmanagementsystem_auth; Type: DATABASE; Schema: -; Owner: sms_appserver
--

CREATE DATABASE studentmanagementsystem_auth WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';


ALTER DATABASE studentmanagementsystem_auth OWNER TO sms_appserver;

\connect studentmanagementsystem_auth

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

--
-- TOC entry 2 (class 3079 OID 51008)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 3037 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- TOC entry 215 (class 1255 OID 51019)
-- Name: update_timestamp(); Type: FUNCTION; Schema: public; Owner: sms_appserver
--

CREATE FUNCTION public.update_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	IF NOT 'updated_at' = ANY(SELECT jsonb_object_keys(to_jsonb(NEW))) THEN
		RAISE EXCEPTION '`updated_at` column does not exist in table %', TG_TABLE_NAME;
	END IF;
	
	NEW.updated_at := now();
	RETURN NEW;
END
$$;


ALTER FUNCTION public.update_timestamp() OWNER TO sms_appserver;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 201 (class 1259 OID 51020)
-- Name: faculties; Type: TABLE; Schema: public; Owner: sms_appserver
--

CREATE TABLE public.faculties (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    first_name character varying(60) NOT NULL,
    middle_name character varying(60),
    last_name character varying(60) NOT NULL,
    address character varying(100),
    phone_number character varying(20),
    username character varying(50) NOT NULL,
    password character varying(60) NOT NULL,
    privilege integer NOT NULL,
    is_deactivated boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.faculties OWNER TO sms_appserver;

--
-- TOC entry 202 (class 1259 OID 51027)
-- Name: sessions; Type: TABLE; Schema: public; Owner: sms_appserver
--

CREATE TABLE public.sessions (
    session_token character varying(128) NOT NULL,
    ip_address inet NOT NULL,
    user_agent text,
    type character varying(20) NOT NULL,
    id uuid NOT NULL,
    is_revoked boolean DEFAULT false NOT NULL,
    expiration_date timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.sessions OWNER TO sms_appserver;

--
-- TOC entry 203 (class 1259 OID 51035)
-- Name: students_credentials; Type: TABLE; Schema: public; Owner: sms_appserver
--

CREATE TABLE public.students_credentials (
    student_id uuid NOT NULL,
    username character varying(50) NOT NULL,
    password text NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.students_credentials OWNER TO sms_appserver;

--
-- TOC entry 204 (class 1259 OID 51042)
-- Name: system_components_clients; Type: TABLE; Schema: public; Owner: sms_appserver
--

CREATE TABLE public.system_components_clients (
    api_key character varying(30) NOT NULL,
    client_name character varying(60) NOT NULL,
    component integer NOT NULL,
    is_revoked boolean DEFAULT false NOT NULL
);


ALTER TABLE public.system_components_clients OWNER TO sms_appserver;

--
-- TOC entry 2895 (class 2606 OID 51047)
-- Name: system_components_clients component_clients_pkey; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.system_components_clients
    ADD CONSTRAINT component_clients_pkey PRIMARY KEY (api_key);


--
-- TOC entry 2884 (class 2606 OID 51049)
-- Name: faculties faculties_pkey; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.faculties
    ADD CONSTRAINT faculties_pkey PRIMARY KEY (id);


--
-- TOC entry 2888 (class 2606 OID 51051)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (session_token);


--
-- TOC entry 2891 (class 2606 OID 51053)
-- Name: students_credentials u_students_pkey; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.students_credentials
    ADD CONSTRAINT u_students_pkey PRIMARY KEY (student_id);


--
-- TOC entry 2898 (class 2606 OID 51055)
-- Name: system_components_clients unique_component_client_name; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.system_components_clients
    ADD CONSTRAINT unique_component_client_name UNIQUE (client_name);


--
-- TOC entry 2893 (class 2606 OID 51057)
-- Name: students_credentials unique_student_username; Type: CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE ONLY public.students_credentials
    ADD CONSTRAINT unique_student_username UNIQUE (username);


--
-- TOC entry 2878 (class 2606 OID 51058)
-- Name: faculties valid_update_date; Type: CHECK CONSTRAINT; Schema: public; Owner: sms_appserver
--

ALTER TABLE public.faculties
    ADD CONSTRAINT valid_update_date CHECK ((updated_at >= created_at)) NOT VALID;


--
-- TOC entry 2885 (class 1259 OID 51059)
-- Name: faculty_index; Type: INDEX; Schema: public; Owner: sms_appserver
--

CREATE INDEX faculty_index ON public.faculties USING btree (id);


--
-- TOC entry 2886 (class 1259 OID 51060)
-- Name: sessions_index; Type: INDEX; Schema: public; Owner: sms_appserver
--

CREATE INDEX sessions_index ON public.sessions USING btree (session_token);


--
-- TOC entry 2889 (class 1259 OID 51061)
-- Name: student_credentials_index; Type: INDEX; Schema: public; Owner: sms_appserver
--

CREATE INDEX student_credentials_index ON public.students_credentials USING btree (student_id);


--
-- TOC entry 2896 (class 1259 OID 51062)
-- Name: system_component_index; Type: INDEX; Schema: public; Owner: sms_appserver
--

CREATE INDEX system_component_index ON public.system_components_clients USING btree (api_key);


--
-- TOC entry 2899 (class 2620 OID 51063)
-- Name: faculties update_timestamp; Type: TRIGGER; Schema: public; Owner: sms_appserver
--

CREATE TRIGGER update_timestamp BEFORE UPDATE ON public.faculties FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- TOC entry 2900 (class 2620 OID 51064)
-- Name: students_credentials update_timestamp; Type: TRIGGER; Schema: public; Owner: sms_appserver
--

CREATE TRIGGER update_timestamp BEFORE UPDATE ON public.students_credentials FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


-- Completed on 2022-07-30 14:13:27

--
-- PostgreSQL database dump complete
--

-- Completed on 2022-07-30 14:13:27

--
-- PostgreSQL database cluster dump complete
--

