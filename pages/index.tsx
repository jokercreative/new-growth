import { useEffect, useState } from "react"
import LoadMoreButton from '../components/LoadMoreButton'
import ImageContainer from '../components/ImageContainer'
import styled from "styled-components"

const ImageListing = styled.div`
  display: flex;
`

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`

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
          <ImageListing>
            {data.map((image, i) => {
              return (
                <ImageContainer
                  key={image.id}
                  altDescription={image.alt_description}
                  imageUrl={image.urls.small}
                  width={image.width}
                  height={image.height}
                  user={image.user.username}
                  userProfileImg={image.user.profile_image.small}
                />
              )
            })}
          </ImageListing>
        }

        <Footer>
          <LoadMoreButton onClick={loadMore} />
        </Footer>
      </div>
    )
  }
}
