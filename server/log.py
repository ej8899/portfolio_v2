#!/usr/bin/env python3
import cgi
import json
import fcntl
import os
from datetime import datetime
import sys
from collections import defaultdict

# Path to the log file
log_file_path = 'app_log.txt'
entries_per_page = 50;

def get_python_version():
    return sys.version

def view_log():
    with open(log_file_path, 'r') as log_file:
      log_entries = [json.loads(line) for line in log_file.readlines() if line.strip()]

    if not log_entries:
        print("No log entries available.")
        return
    
    # Limit log entries to 100 rows
    log_entries = log_entries[:100]

    # Count occurrences of unique userId values
    user_id_counts = defaultdict(int)
    for entry in log_entries:
        user_id = entry.get('userId', 'unknown')
        user_id_counts[user_id] += 1
    total_unique_users = len(user_id_counts)

    log_entries.sort(key=lambda entry: entry.get('date', ''), reverse=True)

    html_output = "<html><head><title>Log Entries</title><script src=\"https://cdn.tailwindcss.com\"></script></head>"
    html_output += "<body class=\"bg-slate-600\">"

    html_output += "<header class=\"bg-white rounded-lg shadow m-8 dark:bg-gray-800\">"
    html_output += "<div class=\"w-full mx-auto p-4 md:flex md:items-center md:justify-between\">"
    html_output += "<span class=\"text-sm text-gray-500 sm:text-center dark:text-gray-400\">"
    html_output += f"<h1 class=\"text-3xl font-extrabold dark:text-white\">Log Entries ({total_unique_users} uniques)</h1></span>"
    html_output += "<ul class=\"flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0\">"
    html_output += "<li><a href=\"#\" class=\"hover:underline me-4 md:me-6\">About</a></li>"
    html_output += "<li><a href=\"#\" class=\"hover:underline me-4 md:me-6\">Privacy Policy</a></li>"
    html_output += "<li><a href=\"#\" class=\"hover:underline me-4 md:me-6\">Licensing</a></li>"
    html_output += "<li><a href=\"#\" class=\"hover:underline\">Contact</a></li>"
    html_output += "</ul></div></header>"
    
    html_output += "<div class=\"relative overflow-x-auto shadow-md sm:rounded-lg m-8\">"
    html_output += "<table class=\"w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400\">"
    html_output += "<thead class=\"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400\">"
    html_output += "<tr><th class=\"px-6 py-3\">Date</th><th class=\"px-6 py-3\">Log Message</th><th class=\"px-6 py-3\">User ID</th><th class=\"px-6 py-3\">Environment</th></tr></thead>"
    html_output += "<tbody>"
    for entry in log_entries:
        date = entry.get('date', '')
        log_message = entry.get('log', '')
        user_id = entry.get('userId', 'unknown')
        environment = entry.get('environment', {})

        environment_str = ', '.join([f"{key}: {value}" for key, value in environment.items()])
        html_output += "<tr class=\"bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600\">"
        html_output += f"<td class=\"px-6 py-4\">{date}</td><td class=\"px-6 py-4\">{log_message}</td><td class=\"px-6 py-4\">{user_id}</td><td class=\"px-6 py-4\">{environment_str}</td></tr>"

    html_output += "</tbody></table></div>"
    html_output += "<footer class=\"bg-white rounded-lg shadow m-8 dark:bg-gray-800\">"
    html_output += "<div class=\"w-full mx-auto p-4 md:flex md:items-center md:justify-between\">"
    html_output += "<span class=\"text-sm text-gray-500 sm:text-center dark:text-gray-400\">"
    html_output += "<a href=\"https://erniejohnson.ca\" class=\"hover:underline\">ErnieJohnson.ca</a>. All Rights Reserved.</span>"
    html_output += "<ul class=\"flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0\">"
    html_output += "<li><a href=\"#\" class=\"hover:underline me-4 md:me-6\">About</a></li>"
    html_output += "<li><a href=\"#\" class=\"hover:underline me-4 md:me-6\">Privacy Policy</a></li>"
    html_output += "<li><a href=\"#\" class=\"hover:underline me-4 md:me-6\">Licensing</a></li>"
    html_output += "<li><a href=\"#\" class=\"hover:underline\">Contact</a></li>"
    html_output += "</ul></div></footer>"

    html_output +="</body></html>"
    print (html_output)
    
    return

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


def fetch_log(fetch_param=all):
    print(f"fetching:items{fetch_param}:")
    with open(log_file_path, 'r') as log_file:
        log_entries = [json.loads(line) for line in log_file.readlines() if line.strip()]

    if fetch_param == 'all':
        # Return all log entries
        print (json.dumps(log_entries))
    elif fetch_param.isdigit():
        # Fetch specified number of entries starting from the provided index
        start_index = int(fetch_param)
        end_index = start_index + entries_per_page
        fetched_entries = log_entries[start_index:end_index]
        print (json.dumps(fetched_entries))
    else:
        # Display paginated log entries by default
        total_entries = len(log_entries)
        page_number = 1
        start_index = (page_number - 1) * entries_per_page
        end_index = start_index + entries_per_page
        paginated_entries = log_entries[start_index:end_index]
        print (json.dumps(paginated_entries))


def main():
    print("Access-Control-Allow-Origin: *");
    print("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    print("Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization");
    print("Content-type: text/html\n")
    print("Python Version:")
    print(get_python_version())
    
    create_log_file()
    form = cgi.FieldStorage()
    action = form.getvalue('action')
    fetch = form.getvalue('fetch')
  
    if action == 'view':
        view_log()
    if action == 'fetch':
        fetch_log(fetch)
        #print(f"<br>fetching log:items:{fetch}:")
    else:
        print("thanks for stopping by<br>")
        log_data_json = form.getvalue('logData')
        if log_data_json:
            print('<br>got it<br>')
            log_data = json.loads(log_data_json)
            if log_data:
                log_data['serverDate'] = datetime.utcnow().isoformat()
                append_to_log(log_data);
            else:
                print("error decoding json");
                # append_to_log('error decoding json');
        else:
            print("No log data provided.")
            # append_to_log('no log data provided.');




main()
