from django.test import TestCase, Client
from rest_framework import status
from rest_framework.test import APIClient
from main.settings import AUTH_USER_MODEL
from django.apps import apps
import json
import abc


class GenericDRFTestResource():
    data_for_test = {}
    data_updated_for_test = {}
    url = ''
    user_model = apps.get_model(*(AUTH_USER_MODEL).split('.'))
    detail_of_item_stored = {}

    def setUp(self):
        self.client = APIClient()
        self.create_an_user()
        self.auth_user = self.user_model.objects.first()

    def build_url(self, params=None, pk=None):
        url = self.url
        if params:
            url.format(params)

        if pk:
            url += str(pk) + '/'

        return url

    def create_an_user(self, is_staff=False):
        pass

    def create_an_item(self):
        response = self.client.post(self.build_url(), self.data_for_test)
        self.detail_of_item_stored = json.loads(response.content)
        return self

    def do_login(self):
        self.admin = self.user_model(
            username='testuser@gmail.com',
            email='testuser@gmail.com',
            password='password',
            is_active=True)
        self.admin.save()

        self.client.force_authenticate(user=self.admin)
        self.client.login(email=self.admin.username, password='password')

        print(self.client.login(
            email=self.admin.username, password='password'))

        return self


class TestResourceRouteExist(GenericDRFTestResource):
    def tests_if_route_exists(self):
            response = self.client.get(self.build_url())
            self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestUserNotLoggedCanNotPost(GenericDRFTestResource):
    def tests_if_user_not_logged_can_not_publish(self):
        """
            If user wasn't make login he cann't publish a post
        """
        response = self.client.post(self.build_url(), self.data_for_test)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class TestUserLoggedCanPost(GenericDRFTestResource):
    def tests_if_user_logged_can_publish(self):
            self.do_login()

            response = self.client.post(self.build_url(), self.data_for_test)
            self.detail_of_item_stored = response.content

            self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TestUserLoggedCanUpdate(GenericDRFTestResource):
    def tests_if_user_logged_can_update(self):
        self.do_login() \
            .create_an_item()

        url = self.build_url(pk=self.detail_of_item_stored.get('id'))
        response = self.client.put(url, self.data_updated_for_test)

        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestUserLoggedCanDelete(GenericDRFTestResource):
    def tests_if_user_logged_can_delete(self):
        self.do_login() \
            .create_an_item()

        url = self.build_url(pk=self.detail_of_item_stored.get('id'))
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
