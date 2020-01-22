from rest_framework import status
from rest_framework.response import Response

SAT_PERM_DEN = Response( { 'data': False, 'error': 'Permission Denied. Satellite doesnt belong to your organization' }, status=status.HTTP_403_FORBIDDEN )
SAT_NOT_OF_ORG = Response( { 'data': False, 'error': 'Satellite doesnt belong to an organization' }, status=status.HTTP_400_BAD_REQUEST )
SAT_DNE = Response( { 'data': False, 'error': 'Satellite Does Not Exist' }, status=status.HTTP_400_BAD_REQUEST )
SAT_HAS_NO_COMPS = Response( { 'data': False, 'error': 'Satellite has no components' }, status=status.HTTP_204_NO_CONTENT )
DATE_RANGE_INVALID = Response( { 'data': False, 'error': 'Must specify both [from] and [to] date-times' }, status=status.HTTP_400_BAD_REQUEST )
COMP_DNE_OR_PERM_DEN = Response( { 'data': False, 'error': 'Component Does Not Exist or does not belong to this Satellite' }, status=status.HTTP_400_BAD_REQUEST )
COMPS_DNE = Response( { 'data': False, 'error': 'Component(s) Does not exist' }, status=status.HTTP_400_BAD_REQUEST )
QUANT_LESS_THAN_1 = Response( { 'data': False, 'error': 'Must request at least 1 recent measurement' }, status=status.HTTP_400_BAD_REQUEST )
NO_DATA_WITHIN_PARAMS = Response( { 'data': False, 'error': 'Satellite has no measurements fitting those parameters' }, status=status.HTTP_204_NO_CONTENT )

# MISSING_CREDENTIALS
# USRNAME_EXISTS
# INVITE_INVALID

# MISSING_ORG_NAME
# PASSWORD_INVALID
# ORG_NAME_EXISTS