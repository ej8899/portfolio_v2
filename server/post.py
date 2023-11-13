#!/usr/bin/env python3
import cgi
import cgitb
import json
import uuid

cgitb.enable()  # enable detailed error messages

database_file = "blog_database.json"

def generate_uid():
    return str(uuid.uuid4())

def authenticate(username, password):
    # Hardcoded username and password for simplicity
    hardcoded_username = "admin"
    hardcoded_password = "password123"

    return username == hardcoded_username and password == hardcoded_password

#
# FETCH: return ALL data in JSON
#
def fetch_data():
    global database_file
    try:
        # Load existing data from the database
        with open(database_file, 'r') as f:
            data = json.load(f)
        return data
    except FileNotFoundError:
        return {}

#
# SAVE: new post data
#
def save_to_database(blog_post):
    global database_file

    try:
        # Load existing data from the database
        with open(database_file, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        # If the file doesn't exist, create an empty dictionary
        data = {}

    # Add the new blog post data
    post_id = generate_uid()
    data[post_id] = {
        'title': blog_post['title'],
        'date': blog_post['date'],
        'keywords': blog_post['keywords'],
        'article': blog_post['article']
    }

    # Save the updated data back to the database
    with open(database_file, 'w') as f:
        json.dump(data, f, indent=2)



#
# MAIN application routing
#
def main():
    # Get form data
    form = cgi.FieldStorage()

    action = form.getvalue('action')

    if action == 'fetch':
        # Fetch routine
        data = fetch_data()
        print("Access-Control-Allow-Origin: *");
        print("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        print("Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization");
        #print();
        print("Content-type: application/json\n")
        print(json.dumps(data, indent=2))
    else:
        # SAVE data:
        # Perform authentication
        # Extract data from the form
        title = form.getvalue('title')
        date = form.getvalue('date')
        keywords = form.getvalue('keywords').split(',')
        article = form.getvalue('article')
        username = form.getvalue('username')
        password = form.getvalue('password')

        if authenticate(username, password):
            # Create a dictionary with blog post data
            blog_post_data = {
                'title': title,
                'date': date,
                'keywords': keywords,
                'article': article
            }

            # Save the data to the flatfile text database
            save_to_database(blog_post_data)

            # Print a success message
            print("Content-type: text/html\n")
            print(f'<html><body><h2>Blog post {title} saved successfully!</h2></body></html>')
        else:
            # Print an authentication error message
            print("Content-type: text/html\n")
            print("<html><body><h2>Authentication failed. Please check your username and password.</h2></body></html>")

# Run the main function
# if __name__ == "__main__":



main()