import Image from "next/image";
import { toggleNav } from "src/redux/slices/app";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux";
import { ImageWrapper, StyledAvatar } from "./style";

const Avatar = () => {
  const user = useAppSelector((state) => state.app.user);
  const dispatch = useAppDispatch();

  return (
    <a onClick={() => dispatch(toggleNav())}>
      {user.image ? (
        <ImageWrapper>
          {user.image && (
            <Image
              alt={user.name}
              src={user.image ?? ""}
              width={40}
              height={40}
              layout="fixed"
            />
          )}
        </ImageWrapper>
      ) : (
        <StyledAvatar>{user.name.charAt(0).toLocaleUpperCase()}</StyledAvatar>
      )}
    </a>
  );
};

export default Avatar;
