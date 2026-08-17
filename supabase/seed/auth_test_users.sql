-- Seed utenti di prova per auth V2 (solo ambienti di test).
-- Eseguire una tantum via Supabase SQL Editor o MCP development.
-- Password documentata in AUTH_TEST.md.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
DECLARE
  v_password text := 'DemoV2!Test2026';
  v_user_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'studente.demo@example.com') THEN
    v_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, confirmation_token, recovery_token,
      email_change_token_new, email_change, email_change_token_current,
      raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at, is_sso_user, is_anonymous
    ) VALUES (
      '00000000-0000-0000-0000-000000000000', v_user_id, 'authenticated', 'authenticated',
      'studente.demo@example.com', crypt(v_password, gen_salt('bf')),
      now(), '', '', '', '', '',
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"full_name":"Marco Rossi"}'::jsonb,
      now(), now(), false, false
    );
    INSERT INTO auth.identities (
      id, user_id, identity_data, provider, provider_id,
      last_sign_in_at, created_at, updated_at
    ) VALUES (
      gen_random_uuid(), v_user_id,
      jsonb_build_object('sub', v_user_id::text, 'email', 'studente.demo@example.com', 'email_verified', true),
      'email', 'studente.demo@example.com', now(), now(), now()
    );
    INSERT INTO public.user_roles (user_id, role) VALUES (v_user_id, 'student');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'tutor.demo@example.com') THEN
    v_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, confirmation_token, recovery_token,
      email_change_token_new, email_change, email_change_token_current,
      raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at, is_sso_user, is_anonymous
    ) VALUES (
      '00000000-0000-0000-0000-000000000000', v_user_id, 'authenticated', 'authenticated',
      'tutor.demo@example.com', crypt(v_password, gen_salt('bf')),
      now(), '', '', '', '', '',
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"full_name":"Ivan Gaeta"}'::jsonb,
      now(), now(), false, false
    );
    INSERT INTO auth.identities (
      id, user_id, identity_data, provider, provider_id,
      last_sign_in_at, created_at, updated_at
    ) VALUES (
      gen_random_uuid(), v_user_id,
      jsonb_build_object('sub', v_user_id::text, 'email', 'tutor.demo@example.com', 'email_verified', true),
      'email', 'tutor.demo@example.com', now(), now(), now()
    );
    INSERT INTO public.user_roles (user_id, role) VALUES (v_user_id, 'tutor');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'promoter.demo@example.com') THEN
    v_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, confirmation_token, recovery_token,
      email_change_token_new, email_change, email_change_token_current,
      raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at, is_sso_user, is_anonymous
    ) VALUES (
      '00000000-0000-0000-0000-000000000000', v_user_id, 'authenticated', 'authenticated',
      'promoter.demo@example.com', crypt(v_password, gen_salt('bf')),
      now(), '', '', '', '', '',
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"full_name":"Promoter Demo"}'::jsonb,
      now(), now(), false, false
    );
    INSERT INTO auth.identities (
      id, user_id, identity_data, provider, provider_id,
      last_sign_in_at, created_at, updated_at
    ) VALUES (
      gen_random_uuid(), v_user_id,
      jsonb_build_object('sub', v_user_id::text, 'email', 'promoter.demo@example.com', 'email_verified', true),
      'email', 'promoter.demo@example.com', now(), now(), now()
    );
    INSERT INTO public.user_roles (user_id, role) VALUES (v_user_id, 'promoter');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'multi.demo@example.com') THEN
    v_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, confirmation_token, recovery_token,
      email_change_token_new, email_change, email_change_token_current,
      raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at, is_sso_user, is_anonymous
    ) VALUES (
      '00000000-0000-0000-0000-000000000000', v_user_id, 'authenticated', 'authenticated',
      'multi.demo@example.com', crypt(v_password, gen_salt('bf')),
      now(), '', '', '', '', '',
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"full_name":"Multi Ruolo"}'::jsonb,
      now(), now(), false, false
    );
    INSERT INTO auth.identities (
      id, user_id, identity_data, provider, provider_id,
      last_sign_in_at, created_at, updated_at
    ) VALUES (
      gen_random_uuid(), v_user_id,
      jsonb_build_object('sub', v_user_id::text, 'email', 'multi.demo@example.com', 'email_verified', true),
      'email', 'multi.demo@example.com', now(), now(), now()
    );
    INSERT INTO public.user_roles (user_id, role) VALUES
      (v_user_id, 'tutor'),
      (v_user_id, 'promoter');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'pending.demo@example.com') THEN
    v_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, confirmation_token, recovery_token,
      email_change_token_new, email_change, email_change_token_current,
      raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at, is_sso_user, is_anonymous
    ) VALUES (
      '00000000-0000-0000-0000-000000000000', v_user_id, 'authenticated', 'authenticated',
      'pending.demo@example.com', crypt(v_password, gen_salt('bf')),
      now(), '', '', '', '', '',
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"full_name":"Utente In Attesa"}'::jsonb,
      now(), now(), false, false
    );
    INSERT INTO auth.identities (
      id, user_id, identity_data, provider, provider_id,
      last_sign_in_at, created_at, updated_at
    ) VALUES (
      gen_random_uuid(), v_user_id,
      jsonb_build_object('sub', v_user_id::text, 'email', 'pending.demo@example.com', 'email_verified', true),
      'email', 'pending.demo@example.com', now(), now(), now()
    );
  END IF;
END $$;
