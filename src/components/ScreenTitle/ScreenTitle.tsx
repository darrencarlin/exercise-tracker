import { Title } from "./style";

interface ScreenTitleProps {
  title: string;
}

const ScreenTitle = ({ title }: ScreenTitleProps) => <Title>{title}</Title>;

export default ScreenTitle;
