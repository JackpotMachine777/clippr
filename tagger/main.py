from flask import Flask, request, jsonify
from rules import detect_tag

app = Flask(__name__)

@app.route("/tag", methods=["POST"])

def tag():
    content = request.json.get("content", "")
    return jsonify({"tag": detect_tag(content)})

if __name__ == "__main__":
    app.run(port=5000)