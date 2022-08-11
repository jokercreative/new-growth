import styled from "styled-components"
import Image from 'next/image'

const ImageWrapper = styled.div`
  position: relative;
`
const ImageCaption = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
  padding: 10px;
`

const ProfileImage = styled.div`
  border-radius: 50%;
  overflow: hidden;
  font-size: 0;
  margin-right: 10px;
`

const ProfileName = styled.div`
  font-weight: bold;
  font-size: 14px;
`

export default function ImageContainer(props) {
  return (
    <ImageWrapper>
      <Image
        src={props.url}
        alt={props.alt}
        {...props}
      />
      <ImageCaption>
        <ProfileImage>
          <Image
            src={props.userimg}
            alt={props.user}
            width={32}
            height={32}
            />
        </ProfileImage>
        <ProfileName>{props.user}</ProfileName>
      </ImageCaption>
    </ImageWrapper>
  )
}
