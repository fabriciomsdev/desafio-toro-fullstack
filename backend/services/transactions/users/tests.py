from django.test import TestCase
from django.test import Client
from users.models import UserModel
import json

USER_DATA = {
    'name': 'fabricios ms',
    'password': 'F88114527',
    'email': 'fabriciosena70@gmail.com'
}


class UsersActionsTestCase(TestCase):

    def setUp(self):
        pass

    def register_user_request(self):
        return (Client()).post('/auth/users/create', USER_DATA)

    def login_user_request(self):
        user_default = UserModel.objects.filter(email=USER_DATA['email'])[0]
        user_default.is_active = True
        user_default.save()

        return (Client()).post('/auth/jwt/create', USER_DATA)

    def verify_response_return(self, response, expected_status):
        if response.status_code is not expected_status:
            print(response.content)

        self.assertEqual(response.status_code, expected_status)

    def test_if_user_can_register(self):
        """ In this test, user do will try register in system """

        response = self.register_user_request()

        self.verify_response_return(response, 201)

    def test_if_user_can_make_log_in(self):
        """ Test if user can login in system """
        self.register_user_request()

        response = self.login_user_request()

        self.verify_response_return(response, 200)

    def test_if_user_can_update(self):
        """Test if user can update your profile"""
        self.register_user_request()
        login_token = self.login_user_request().content.access

        data = {
            'name': 'Boulevard Napoleão de Magalhães'
        }

        client = Client()

        response = client.post('api/users', data, **{
            'Authorization': 'Bearer ' + str(login_token)
        })

        self.verify_response_return(response, 200)

        self.assertEqual(response.content, {
            'name': 'Boulevard Napoleão de Magalhães',
            'phone': '5577988114527',
            'email': 'fabriciosss@gmail.com'
        })

        print(response.content)
