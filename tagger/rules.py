import json
import re

def is_url(text: str) -> bool:
    return text.startswith("http://") or text.startswith("https://")

def is_json(text: str) -> bool:
    try:
        json.loads(text) 
        return True
    except json.JSONDecodeError:
        return False

def is_sql(text: str) -> bool:
    keywords = ["SELECT", "INSERT", "UPDATE", "DELETE", "CREATE"]
    return any(kw in text.upper() for kw in keywords)

def is_email(text: str) -> bool:
    pattern = r"^[\w\.-]+@[\w\.-]+\.\w{2,}$"
    return bool(re.match(pattern, text))

def is_code(text: str) -> bool:
    indicators = ["{", "}", "=>", "fn ", "def ", "import ", "const ", "let ", "function ", "fun "]
    return any(i in text for i in indicators)

def detect_tag(text: str) -> str:
    if is_url(text): return "url"
    if is_email(text): return "email"
    if is_json(text): return "json"
    if is_code(text): return "code"
    if is_sql(text): return "sql"
    return "text"