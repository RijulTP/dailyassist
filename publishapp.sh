#!/bin/bash

# Source directory for the app
source_dir="/home/rtp/Projects/dailyassist/android/app/release"

# Destination directory
dest_dir="/home/rtp/Projects/LifeNavigatorApp"

# Source and destination filenames
source_file="app-release.apk"
dest_file="LifeNavigator.apk"

# Check if source file exists
if [ ! -f "$source_dir/$source_file" ]; then
  echo "Error: Source file '$source_dir/$source_file' does not exist."
  exit 1
fi

# Check if destination directory exists
if [ ! -d "$dest_dir" ]; then
  echo "Error: Destination directory '$dest_dir' does not exist."
  exit 1
fi

# Copy and rename the file
cp -v "$source_dir/$source_file" "$dest_dir/$dest_file"

echo "File transferred and renamed successfully!"
