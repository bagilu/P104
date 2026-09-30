# P104 Database

P104 Web Version V0.001 does not add application database tables. The current Supabase use is limited to the P104-scoped Edge Function that issues LiveKit tokens.

Future P104 database objects must follow SBI-P-SDS v3.2 naming and isolation rules, e.g. `TblP104...`, `VwP104...`, and P104-prefixed RPC/functions. New database features should be delivered as migrations and must not modify objects belonging to other P-series projects.
