#!/usr/bin/env python3
import cgi
import json
import fcntl
import os
import sys

from datetime import datetime
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

def count_unique_user_ids(log_lines):
    unique_user_ids = set()

    for entry in log_lines:
        user_id = entry.get('userId', '')
        if user_id:
            unique_user_ids.add(user_id)

    total_unique_users = len(unique_user_ids)
    # print(f"Total unique userIds: {total_unique_users}")
    return total_unique_users


#
# count totals by site
#
def count_log_entries_by_short_code(log_lines):
    short_code_counts = defaultdict(int)
    
    for line in log_lines:
        log_message = line.get('log', '')
        # Extracting the short code from the log message
        short_code = log_message.split('[')[-1].split(']')[0]
        
        # cleanup the data from any test cases:
        if short_code == 'yet another log message':
          continue
        
        short_code_counts[short_code] += 1

    return short_code_counts

#
# when did errors LAST occur?
#
def find_last_log_dates(log_lines):
    log_levels_dates = {
        'WARN': None,
        'ERROR': None,
        'FATAL': None
    }
    
    for line in log_lines:
        log_message = line.get('log', '')
        log_date = line.get('date')
        
        for level in log_levels_dates.keys():
            if f'[{level}]' in log_message:
                if log_levels_dates[level] is None or log_date > log_levels_dates[level]:
                    log_levels_dates[level] = log_date

    return log_levels_dates

#
#
#
def generate_site_monitors(log_lines):
    site_monitors = {}

    for line in log_lines:
        log_message = line.get('log', '')
        log_date = line.get('date')
        
        # Extract short code from log message
        short_code = log_message.split('[')[-1].split(']')[0]

        # Check if log message indicates an error
        if '[ERROR]' in log_message or '[WARN]' in log_message or '[FATAL]' in log_message:
            # Remove square brackets and spaces from log event type
            event_type = log_message.split('[')[-2].strip('[] ').upper()

            # Update site_monitors with the most recent log event type, message, and date
            if short_code not in site_monitors or (site_monitors[short_code]['date'] is None or log_date > site_monitors[short_code]['date']):
                site_monitors[short_code] = {'event_type': event_type, 'message': log_message, 'date': log_date}

    return site_monitors







#
#
#
def count_log_levels(log_lines):
    log_levels_count = {
        'WARN': 0,
        'INFO': 0,
        'ERROR': 0,
        'FATAL': 0,
        'DEBUG': 0,
        'TRACE': 0
    }
    #print (log)
    for line in log_lines:
        log_message = line.get('log', '')
        for level in log_levels_count.keys():
            if f'[{level}]' in log_message:
                log_levels_count[level] += 1

    # print (log_levels_count)
    return log_levels_count


def environment_summary(log_entries):
    device_counts = {}
    os_counts = {}
    browser_counts = {}

    for entry in log_entries:
        environment = entry.get('environment', {})
        device = environment.get('device', '')
        os = environment.get('os', '')
        browser = environment.get('browser', '')

        if device:
            device_counts[device] = device_counts.get(device, 0) + 1
        if os:
            os_counts[os] = os_counts.get(os, 0) + 1
        if browser:
            browser_counts[browser] = browser_counts.get(browser, 0) + 1

    # print("Device Summary:")
    # print(device_counts)

    # print("\nOS Summary:")
    # print(os_counts)

    # print("\nBrowser Summary:")
    # print(browser_counts)

    return device_counts, os_counts, browser_counts

def count_entries_per_date(log_entries):
    date_counts = defaultdict(int)

    today = datetime.utcnow()

    for entry in log_entries:
        try:
            date_str = entry.get('date', '')
            if date_str:
                # Use %Y-%m-%d to extract only the date portion
                entry_date = datetime.strptime(date_str[:10], '%Y-%m-%d')
                days_ago = (today - entry_date).days

                # Count entries only if within the last 365 days
                if 0 <= days_ago < 365:
                    date_key = entry_date.strftime('%Y-%m-%d')
                    date_counts[date_key] += 1
        except Exception as e:
            print(f"Error processing entry: {entry}. Error: {e}")

    # print("Entries per Date Summary:")
    # print(date_counts)

    return date_counts

#
#
#
def fetch_stats():
    # fetch data and server stats and return in JSON
    
    # DONE - uniques via phone
    # DONE - uniques via tablet
    # DONE - uniques via Desktop
    # DONE - users per day
    
    # python details
    # print ('sending stats')
    python_version = get_python_version()
    # print (python_version)
    
    if os.path.exists(log_file_path):
        # DONE - data size
        file_size = os.path.getsize(log_file_path)
        # print (file_size)
        # Count total entries in the JSON log file
        # DONE - # of all entries
        with open(log_file_path, 'r') as log_file:
            try:
                log_entries = [json.loads(line) for line in log_file.readlines() if line.strip()]
                total_entries = len(log_entries)
                # print (total_entries)
                log_levels_count = count_log_levels(log_entries)
                last_errors = find_last_log_dates(log_entries)
                unique_user_count = count_unique_user_ids(log_entries)
                environment_summaries = environment_summary(log_entries)
                date_counts = count_entries_per_date(log_entries)
                short_code_counts = count_log_entries_by_short_code(log_entries)
                # print(log_levels_count)
            except json.JSONDecodeError:
                # Handle JSON decoding error (invalid JSON format)
                print ("ERROR decoding log file")
                total_entries = 0
    else:
        file_size = 0
        total_entries = 0
        log_levels_count = {}

    # Combine error dates with site total counts into site_monitors
    site_monitors = generate_site_monitors(log_entries)

    stats_data = {
        'python_version': python_version,
        'error_dates': last_errors,
        'site_total_counts': short_code_counts,
        'site_monitors': site_monitors,
        'log_file_size': file_size,
        'log_total_entries': total_entries,
        'log_levels_count': log_levels_count,
        'unique_visitors': unique_user_count,
        'environment_summary': environment_summaries,
        'date_counts': date_counts
    }
    # print (stats_data)
    print (json.dumps(stats_data))

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
