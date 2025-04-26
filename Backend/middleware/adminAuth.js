import dotenv from 'dotenv';
dotenv.config();

export default function adminAuth(req, res, next) {
  console.log(process.env.ADMIN_SECRET);
  
  const auth = req.headers.authorization;
  if (!auth || auth !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}
