from rest_framework import status
from rest_framework.response import Response

USER_DNE = Response( { 'data': False, 'error': 'User does not exist' }, status=status.HTTP_400_BAD_REQUEST )
WRONG_USER = Response( { 'data': False, 'error': 'The user does not own this file' }, status=status.HTTP_403_FORBIDDEN )
FILE_DNE = Response( { 'data': False, 'error': 'The requested file does not exist' }, status=status.HTTP_400_BAD_REQUEST )
INCORRECT_USER = Response( { 'data': False, 'error': 'User not authorized to view this page' }, status=status.HTTP_401_UNAUTHORIZED )
MISSING_PARAMS = Response( { 'data': False, 'error': 'Must provide both: upfile and description' }, status=status.HTTP_400_BAD_REQUEST )
FILE_NOT_UPLOADED = Response( { 'data': False, 'error': 'This file exists on DB, but not on ECST server. Likely uploaded to localhost during development' }, status=status.HTTP_404_NOT_FOUND )
INVALID_TOKEN = Response( { 'data': False, 'error': 'Invalid token' }, status=status.HTTP_401_UNAUTHORIZED )