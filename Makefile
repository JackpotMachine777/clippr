dev:
	npm run tauri dev

build:
	npm run tauri build

rust:
	cd src-tauri && cargo build

py:
	tagger/venv/bin/python tagger/main.py

setup:
	npm install
	cd tagger && python -m venv venv && venv/bin/pip install -r requirements.txt

clean:
	rm -rf src-tauri/target