use reqwest::Client;


pub async fn tag(content: &str) -> String {
    let client = Client::new();
    let res = client.post("http://127.0.0.1:5000/tag")
        .json(&serde_json::json!({"content": content}))
        .send()
        .await
        .unwrap()
        .json::<serde_json::Value>()
        .await
        .unwrap();

    res["tag"].as_str().unwrap_or("text").to_string()
}