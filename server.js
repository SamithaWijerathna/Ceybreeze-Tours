// server.js
import express from 'express';
import admin from 'firebase-admin';
import cors from 'cors';
import serviceAccount from './serviceAccountKey.json' assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

// Chat endpoint
app.post('/chat', async (req, res) => {
  const { query } = req.body;

  try {
    const allData = [];

    // Get all collections and their documents
    const collections = await db.listCollections();
    for (const col of collections) {
      const snapshot = await col.get();
      snapshot.forEach(doc => allData.push({ collection: col.id, ...doc.data() }));
    }

    // Keyword search in all fields
    const lowerQuery = query.toLowerCase();
    const matches = allData.filter(d => 
      Object.values(d).some(v => typeof v === 'string' && v.toLowerCase().includes(lowerQuery))
    );

    if (matches.length > 0) {
      let responseText = '';
      matches.slice(0, 5).forEach(d => {
        responseText += `<b>Collection:</b> ${d.collection}<br>`;
        Object.entries(d).forEach(([key, value]) => {
          if (key !== 'collection') responseText += `<b>${key}:</b> ${value}<br>`;
        });
        responseText += '<hr>';
      });
      res.json({ answer: responseText });
    } else {
      res.json({ answer: "I couldn't find any matching data in Firestore." });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ answer: '❌ Error accessing Firestore.' });
  }
});

app.listen(3000, () => console.log('✅ Server running on http://localhost:3000'));
