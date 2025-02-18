import express from 'express';
const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
  res.send('<h1>hello from /api/users/signup</h1>');
});

export { router as currentUserRouter };
