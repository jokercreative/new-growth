import styled from "styled-components"

const ButtonBase = styled.button`
  border: 2px solid #000;
  background: #fff;
  border-radius: 3px;
  text-decoration: none;
  padding: 10px 20px;
  transition: background 250ms ease-out;
  cursor: pointer;

  &:hover {
    background: #f1f1f1;
  }
`

export default function LoadMoreButton(props) {
  return (
    <ButtonBase {...props}>Load More Photos</ButtonBase>
  )
}
