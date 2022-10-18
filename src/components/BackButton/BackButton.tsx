import { useRouter } from "next/router";
import { isBrowser } from "util/index";
import { Button } from "./style";

interface BackButtonProps {
  href?: string;
}

const BackButton = ({ href }: BackButtonProps) => {
  const router = useRouter();

  const navigate = () => {
    if (href) {
      return router.push(href);
    }

    isBrowser && window.history.length ? router.back() : router.push("/");
  };

  return <Button onClick={navigate}>← Back</Button>;
};

export default BackButton;
