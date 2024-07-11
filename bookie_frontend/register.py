import requests
import json

# Define the URL of Flask backend API
API_URL = 'http://127.0.0.1:5000'

def register_user(username, email, password, confirmPassword):
    """
    Function to register a user via the backend API.
    
    Args:
    - username (str): The username of the user.
    - email (str): The email address of the user.
    - password (str): The password chosen by the user.
    - confirmPassword (str): Confirmation of the password.
    
    Returns:
    - bool: True if registration successful, False otherwise.
    """
    endpoint = f'{API_URL}/register'
    data = {
        'username': username,
        'email': email,
        'password': password,
        'confirmPassword': confirmPassword
    }
    headers = {
        'Content-Type': 'application/json'
    }

    try:
        # Send POST request to the backend API
        response = requests.post(endpoint, data=json.dumps(data), headers=headers)
        response.raise_for_status()  # Raise HTTPError for bad responses (4xx or 5xx)

        # Handle the response data
        response_data = response.json()

        if response.status_code == 200:
            print('Registration successful:', response_data)
            return True
        else:
            print('Registration failed:', response_data['error'])
            return False

    except requests.exceptions.RequestException as e:
        print('Error registering user:', e)
        return False
    except requests.exceptions.HTTPError as e:
        print('HTTP error occurred:', e)
        return False
    except ValueError as e:
        print('Response parsing error:', e)
        return False

# Example usage of register_user function
if __name__ == '__main__':
    username = 'testuser'
    email = 'testuser@example.com'
    password = 'TestPassword123!'
    confirmPassword = 'TestPassword123!'

    if register_user(username, email, password, confirmPassword):
        print('Registration successful!')  # Display success message
        # Handle further UI updates or navigation here
    else:
        print('Registration failed. Please try again.')  # Handle error message/display here