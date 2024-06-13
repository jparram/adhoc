import unittest
import requests
import json

class TestAddRole(unittest.TestCase):
    BASE_URL = "http://localhost:3000/roles"
    HEADERS = {'Content-Type': 'application/json'}

    def test_add_role(self):
        payload = {
            "name": "TestRole",
            "description": "This is a test role"
        }

        response = requests.post(self.BASE_URL, headers=self.HEADERS, data=json.dumps(payload))
        print(response.json())  # Output the response data for debugging
        self.assertEqual(response.status_code, 201)
        self.assertIn('id', response.json())
        self.assertEqual(response.json()['name'], 'TestRole')

if __name__ == '__main__':
    unittest.main()
