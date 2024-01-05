#!/usr/bin/env python3
import cgi
import json
import fcntl
import os
from datetime import datetime
import sys
from collections import defaultdict
from datetime import datetime, timedelta

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
    
    # reverse log entries and limit to 100 items
    log_entries = log_entries[::-1]
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
    # print(f"fetching:items{fetch_param}:")
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
    elif fetch_param == 'stats':
        fetch_stats();
    else:
        # Display paginated log entries by default
        total_entries = len(log_entries)
        page_number = 1
        start_index = (page_number - 1) * entries_per_page
        end_index = start_index + entries_per_page
        paginated_entries = log_entries[start_index:end_index]
        print (json.dumps(paginated_entries))


#
#
#
def fetch_stats():
    # fetch data and server stats and return in JSON
    # TODO - data size
    # TODO - # of all entries
    # TODO - # of error entries
    # TODO - # of WARN entries
    # TODO - # of INFO entries
    # TODO - # of (other) entires
    # TODO - uniques via phone
    # TODO - uniques via tablet
    # TODO - uniques via Desktop
    # TODO - users per day
    print ('sending stats')


#
#
#
def append_warn_log(log_data):
    # Create a log entry for the WARN message
    warn_log_entry = {
        "date": datetime.utcnow().isoformat(),
        "environment": log_data.get('environment', {}),
        "userId": log_data.get('userId', ''),
        "log": "[WARN] [SERVER] Possible DoS - Logs on hold",
        "serverDate": datetime.utcnow().isoformat()
    }

    # Append the WARN log entry to the log file
    append_to_log(warn_log_entry)

def check_last_entries(log_entries):
    # Filter entries with "app started" message
    app_started_entries = [entry for entry in log_entries if 'app started' in entry.get('log', '').lower()]
    warning_entries = [entry for entry in log_entries if 'warn' in entry.get('log', '').lower()]
    warning_entries = warning_entries[::-1]
    ok_to_log = True

    with open('debug_log.txt', 'a') as debug_log:
        debug_log.write(f"count of app_started_entries: {len(app_started_entries)}\n")

    dos_items = 10 # set the warning threshold for potential DoS attack within dos_minutes
    dos_minutes = 2 # set # of minutes to monitor apps starting for potential DoS attacks
    consecutive_count = 0
    user_id = None

    for entry in app_started_entries:
        entry_date = datetime.strptime(entry.get('date', ''), '%Y-%m-%dT%H:%M:%S.%fZ')
        current_date = datetime.utcnow()
        time_difference = current_date - entry_date

        if time_difference <= timedelta(minutes=dos_minutes):
            if entry.get('userId') == user_id:
                consecutive_count += 1
            else:
                user_id = entry.get('userId')
                consecutive_count = 1  # Reset count for a new userId
        else:
            consecutive_count = 0  # Reset count if log message is not within the last 60 minutes


    if consecutive_count >= dos_items:
        print(f"Last 10 log entries indicate 'app started' consecutively with the same userId ({user_id}).")
        with open('debug_log.txt', 'a') as debug_log:
            debug_log.write(f"WARNING app started in last 10 entries... {datetime.utcnow().isoformat()}\n")
            
            # TODO get last log entry
            # TODO if it's a DoS warning entry, exit, otherwise enter a DoS warning entry
            if warning_entries and warning_entries[0].get('userId') == user_id:
                with open('debug_log.txt', 'a') as debug_log:
                    debug_log.write(f"DoS warning already exists for this user. Skipping append_warn_log.... {datetime.utcnow().isoformat()}\n")
                ok_to_log = False
            else:
                with open('debug_log.txt', 'a') as debug_log:
                    debug_log.write(f"appending to log:  DoS WARN.... {datetime.utcnow().isoformat()}\n")
                append_warn_log(entry)
                ok_to_log = False
        
    else:
        print("Less than 10 consecutive log entries with 'app started.'")
        with open('debug_log.txt', 'a') as debug_log:
            debug_log.write(f"less than 10 app started entries... {datetime.utcnow().isoformat()}\n")
            debug_log.write(f"less than 10 app started entries... count: {consecutive_count}\n")
    return ok_to_log




def main():
    print("Access-Control-Allow-Origin: *");
    print("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    print("Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization");
    #print("Content-type: text/html\n")
    
    create_log_file()
    form = cgi.FieldStorage()
    action = form.getvalue('action')
    fetch = form.getvalue('fetch')
  
    if action == 'view':
        print("Content-type: text/html\n")
        print("Python Version:")
        print(get_python_version())
        view_log()
    if action == 'fetch':
        print("Content-type: application/json\n")
        fetch_log(fetch)
        #print(f"<br>fetching log:items:{fetch}:")
    else:
        print("Content-type: text/html\n")
        print("thanks for stopping by<br>")
        log_data_json = form.getvalue('logData')
        if log_data_json:
            print('<br>got it<br>')
            log_data = json.loads(log_data_json)
            if log_data:
                log_data['serverDate'] = datetime.utcnow().isoformat()
                
                
                # Check last 10 log entries before appending new entry
                # with open(log_file_path, 'r') as log_file:
                #     log_entries = json.load(log_file)
                with open(log_file_path, 'r') as log_file:
                    log_entries = [json.loads(line) for line in log_file.readlines() if line.strip()]
                ok_to_log = check_last_entries(log_entries)

                if ok_to_log:
                    with open('debug_log.txt', 'a') as debug_log:
                        debug_log.write(f"appending... {datetime.utcnow().isoformat()}\n")

                    print("appending...")
                    
                    append_to_log(log_data);
            else:
                print("error decoding json");
                # append_to_log('error decoding json');
        else:
            print("No log data provided.")
            # append_to_log('no log data provided.');




main()
