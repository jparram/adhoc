import unittest
import requests
import json

class TestAddUser(unittest.TestCase):
    BASE_URL = "http://localhost:3000/users"
    HEADERS = {'Content-Type': 'application/json'}

    def test_add_user(self):
        payload = {
            "profile": {
                "firstName": "John",
                "lastName": "Doe",
                "email": "john.doe@example.com",
                "login": "john.doe@example.com"
            },
            "credentials": {
                "password": {
                    "value": "TempPassword123!"
                }
            }
        }

        response = requests.post(self.BASE_URL, headers=self.HEADERS, data=json.dumps(payload))
        self.assertEqual(response.status_code, 201)
        self.assertIn('message', response.json())
        self.assertEqual(response.json()['message'], 'User added successfully')

    # def test_add_user_missing_fields(self):
    #     payload = {
    #         "profile": {
    #             "firstName": "John"
    #         }
    #     }

    #     response = requests.post(self.BASE_URL, headers=self.HEADERS, data=json.dumps(payload))
    #     self.assertNotEqual(response.status_code, 201)
    #     self.assertIn('error', response.json())

    # def test_add_user_invalid_email(self):
    #     payload = {
    #         "profile": {
    #             "firstName": "John",
    #             "lastName": "Doe",
    #             "email": "invalid-email",
    #             "login": "invalid-email"
    #         },
    #         "credentials": {
    #             "password": {
    #                 "value": "TempPassword123!"
    #             }
    #         }
    #     }

    #     response = requests.post(self.BASE_URL, headers=self.HEADERS, data=json.dumps(payload))
    #     self.assertNotEqual(response.status_code, 201)
    #     self.assertIn('error', response.json())

if __name__ == '__main__':
    unittest.main()
