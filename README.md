# IEIS.IO Complete GitHub + Supabase Edition

Production URL: https://ieltswithieis-design.github.io/q/

1. `SUPABASE_SCHEMA.sql` has to be run in Supabase SQL Editor.
2. Supabase Authentication > URL Configuration:
   Site URL = https://ieltswithieis-design.github.io/q/
   Redirect URL = https://ieltswithieis-design.github.io/q/
3. Upload the CONTENTS of this folder to the GitHub repository behind `/q/`.
4. GitHub Pages hosts the static frontend; Supabase handles Auth/Postgres.
5. No `server.js` is required.
6. Staff: create/confirm an account, then run:
   update public.profiles set role='staff' where email='YOUR-STAFF-EMAIL';
7. Exactly 1,000 passages are included in `passages.js`.
8. The supplied IEIS logo is preserved as `assets/ieis-logo.png`.
9. Never expose an `sb_secret_...` key. The included key is the browser-safe publishable key.
10. Writing is stored for human assessment; the site does not pretend an automated estimate is an official IELTS Writing score.
