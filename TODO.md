## TODO: Add Demo Account for Published Site

### Plan Breakdown:
1. ✅ **Create seed script** backend/scripts/seedDemoUser.js - Idempotent demo user creation (demo@example.com / demo123)
2. **Create backend/scripts dir** (auto via create_file)
3. **Update README.md** - Add demo login instructions + seed run/deploy notes
4. **Update auth-modal.tsx** - Add subtle demo hint in UI
5. **Test locally** - Run seed, backend, frontend, verify login
6. **Vercel notes** - Deploy backend separately or as serverless, seed via CLI/env
7. **Complete** - attempt_completion

Current step: 5/7 - Files updated (seed script, README, auth-modal). Test: cd backend && node scripts/seedDemoUser.js (needs .env MONGO_URI), npm run dev; pnpm run dev frontend, login demo.
