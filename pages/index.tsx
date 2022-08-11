import { useEffect, useState } from "react"
import styled from "styled-components"
import Image from "next/image"
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import LoadMoreButton from "../components/LoadMoreButton"
import ImageContainer from "../components/ImageContainer"

const ImageListing = styled.div`
  padding: 0 10px;
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
  justify-content: flex-start;
  padding: 20px;

  h1 {
    font-size: 18px;
    margin-left: 10px;
  }
`

export default function Home() {

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (page === 1) ? setLoading(true) : setLoadingMore(true)
    fetch(`/api/images?page=${page}`)
    .then(res => res.json())
    .then(data => {
      (page === 1) ? setLoading(false) : setLoadingMore(false)
      setData((existingData) => [...existingData, ...data]);
    })
  }, [page]);

  const loadMore = () => {
    setPage(page+1)
  }

  if(isLoading) {
    return (
      <p>loading...</p>
    )
  } else {
    return (
      <div>
        <Header>
          <Image src="/upgrowth.svg" alt="Upgrowth" width={120} height={40}/>
          <h1>Dev Challange</h1>
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
