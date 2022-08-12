// add API_KEY into .env file
export default async function handler(req, res) {
  const searchQuery = req.query;
  const { page, query } = searchQuery;
  const resData = await fetch(`https://api.unsplash.com/search/photos/?client_id=${process.env.API_KEY}&page=${page}&query=${query}`)
    .then(response => response.json());

  res.status(200).json(resData.results);
}