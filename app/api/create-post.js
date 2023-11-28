// pages/api/create-post.ts

import { createPost as createPostServer } from '@lib/actions/post.actions';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { text, userId } = req.body;

    try {
      const result = await createPostServer({ text, userId, createdAt: new Date() });
      res.status(result.status).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
