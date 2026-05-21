import azure.functions as func
import json
from shared.models import register_user

def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        data = req.get_json()
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')

        if not email or not password:
            return func.HttpResponse(
                json.dumps({'error': 'Email and password are required'}),
                status_code=400,
                mimetype='application/json'
            )

        result = register_user(email, password)
        if not result['success']:
            return func.HttpResponse(
                json.dumps({'error': result['error']}),
                status_code=400,
                mimetype='application/json'
            )

        return func.HttpResponse(
            json.dumps({'user_id': result['user_id']}),
            status_code=201,
            mimetype='application/json'
        )

    except Exception as e:
        return func.HttpResponse(
            json.dumps({'error': str(e)}),
            status_code=500,
            mimetype='application/json'
        )