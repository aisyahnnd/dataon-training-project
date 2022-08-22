import { Button, Result } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const MissingPage = () => {
  const { t } = useTranslation(["content"]);
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/");
  };

  return (
    <Result
      style={{
        backgroundColor: "#fff",
        height: "55vw",
        paddingTop: 100,
      }}
      status="404"
      title="404"
      subTitle={t("missingPage")}
      extra={
        <Button type="primary" onClick={onClick}>
          {t("missingPageBtn")}
        </Button>
      }
    />
  );
};

export default MissingPage;
