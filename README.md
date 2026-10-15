# Libseek

## Description
A full-stack library system, that ideally could be used in a realistic environment.

## Safety

 - CORS policy - only the frontend can access the backend.
 - JWT tokens - generate time-specific tokens with an encoded long string.
 - HttpOnly cookies - store JWT tokens in cookies without allowing frontend to access.
 - Authorization - backend authorizes JWT tokens before committing actions.