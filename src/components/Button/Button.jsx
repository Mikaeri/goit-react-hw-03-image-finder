import { LoadMore } from './ButtonStyles';

export const Button = ({ onClick }) => {
  return (
    <LoadMore type="button" onClick={onClick}>
      Load more
    </LoadMore>
  );
};
