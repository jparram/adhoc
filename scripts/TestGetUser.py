import unittest
import requests

class TestGetUser(unittest.TestCase):
    BASE_URL = "http://localhost:3000/users"
    HEADERS = {'Content-Type': 'application/json'}

    def test_get_user(self):
        user_id = "auth0|666b2c666e64bad84644896e"  # Replace with an actual user ID
        response = requests.get(f"{self.BASE_URL}/{user_id}", headers=self.HEADERS)
        print(response.json())  # Output the response data
        self.assertEqual(response.status_code, 200)
        user_data = response.json()
        self.assertEqual(user_data['email'], 'testemail+test@gmail.com')

if __name__ == '__main__':
    unittest.main()