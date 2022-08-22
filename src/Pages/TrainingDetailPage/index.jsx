import {
  CalendarOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Image,
  Modal,
  Row,
  Space,
  Typography,
  Card,
} from "antd";
import { useContext, useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { Avatar, ButtonIcon, SectionHeader } from "@/Components";
import { AppContext } from "@/Context/";
import { useTranslation } from "react-i18next";
import "./TrainingDetailPage.css";

const { confirm } = Modal;
const { Text, Title } = Typography;

const TrainingDetailPage = () => {
  const { t } = useTranslation(["content"]);
  const { deleteStatus, setDeleteStatus, DeleteDataMyTraining } =
    useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  let user = JSON.parse(localStorage.getItem("user-info"));

  const handleEdit = () => {
    navigate(`/mytraining/edit/${params.id}`, {
      state: location.state,
    });
  };

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    if (deleteStatus) {
      navigate("/");
      setDeleteStatus(false);
    }
  }, [deleteStatus]);

  const showDeleteConfirm = () => {
    confirm({
      title: t("deleteConfirm.title"),
      icon: <ExclamationCircleOutlined />,
      content: t("deleteConfirm.content"),
      okText: t("deleteConfirm.okText"),
      okType: "danger",
      cancelText: t("deleteConfirm.cancelText"),

      onOk() {
        return new Promise((resolve, reject) => {
          DeleteDataMyTraining(params.id);
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log("Oops errors!"));
      },

      onCancel() {},
    });
  };

  return (
    <>
      <SectionHeader></SectionHeader>
      <div className="container-grid">
        <div className="content">
          <Row>
            <Col span={24}>
              <Row>
                <Title strong level={2}>
                  {location.state.eventName}
                </Title>
              </Row>
              <Row>
                <Title strong level={4} type="secondary">
                  {t("trainingCreateEditDetail.subTitle")}
                </Title>
              </Row>
            </Col>
          </Row>
          <div className="row">
            <div className="column-1">
              <Image
                style={{
                  width: 500,
                  paddingLeft: 0,
                  marginBottom: 20,
                  marginTop: 20,
                  paddingRight: 0,
                  borderRadius: "20px",
                  height: 250,
                }}
                src={location.state.thumbnail}
              />
              <Card
                style={{
                  width: "100%",
                  borderRadius: "16px",
                  marginRight: "24px",
                  boxShadow:
                    "5px 8px 24px 5px rgba(208, 216, 243, 0.6)",
                }}
              >
                <Row>
                  <Col span={24}>
                    <ButtonIcon
                      textButton={t(
                        "trainingCreateEditDetail.button.join"
                      )}
                      style={{ borderRadius: 5, width: "100%" }}
                      type={"primary"}
                    ></ButtonIcon>
                  </Col>
                </Row>
                <Row style={{ paddingTop: 20 }}>
                  <Col span={12}>
                    <div className="joinedTeamWrapper">
                      <Text className="textJoined" strong>
                        {t("trainingCreateEditDetail.joinedTeam")}
                      </Text>
                      <Avatar
                        className="avatar"
                        src={
                          <Image
                            style={{
                              width: 32,
                              height: 32,
                            }}
                            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                          />
                        }
                      ></Avatar>
                      <Avatar
                        className="avatar"
                        src={
                          <Image
                            style={{
                              width: 32,
                              height: 32,
                            }}
                            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                          />
                        }
                      ></Avatar>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="inviteWrapper">
                      <PlusOutlined
                        style={{
                          color: "#cccccc",
                          paddingTop: "5px",
                        }}
                      ></PlusOutlined>
                      <Text
                        className="textInvite"
                        strong
                        type="secondary"
                      >
                        {t("trainingCreateEditDetail.button.invite")}
                      </Text>
                    </div>
                  </Col>
                </Row>
              </Card>
            </div>
            <div className="column-2">
              <Col span={24} className="training-detail">
                <Space
                  direction="vertical"
                  size={7}
                  style={{ display: "flex" }}
                >
                  <Text style={{ fontSize: "16px", fontWeight: 700 }}>
                    <SolutionOutlined />{" "}
                    {t("trainingCreateEditDetail.overview")}
                  </Text>
                  <Text style={{ fontSize: "14px", fontWeight: 700 }}>
                    <CalendarOutlined /> {location.state.startDate}
                    <InfoCircleOutlined
                      style={{ marginLeft: 20, marginRight: 5 }}
                    />
                    {location.state.isOnlineClass === true
                      ? t(
                          "trainingCreateEditDetail.eventType.option1"
                        )
                      : t(
                          "trainingCreateEditDetail.eventType.option2"
                        )}
                    <UserOutlined style={{ marginLeft: 20 }} /> 2 / 5
                    {t("trainingCreateEditDetail.person")}
                  </Text>
                  <Text
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                    }}
                  >
                    {t("trainingCreateEditDetail.instructor")}
                  </Text>
                  <div>
                    <Avatar
                      size="large"
                      src="https://joeschmoe.io/api/v1/random"
                      style={{ marginTop: "15px" }}
                    />
                    <Space direction="vertical" size={-5}>
                      <Text
                        style={{ fontWeight: 700, paddingLeft: 10 }}
                      >
                        {location.state.trainer}
                      </Text>
                      <Text
                        style={{
                          fontSize: "12px",
                          paddingLeft: 10,
                          color: "#8e8e8e",
                        }}
                      >
                        {location.state.additionalInfo}
                      </Text>
                    </Space>
                  </div>
                  <Card
                    bodyStyle={{ padding: 0 }}
                    style={{
                      borderRadius: 10,
                      width: "100%",
                      marginTop: 20,
                    }}
                  >
                    <Row>
                      <Col
                        style={{
                          padding: 10,
                          borderBottom: "#cccccc solid 1px",
                          width: "100%",
                          backgroundColor: "#399af5",
                          borderRadius: "10px 10px 0 0",
                          color: "white",
                          fontWeight: 700,
                        }}
                      >
                        {t("trainingCreateEditDetail.resources")}
                      </Col>
                    </Row>
                    <Space
                      direction="vertical"
                      size={6}
                      style={{ display: "flex", padding: 10 }}
                    >
                      <Text
                        style={{ fontSize: "16px", fontWeight: 700 }}
                      >
                        <SolutionOutlined
                          style={{ marginRight: 5 }}
                        />
                        {location.state.isOnlineClass === true
                          ? t(
                              "trainingCreateEditDetail.eventType.option1"
                            )
                          : t(
                              "trainingCreateEditDetail.eventType.option2"
                            )}{" "}
                        Detail
                      </Text>
                      <Text
                        style={{
                          fontSize: "14px",
                          fontWeight: 700,
                        }}
                      >
                        {t("trainingCreateEditDetail.number")}
                      </Text>
                      <Text
                        style={{
                          fontSize: "14px",
                          color: "#8e8e8e",
                        }}
                      >
                        TREV-YYMM-XXXX
                      </Text>
                      <Text
                        style={{ fontSize: "14px", fontWeight: 700 }}
                      >
                        {t("trainingCreateEditDetail.date")}
                      </Text>
                      <Text
                        style={{
                          fontSize: "14px",
                          color: "#8e8e8e",
                        }}
                      >
                        {location.state.startDate}
                      </Text>
                      <Text
                        style={{ fontSize: "14px", fontWeight: 700 }}
                      >
                        {t("trainingCreateEditDetail.location")}
                      </Text>
                      <Text
                        style={{
                          fontSize: "14px",
                          color: "#8e8e8e",
                        }}
                      >
                        {location.state.trainer}
                      </Text>
                      <Text
                        style={{ fontSize: "14px", fontWeight: 700 }}
                      >
                        {t("trainingCreateEditDetail.status.label")}
                      </Text>
                      <Text
                        style={{
                          fontSize: "14px",
                          color: "#8e8e8e",
                        }}
                      >
                        {location.state.isComplete === true
                          ? t(
                              "trainingCreateEditDetail.status.radio2"
                            )
                          : t(
                              "trainingCreateEditDetail.status.radio1"
                            )}
                      </Text>
                      <Text
                        style={{ fontSize: "14px", fontWeight: 700 }}
                      >
                        {t("trainingCreateEditDetail.endDate")}
                      </Text>
                      <Text
                        style={{
                          fontSize: "14px",
                          color: "#8e8e8e",
                        }}
                      >
                        {location.state.endDate}
                      </Text>
                      <Text
                        style={{ fontSize: "14px", fontWeight: 700 }}
                      >
                        {t("trainingCreateEditDetail.trainer.label")}
                      </Text>
                      <Text
                        style={{
                          fontSize: "14px",
                          color: "#8e8e8e",
                        }}
                      >
                        {location.state.trainer}
                      </Text>
                    </Space>
                  </Card>
                </Space>
              </Col>
            </div>
          </div>
        </div>
        <Row style={{ paddingTop: 20 }}>
          <Col
            span={24}
            style={{
              textAlign: "right",
              padding: 20,
              borderTop: "1px #dddddd solid",
            }}
          >
            <Button
              onClick={handleBack}
              type="secondary"
              htmlType="submit"
              style={{
                borderRadius: 5,
                width: 100,
                marginRight: 10,
              }}
            >
              {t("trainingCreateEditDetail.button.back")}
            </Button>
            {location.pathname === `/mytraining/${params.id}` &&
            user.role === "admin" ? (
              <>
                <Button
                  onClick={handleEdit}
                  type="primary"
                  htmlType="submit"
                  style={{
                    borderRadius: 5,
                    width: 100,
                    marginRight: 10,
                  }}
                >
                  {t("trainingCreateEditDetail.button.edit")}
                </Button>
                <Button
                  onClick={showDeleteConfirm}
                  type="primary"
                  danger
                  style={{
                    borderRadius: 5,
                    width: 100,
                  }}
                >
                  {t("trainingCreateEditDetail.button.delete")}
                </Button>
              </>
            ) : null}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default TrainingDetailPage;
