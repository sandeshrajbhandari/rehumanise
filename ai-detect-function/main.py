import functions_framework
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

# Initialize tokenizer and model once
print("Container started: Initializing model and tokenizer...")
tokenizer = AutoTokenizer.from_pretrained("openai-community/roberta-base-openai-detector")
model = AutoModelForSequenceClassification.from_pretrained("openai-community/roberta-base-openai-detector")
print("Model and tokenizer loaded.")

def detect_ai_text(text):
    # Debugging: Log input text size
    print(f"Processing text of length: {len(text)}")

    # Tokenize input
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True)
    print(f"Tokenized input: {inputs}")

    # Make prediction
    with torch.no_grad():
        outputs = model(**inputs)
        print(f"Model outputs: {outputs}")

    # Calculate scores
    scores = outputs.logits.softmax(dim=1)
    ai_score = scores[0][1].item()
    human_score = scores[0][0].item()
    
    # Debugging: Log score results
    print(f"Scores - AI: {ai_score}, Human: {human_score}")
    
    return {
        "AI Score": ai_score,
        "Human Score": human_score,
        "Predicted Label": "AI" if ai_score > human_score else "Human"
    }

@functions_framework.http
def detect_ai_function(request):
    """HTTP Cloud Function to detect if text is AI-generated or human-written."""
    
    request_json = request.get_json(silent=True)
    if not request_json or 'text' not in request_json:
        print("Error: 'text' missing from request body.")
        return "Error: 'text' is required in the request body.", 400

    text = request_json['text']
    
    # Call detection function
    result = detect_ai_text(text)
    
    # Debugging: Log final result
    print(f"Detection result: {result}")
    
    return result
