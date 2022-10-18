import Link from "next/link";
import { useRouter } from "next/router";
import AddButton from "../AddButton/AddButton";
import { Nav, StyledLink } from "./style";

interface AppNavigationProps {
  addButtonRoute?: string;
}

const AppNavigation = ({ addButtonRoute }: AppNavigationProps) => {
  const router = useRouter();

  const shouldNotRender =
    router.pathname === "/profile" || router.pathname === "/progress";

  return (
    <Nav>
      {addButtonRoute && (
        <Link href={addButtonRoute}>
          <StyledLink shouldNotRender={shouldNotRender}>
            <AddButton />
          </StyledLink>
        </Link>
      )}
    </Nav>
  );
};

export default AppNavigation;
