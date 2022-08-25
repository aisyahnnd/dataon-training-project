import React from "react";
import { useNavigate } from "react-router-dom";
import {
  EnvironmentOutlined,
  StarFilled,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { useTranslation } from "react-i18next";
import "./AllTrainingEvent.css";

const { Text } = Typography;

const SingleAllTrainingEvent = (props) => {
  const { t } = useTranslation(["content"]);
  const { item, id } = props;
  const navigate = useNavigate();

  const showDetail = () => {
    navigate(`/training/${item.id}`, { state: item });
  };

  return (
    <Tooltip
      placement="right"
      title={item.eventName}
      color="white"
      overlayInnerStyle={{
        borderRadius: 10,
        width: 400,
        padding: 15,
      }}
      overlay={
        <div className="tooltip-card">
          <h2>{item.eventName}</h2>
          <div className="tooltip-star">
            <StarFilled /> {t("alltrainingCard.tooltip.label")}
          </div>

          <Row justify="center" style={{ marginTop: "20px" }}>
            <Col align="center">
              <Button size="large" className="tooltip-btn">
                <p>{t("alltrainingCard.tooltip.sub1")}</p>
              </Button>
            </Col>
          </Row>
          <Row justify="center" style={{ marginTop: "20px" }}>
            <Col>
              <Button className="tooltip-btn-other">
                <p>{t("alltrainingCard.tooltip.sub2")}</p>
              </Button>
            </Col>
          </Row>
        </div>
      }
    >
      <Card
        onClick={showDetail}
        key={id}
        style={{
          maxWidth: 400,
          height: 400,
          borderRadius: 10,
          margin: "0px auto",
        }}
        cover={
          <img
            alt="example"
            src={item.thumbnail}
            style={{ borderRadius: "10px 10px 0px 0px" }}
          />
        }
        hoverable
      >
        <Row justify="space-between">
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Space
              direction="vertical"
              size={1}
              style={{ display: "flex" }}
            >
              <Text style={{ fontSize: "11px" }}>
                <EnvironmentOutlined /> {item.trainer}
              </Text>
              <Text style={{ fontSize: "12px" }} strong>
                {item.eventName}
              </Text>
            </Space>
          </Col>
        </Row>
        <Row justify="space-between">
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <Space
              direction="vertical"
              size={1}
              style={{
                display: "flex",
                paddingTop: 20,
              }}
            >
              <Text type="secondary">{item.startDate}</Text>
              <Text type="secondary" style={{ fontSize: "11px" }}>
                <UserOutlined /> {item.trainer}
              </Text>
            </Space>
          </Col>
        </Row>
      </Card>
    </Tooltip>
  );
};

export default SingleAllTrainingEvent;
