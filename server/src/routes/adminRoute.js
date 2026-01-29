import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return res.status(500).json({ error: 'Server misconfiguration: Admin credentials not set' });
    }

    if (email === adminEmail && password === adminPassword) {
      const token = jwt.sign(
        { email: adminEmail, role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '1d' } // Token valid for 1 day
      );

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: {
            email: adminEmail,
            role: 'admin'
        }
      });
    } else {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
