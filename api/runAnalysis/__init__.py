import azure.functions as func
import json
from shared.models import get_claim, update_claim_analysis
from shared.ai import analyze
from shared.scraper import extract

def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        data = req.get_json()
        submission_id = data.get('submission_id')
        if not submission_id:
            return func.HttpResponse(
                json.dumps({'error': 'submission_id is required'}),
                status_code=400,
                mimetype='application/json'
            )

        claim = get_claim(submission_id)
        if not claim:
            return func.HttpResponse(
                json.dumps({'error': 'Claim not found'}),
                status_code=404,
                mimetype='application/json'
            )

        content = claim['claim_text']
        if claim['claim_type'] == 'URL':
            try:
                content = extract(content)
            except Exception:
                content = claim['claim_text']

        result = analyze(content)
        update_claim_analysis(
            submission_id,
            result.get('research', ''),
            result.get('summary', ''),
            result.get('score', 0)
        )

        return func.HttpResponse(
            json.dumps({
                'analysis_id': submission_id,
                'submission_id': submission_id,
                'label': result.get('label'),
                'score': result.get('score'),
                'summary': result.get('summary'),
                'research': result.get('research')
            }),
            mimetype='application/json'
        )
    except Exception as e:
        return func.HttpResponse(
            json.dumps({'error': str(e)}),
            status_code=500,
            mimetype='application/json'
        )