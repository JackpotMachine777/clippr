use rusqlite::{params, Connection, Result};
use std::{sync::Mutex ,path::PathBuf};

pub struct Database{
    pub conn: Mutex<Connection>,
}

impl Database{
    pub fn new(path: PathBuf) -> Result<Self>{
        let conn = Connection::open(path)?;

        conn.execute_batch("
            CREATE TABLE IF NOT EXISTS clipboard(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content TEXT NOT NULL,
                type TEXT NOT NULL DEFAULT 'text',
                image_path TEXT,
                tag TEXT,
                pinned INTEGER NOT NULL DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            CREATE INDEX IF NOT EXISTS idx_content ON clipboard(content);
        ")?;

        Ok(Self {conn: Mutex::new(conn)})
    }

    pub fn insert(&self, content: &str) -> Result<()>{
        let conn = self.conn.lock().unwrap();

        conn.execute(
            "DELETE FROM clipboard WHERE content = ?1",
            params![content]
        )?;

        conn.execute(
            "INSERT INTO clipboard (content) VALUES (?1)",
            params![content],
        )?;

        Ok(())
    }

    pub fn get_all(&self) -> Result<Vec<(i64, String, String, bool, String, String, String)>> {
        let binding = self.conn.lock().unwrap();
        let mut stmt = binding.prepare(
            "SELECT id, content, tag, pinned, created_at, type, image_path FROM clipboard ORDER BY created_at DESC"
        )?;

        let rows = stmt.query_map([], |row| {
            Ok((
                row.get::<_, i64>(0)?,
                row.get::<_, String>(1)?,
                row.get::<_, String>(2).unwrap_or_default(),
                row.get::<_, bool>(3)?,
                row.get::<_, String>(4)?,
                row.get::<_, String>(5).unwrap_or_default(),
                row.get::<_, String>(6).unwrap_or_default(),
            ))
        })?;

        rows.collect()
    }

    pub fn delete(&self, id: i64) -> Result<()> {
        self.conn.lock().unwrap().execute(
            "DELETE FROM clipboard WHERE id = ?1", 
            params![id],
        )?;

        Ok(())
    }

    pub fn toggle_pin(&self, id: i64, pinned: bool) -> Result<()> {
        self.conn.lock().unwrap().execute(
            "UPDATE clipboard SET pinned = ?1 WHERE id = ?2",
            params![pinned, id],
        )?;

        Ok(())
    }

    pub fn update_tag(&self, id: i64, tag: &str) -> Result<()>{
        self.conn.lock().unwrap().execute(
            "UPDATE clipboard SET tag = ?1 WHERE id = ?2",
            params![tag, id],
        )?;

        Ok(())
    }

    pub fn last_insert_id(&self) -> i64 {
        self.conn.lock().unwrap().last_insert_rowid()
    }

    pub fn insert_image(&self, image_path: &str) -> Result<()>{
        let conn = self.conn.lock().unwrap();

        conn.execute(
            "INSERT INTO clipboard (content, type, image_path, tag) VALUES (?1, 'image', ?2, 'image')",
            params![image_path, image_path],
        )?;

        Ok(())
    }

    pub fn delete_all_unpinned(&self) -> Result<()> {
        self.conn.lock().unwrap().execute(
            "DELETE FROM clipboard WHERE pinned = 0",
            [],
        )?;
        
        Ok(())
    }
}