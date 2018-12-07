import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #ffffff;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  border-color: #0000ff;
  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 64px;
    }
    strong {
      font-size: 24px;
      margin-top: 10px;
    }
    small {
      font-size: 14px;
      color: #666;
    }
  }

  label {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    margin: -10px;

    button {
      margin: 5px;
      background: #ffffff;
      border-radius: 50%;
      border: 0;
      padding: 2px 5px;

      &:hover {
        cursor: pointer;
      }
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 10px 20px;
      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n-1) {
        background: #f5f5f5;
      }
    }
  }
`;
