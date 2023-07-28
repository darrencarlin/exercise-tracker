import styled from "styled-components";
import Text from "../../Text/Text";

export const List = styled.ul`
  list-style: none;
  border-top: 1px solid ${({ theme }) => theme.colors.borderGray};

  /* If the below ever breaks, go to developer.apple.com/library/archive/documentation/… and search for "Safari on iOS only" */

  @supports (-webkit-touch-callout: none) {
    // padding-bottom: 80px;
  }
`;

export const ListTitle = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderGray};
  height: 50px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.blue};
  p {
    padding: 0;
  }
`;

export const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderGray};
  height: 50px;
  transition: transform 0.6s ease-in-out;
  p {
    padding: 0;
  }

  :active {
    transform: scale(1.01);
  }
`;

export const ListItemNoAction = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.25rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderGray};
  height: 50px;
  p {
    padding: 0;
  }
`;

export const StyledText = styled(Text)`
  text-align: center;
  padding: 50px;
`;
