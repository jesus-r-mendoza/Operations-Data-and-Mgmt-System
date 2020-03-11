from rest_framework import status
from rest_framework.response import Response

SAT_PERM_DEN = Response( { 'data': False, 'error': 'Permission Denied. Satellite does not belong to your organization' }, status=status.HTTP_403_FORBIDDEN )
SAT_NOT_OF_ORG = Response( { 'data': False, 'error': 'Satellite does not belong to an organization' }, status=status.HTTP_400_BAD_REQUEST )
SAT_DNE = Response( { 'data': False, 'error': 'Satellite Does Not Exist' }, status=status.HTTP_400_BAD_REQUEST )
SAT_HAS_NO_COMPS = Response( { 'data': False, 'error': 'Satellite has no components' }, status=status.HTTP_204_NO_CONTENT )
DATE_RANGE_INVALID = Response( { 'data': False, 'error': 'Must specify both [from] and [to] date-times' }, status=status.HTTP_400_BAD_REQUEST )
COMP_DNE_OR_PERM_DEN = Response( { 'data': False, 'error': 'Component Does Not Exist or does not belong to this Satellite' }, status=status.HTTP_400_BAD_REQUEST )
COMPS_DNE = Response( { 'data': False, 'error': 'Component(s) Does not exist' }, status=status.HTTP_400_BAD_REQUEST )
QUANT_LESS_THAN_1 = Response( { 'data': False, 'error': 'Must request at least 1 recent measurement' }, status=status.HTTP_400_BAD_REQUEST )
NO_DATA_WITHIN_PARAMS = Response( { 'data': False, 'error': 'Satellite has no measurements fitting those parameters' }, status=status.HTTP_204_NO_CONTENT )

MISSING_CREDENTIALS = Response( { 'data': False, 'error': 'Details not provided: Must provide username, password, and email; code (optional)' }, status=status.HTTP_400_BAD_REQUEST )
USERNAME_EXISTS = Response( { 'data': False, 'error': 'User with this username already exists' }, status=status.HTTP_403_FORBIDDEN )
INVITE_CODE_INVALID = Response( { 'data': False, 'error': 'Invitation code is invalid' }, status=status.HTTP_403_FORBIDDEN )
MISSING_INVITE_CODE = Response( { 'data': False, 'error': 'Invitation code not provided' }, status=status.HTTP_403_FORBIDDEN )
ORG_NAME_REQUIRED = Response( { 'data': False, 'error': 'Must provide organization name' }, status=status.HTTP_400_BAD_REQUEST )
PASSWORD_INVALID = Response( { 'data': False, 'error': 'Password not provided or incorrect' }, status=status.HTTP_401_UNAUTHORIZED )
ORG_NAME_EXISTS = Response( { 'data': False, 'error': 'Organization with this name already exists' }, status=status.HTTP_403_FORBIDDEN )
USR_AND_PASS_REQUIRED = Response( { 'data': False, 'error': 'Must provide both username and password' }, status=status.HTTP_400_BAD_REQUEST )
USR_OR_PASS_INVALID = Response( { 'data': False, 'error': 'Username and / or password are not correct' }, status=status.HTTP_401_UNAUTHORIZED )
ALREADY_IN_ORG = Response( { 'data': False, 'error': 'User is already in an organization. Currently only permitted to join a single organization' }, status=status.HTTP_403_FORBIDDEN )

DEP_INVALID = Response( { 'data': False, 'error': 'You are not authorized to use this endpoint.' }, status=status.HTTP_401_UNAUTHORIZED )
METHOD_INVALID = Response( { 'data': False, 'error': 'Method type not allowed.' }, status=status.HTTP_400_BAD_REQUEST )

USR_NOT_IN_ORG = Response( { 'data': False, 'error': "You are not in an organization yet, so you do not have access to any Satellites" }, status=status.HTTP_204_NO_CONTENT )
ORG_HAS_NO_SATS = Response( { 'data': False, 'error': 'Get to work! Your organization does not have any satellites' }, status=status.HTTP_204_NO_CONTENT )
INVALID_FILE_FORMAT = Response( { 'data': False, 'error': 'The file you are trying to use is not if the correct format to insert to your record' }, status=status.HTTP_400_BAD_REQUEST )