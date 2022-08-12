import { useEffect, useState } from "react"
import styled from "styled-components"
import Image from "next/image"
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import LoadMoreButton from "../components/LoadMoreButton"
import ImageContainer from "../components/ImageContainer"

const ImageListing = styled.div`
  padding: 0 10px;
  max-width: 1080px;
  margin: 0 auto;
`

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  max-width: 1080px;
  margin: 0 auto;

  h1 {
    font-size: 18px;
    margin-left: 10px;
  }
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`

const HeaderRight = styled.div`

`

export default function Home() {

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('blue');
  const [query, setQuery] = useState(searchQuery);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (page === 1) ? setLoading(true) : setLoadingMore(true)
    fetch(`/api/images?page=${page}&query=${query}`)
    .then(res => res.json())
    .then(data => {
      if (page === 1) {
        setLoading(false)
        setData(data)
      } else {
        setLoadingMore(false)
        setData((existingData) => [...existingData, ...data])
      }
    })
  }, [page, query]);

  const loadMore = () => {
    setPage(page+1)
  }

  const handleSearch = () => {
    setPage(1)
    setQuery(searchQuery)
  }

  const onInputChange = (evt) => {
    setSearchQuery(evt.target.value)
  }

  if(isLoading) {
    return (
      <p>loading...</p>
    )
  } else {
    return (
      <div>
        <Header>
          <HeaderLeft>
            <Image src="/upgrowth.svg" alt="Upgrowth" width={120} height={40}/>
            <h1>Dev Challange</h1>
          </HeaderLeft>
          <HeaderRight>
            <input
              type="text"
              value={searchQuery}
              onChange={onInputChange}
            />
            <button
              onClick={handleSearch}
            >
              Search
            </button>
          </HeaderRight>
        </Header>
        {data && data.length > 0 &&
          <ImageListing>
            <ResponsiveMasonry
              columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
            >
              <Masonry gutter="20px">
                {data.map((image, i) => {
                  return (
                    <ImageContainer
                      key={image.id}
                      alt={image.alt_description}
                      url={image.urls.small}
                      updated={image.updated_at}
                      width={image.width}
                      height={image.height}
                      user={image.user.username}
                      userimg={image.user.profile_image.small}
                    />
                  )
                })}
              </Masonry>
            </ResponsiveMasonry>
          </ImageListing>
        }

        <Footer>
          <>
          {
            isLoadingMore ? (<p>loading...</p>) : (<LoadMoreButton onClick={loadMore}/>)
          }
          </>
        </Footer>
      </div>
    )
  }
}
