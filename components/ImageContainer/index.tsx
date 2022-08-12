import styled from "styled-components"
import Image from 'next/image'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'

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
  justify-content: space-between;
  padding: 5px 10px;
`

const Profile = styled.div`
  display: flex;
  align-items: center;
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

const ImageDate = styled.p`
  font-size: 12px;
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
        <Profile>
          <ProfileImage>
            <Image
              src={props.userimg}
              alt={props.user}
              width={32}
              height={32}
              />
          </ProfileImage>
          <ProfileName>
            <Link href={`/user/${props.user}`}>{props.user}</Link>
          </ProfileName>
        </Profile>
        <ImageDate>{format(parseISO(props.updated), 'dd MMM yyyy')}</ImageDate>
      </ImageCaption>
    </ImageWrapper>
  )
}
