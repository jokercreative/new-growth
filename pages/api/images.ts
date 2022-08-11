export default async function handler(req, res) {
  const query = req.query;
  const { page } = query;
  const resData = await fetch(`https://api.unsplash.com/photos/?client_id=${process.env.API_KEY}&page=${page}`)
    .then(response => response.json());

  res.status(200).json(resData);
}