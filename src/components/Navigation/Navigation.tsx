import ScreenTitle from "components/ScreenTitle/ScreenTitle";
import Link from "next/link";
import { AiOutlineLineChart, AiOutlineUser } from "react-icons/ai";
import { BiDumbbell } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "src/redux/hooks/redux";
import { toggleNav } from "src/redux/slices/app";
import { useTheme } from "styled-components";
import { Nav, SlideOutNav, List, ListItem } from "./style";

const Navigation = () => {
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const { navOpen } = useAppSelector((state) => state.app);
  const { user } = useAppSelector((state) => state.app);

  const navItems = [
    {
      name: "EXERCISES",
      icon: <BiDumbbell color={theme.colors.blue} />,
      link: "/exercises",
    },
    {
      name: "PROGRESS",
      icon: <AiOutlineLineChart color={theme.colors.blue} />,
      link: "/progress",
    },
    {
      name: "PROFILE",
      icon: <AiOutlineUser color={theme.colors.blue} />,
      link: "/profile",
    },
  ];

  return (
    <SlideOutNav navOpen={navOpen}>
      <ScreenTitle title={`Hi, ${user.name}`} />
      <Nav>
        <List>
          {navItems.map((item) => (
            <ListItem key={item.name} onClick={() => dispatch(toggleNav())}>
              {item.icon}
              <Link href={item.link}>
                <a>{item.name}</a>
              </Link>
            </ListItem>
          ))}
        </List>
      </Nav>
    </SlideOutNav>
  );
};

export default Navigation;
