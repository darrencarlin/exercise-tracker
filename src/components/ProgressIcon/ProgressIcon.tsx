import Link from "next/link";
import { AiOutlineLineChart } from "react-icons/ai";
import { StyledAvatar } from "./style";

const ProgressIcon = () => {
  return (
    <Link href="/progress">
      <StyledAvatar>
        <AiOutlineLineChart />
      </StyledAvatar>
    </Link>
  );
};

export default ProgressIcon;
