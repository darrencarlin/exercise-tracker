import Link from "next/link";
import { AiOutlineLineChart } from "react-icons/ai";
import { StyledAvatar } from "./style";

interface ProgressIconProps {
  href?: string;
}

const ProgressIcon = ({ href }: ProgressIconProps) => {
  return (
    <Link href={href ? href : "/progress"}>
      <StyledAvatar>
        <AiOutlineLineChart />
      </StyledAvatar>
    </Link>
  );
};

export default ProgressIcon;
