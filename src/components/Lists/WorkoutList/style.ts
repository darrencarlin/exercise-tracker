import styled from "styled-components";

export const List = styled.ul`
  border-top: 1px solid ${({ theme }) => theme.colors.borderGray};
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  padding: 10px 20px 5px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderGray};
  transition: transform 0.6s ease-in-out;
  p {
    padding: 0 0 5px 0;
  }

  :active {
    transform: scale(1.01);
  }
`;

export const WorkoutDate = styled.p`
  display: flex;
  align-items: center;
  font-weight: 400;
  svg {
    margin: 0 5px 0 0;
  }
`;

export const Sets = styled.p`
  display: flex;
  align-items: center;
  svg {
    margin: 0 5px 0 0;
  }
`;

export const MaxWeight = styled.p`
  display: flex;
  align-items: center;
  svg {
    margin: 0 5px 0 0;
  }
`;
