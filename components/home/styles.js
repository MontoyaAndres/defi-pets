import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(2, 400px);
  margin-top: 100px;
  width: 100%;

  .left {
    .emoji {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid rgba(0, 0, 0, 0.23);
      height: 500px;
      width: 100%;
      font-size: 20rem;
    }

    .buttons {
      display: flex;
      grid-gap: 8px;
      margin-top: 10px;
    }
  }

  .right {
    .box {
      border: 1px solid rgba(0, 0, 0, 0.23);
      height: 500px;
      width: 100%;
      margin-bottom: auto;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      grid-gap: 8px;
      padding: 8px 0;
    }

    .ai {
      background-color: rgba(0, 0, 0, 0.23);
      padding: 20px;
      width: 80%;
      margin: 0;
      margin-right: auto;
      margin-left: 8px;
      border-radius: 20px;
      color: white;
    }

    .user {
      background-color: #1976d2;
      padding: 20px;
      width: 80%;
      margin: 0;
      margin-left: auto;
      margin-right: 8px;
      border-radius: 20px;
      color: white;
    }

    .input {
      width: 100%;
    }
  }
`;
