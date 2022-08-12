// add API_KEY into .env file
export default async function handler(req, res) {
  const { name } = req.query;
  const resData = await fetch(`https://api.unsplash.com/users/${name}/photos/?client_id=${process.env.API_KEY}`)
    .then(response => response.json());

  res.status(200).json(resData);
}