#!/bin/bash

# Fetch environment variables
username=$DB_USER
password=$DB_PASSWORD

# Execute the MySQL command
mysqldump -u "$username" -p"$password" DailyAssist > da_backend/Materials/DailyAssist.sql


