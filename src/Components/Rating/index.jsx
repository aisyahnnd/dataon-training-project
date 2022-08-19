import { Rate } from "antd";

const Rating = (rating) => {
  return (
    <Rate disabled allowHalf defaultValue={0} value={rating}></Rate>
  );
};

export default Rating;
