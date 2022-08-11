import { useEffect, useState } from "react"

export default function Home() {

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/images?page=${page}`)
    .then(res => res.json())
    .then(data => {
      setLoading(false);
      setData(data);
    })
  }, [page]);

  const loadMore = () => {
    setPage(page+1)
  }

  if(isLoading) {
    return (
      <p>loading</p>
    )
  } else {
    return (
      <div>
        {data && data.length > 0 &&
          <div>
            {data.map((item, i) => {
              return (<p>{item.id}</p>)
            })}
          </div>
        }

        <button onClick={loadMore}>load more</button>
      </div>
    )
  }
}
