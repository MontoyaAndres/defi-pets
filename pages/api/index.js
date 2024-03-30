export default function handler(req, res) {
  const { token, address } = req.query;

  res.status(200).json({ token, address });
}
