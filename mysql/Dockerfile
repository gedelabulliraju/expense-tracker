FROM mysql:8.0

# Copy initialization SQL to container (runs once at container start)
COPY setup.sql /docker-entrypoint-initdb.d/

# Expose default MySQL port
EXPOSE 3306
