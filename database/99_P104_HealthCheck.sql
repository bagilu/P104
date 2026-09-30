-- P104 WhisperTour — Health Check baseline
-- Web Version V0.001 / SBI-P-SDS v3.2
--
-- V0.001 has no P104 PostgreSQL tables/views/RPCs. This query verifies that
-- no project-scoped relational objects are expected at this baseline.
-- LiveKit token Edge Function health is checked separately at its HTTP endpoint.

select
  'P104' as project_code,
  'V0.001' as web_version,
  'NO_DATABASE_OBJECTS_EXPECTED' as database_baseline;
