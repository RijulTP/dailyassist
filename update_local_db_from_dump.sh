#!/bin/bash

# Fetch environment variables
username=$DB_USER
password=$DB_PASSWORD

# Execute the MySQL command
mysql -u "$username" -p"$password" Library < Library_Backend/Materials/Library.sql

