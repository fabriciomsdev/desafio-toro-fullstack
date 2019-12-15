from django.test import TestCase
from main.tests import (
    TestResourceRouteExist,
    TestUserNotLoggedCanNotPost,
    TestUserLoggedCanPost,
    TestUserLoggedCanUpdate,
    TestUserLoggedCanDelete,
    TestCase)

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
        'order_type': 'bought'
    }
    data_updated_for_test = {
        'quantity': 100,
        'sigla': 'PETR4',
        'order_type': 'sell'
    }
    url = '/api/orders/'


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
