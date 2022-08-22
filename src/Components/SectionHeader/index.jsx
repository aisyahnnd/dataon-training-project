import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Dropdown, Menu, Row } from "antd";
import { useTranslation } from "react-i18next";
import {
  useNavigate,
  Link,
  useLocation,
  useParams,
} from "react-router-dom";

const SectionHeader = ({ viewButton }) => {
  const { t } = useTranslation(["common", "dashboard"]);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  let user = JSON.parse(localStorage.getItem("user-info"));

  //breadcumb
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const breadcrumbNameMaps = {
    "/": t("dashboard:dashboard"),
    "/training": t("dashboard:breadcrumb.training"),
    ["/training/" + params.id]: t(
      "dashboard:breadcrumb.trainingEvent"
    ),
    "/training/create": t("dashboard:breadcrumb.trainingCreate"),
    ["/mytraining/" + params.id]: t(
      "dashboard:breadcrumb.mytrainingDetail"
    ),
    "/mytraining/edit": t("dashboard:breadcrumb.mytrainingEdit"),
    ["/mytraining/edit/" + params.id]: t(
      "dashboard:breadcrumb.mytrainingEditDetail"
    ),
    "/mytraining": t("dashboard:breadcrumb.mytraining"),
  };

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        {breadcrumbNameMaps[url]}
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [
    <Breadcrumb.Item key={"/"}>
      <Link to="/">{t("dashboard:dashboard")}</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleCreate = () => {
    navigate("/training/create");
  };

  const menuLogout = (
    <Menu
      onClick={handleLogout}
      items={[
        {
          label: `${t("common:logout")}`,
          key: "1",
        },
      ]}
    />
  );

  const menuLogin = (
    <Menu
      onClick={handleLogin}
      items={[
        {
          label: `${t("common:login")}`,
          key: "1",
        },
      ]}
    />
  );

  return (
    <div className="site-card-wrapper">
      <Row>
        <Col
          span={12}
          style={{
            textAlign: "left",
            paddingTop: 5,
            paddingLeft: 5,
          }}
        >
          <Breadcrumb separator=">">{breadcrumbItems}</Breadcrumb>
        </Col>
        <Col
          span={12}
          style={{
            textAlign: "right",
            padding: 0,
          }}
        >
          {viewButton && (
            <>
              {user.role === "admin" ? (
                <Button
                  onClick={handleCreate}
                  type="primary"
                  htmlType="submit"
                  style={{ borderRadius: 5, fontWeight: "bold" }}
                >
                  <PlusOutlined /> {t("dashboard:buttonCreate")}
                </Button>
              ) : null}
              <Dropdown.Button
                type="dashed"
                style={{
                  borderRadius: 5,
                  fontWeight: "bold",
                  marginLeft: 10,
                  marginRight: 20,
                }}
                overlay={
                  localStorage.getItem("user-info")
                    ? menuLogout
                    : menuLogin
                }
                trigger={["click"]}
                icon={<MoreOutlined />}
              >
                {user
                  ? `${t("common:greeting")}, ${user.username}`
                  : "More"}
              </Dropdown.Button>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SectionHeader;
