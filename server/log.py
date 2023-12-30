#!/usr/bin/env python
import cgi
import json
import fcntl
import os
from datetime import datetime

# Path to the log file
log_file_path = os.path.join(os.path.dirname(__file__), 'app_log.txt')

def create_log_file():
    if not os.path.exists(log_file_path):
        with open(log_file_path, 'w') as log_file:
            pass  # Create an empty file

    os.chmod(log_file_path, 0o644)

def append_to_log(log_data):
    with open(log_file_path, 'a') as log_file:
        fcntl.flock(log_file.fileno(), fcntl.LOCK_EX)
        try:
            log_file.write(json.dumps(log_data) + '\n')
        finally:
            fcntl.flock(log_file.fileno(), fcntl.LOCK_UN)

def main():
    print("Content-type: text/html\n")

    create_log_file()

    form = cgi.FieldStorage()
    log_data_json = form.getvalue('logData')

    if log_data_json:
        try:
            log_data = json.loads(log_data_json)
            log_data['date'] = datetime.utcnow().isoformat()
            append_to_log(log_data)

            print("Log data successfully appended.")
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}")
    else:
        print("No log data provided.")




main()
