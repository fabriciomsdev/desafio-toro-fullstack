from django.test import TestCase
from main.tests import (
    TestResourceRouteExist,
    TestUserNotLoggedCanNotPost,
    TestUserLoggedCanPost,
    TestUserLoggedCanUpdate,
    TestUserLoggedCanDelete,
    TestCase)
from rest_framework import status
import json

class OrderRestApiTest(
        TestResourceRouteExist,
        TestUserNotLoggedCanNotPost,
        TestUserLoggedCanPost,
        TestUserLoggedCanUpdate,
        TestUserLoggedCanDelete,
        TestCase):

    data_for_test = {
        'quantity': 100,
        'sigla': 'PETR4',
        'order_type': 'bought',
        'value': 100
    }
    data_updated_for_test = {
        'quantity': 100,
        'sigla': 'PETR4',
        'order_type': 'sell',
        'value': 50
    }
    url = '/api/orders/'

    def create_a_operation_to_have_balance(self):
        response = self.client.post('/api/operations/', {
            'value': 10000,
            'operation_type': 'deposit'
        })

    def create_an_item(self):
        self.create_a_operation_to_have_balance()
        response = self.client.post(self.build_url(), self.data_for_test)

        self.detail_of_item_stored = json.loads(response.content)
        return self

    def tests_if_user_without_balance_can_buy_pappers(self):
            self.do_login()

            response = self.client.post(self.build_url(), self.data_for_test)
            self.detail_of_item_stored = response.content

            self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def tests_if_user_logged_can_publish(self):
        # test of publish an bought with suficient balance
        self.do_login()
        self.create_a_operation_to_have_balance()
        response = self.client.post(self.build_url(), self.data_for_test)
        self.detail_of_item_stored = response.content
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class OperationRestApiTest(
        TestResourceRouteExist,
        TestUserNotLoggedCanNotPost,
        TestUserLoggedCanPost,
        TestUserLoggedCanUpdate,
        TestUserLoggedCanDelete,
        TestCase):

    data_for_test = {
        'value': 100,
        'operation_type': 'deposit'
    }
    data_updated_for_test = {
        'value': 100,
        'operation_type': 'draw'
    }
    url = '/api/operations/'
