import React, { useState } from "react";
import {
  Image,
  Card,
  Col,
  Row,
  Button,
  Space,
  Typography,
  Modal,
} from "antd";
import { EnvironmentOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Rate } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Axios from "@/Utils/Axios";
import PropTypes from "prop-types";
import "./MyTrainingEvent.css";
import "antd/dist/antd.css";

const { Text } = Typography;

const SingleMyTrainingEvent = (props) => {
  const { t } = useTranslation(["content"]);
  const { item, id, location } = props;
  const navigate = useNavigate();
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  // convert rate to range 1-5 not 0-100
  const [rate, setRate] = useState(item?.ratings / 20);

  const openLocation = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`,
      "_blank"
    );
  };

  const showDetail = () => {
    navigate(`/mytraining/${item.id}`, { state: item });
  };

  const showModal = () => {
    setVisible(true);
  };
  const onChangeRatings = (value) => {
    setRate(value);
  };

  const handleOk = async () => {
    item.ratings = rate;
    const updateRatings = {
      ...item,
      ratings: item.ratings,
    };

    const response = await Axios.put(
      `/users/1/trainings/${id}`,
      updateRatings
    );

    if (response.status === 200) {
      console.log("Ratings Updated Successfully");
    }

    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      //action update rate
      setRate(item.ratings);
      //convert rate to range 0 - 100 not 1-5 before update
      setConfirmLoading(false);
    }, 2000);
  };

  //rate will update on modal if value ratings update on db
  useEffect(() => {
    setRate(item?.ratings);
  }, [item?.ratings]);

  const handleCancel = () => {
    setRate(item.ratings);
    setVisible(false);
  };

  return (
    <Card
      key={id}
      style={{
        maxWidth: 400,
        borderRadius: 10,
        margin: "0px auto",
      }}
      bodyStyle={{ padding: "0" }}
      hoverable
      data-testid="card"
    >
      <Row
        onClick={showDetail}
        className="row-top"
        data-testid="mytraining-card"
      >
        <Col>
          <Image
            alt="example"
            src={item?.thumbnail}
            width={100}
            height={140}
            style={{
              borderRadius: "10px 0px 0px 0px",
              backgroundRepeat: "no-repeat",
              objectFit: "cover",
            }}
          />
        </Col>
        <Col className="row-top-detail">
          <Space
            direction="vertical"
            size={3}
            style={{ display: "flex" }}
          >
            <Text style={{ fontSize: "11px" }}>
              <EnvironmentOutlined /> {item?.trainer}
            </Text>
            <Text style={{ fontSize: "16px" }} strong>
              {item?.eventName}
            </Text>
            <Text type="secondary">{item?.startDate}</Text>
            <Text type="secondary" style={{ fontSize: "11px" }}>
              <UserOutlined /> {item?.trainer}
            </Text>
          </Space>
        </Col>
      </Row>
      <Row className="row-bottom" justify="space-between">
        <Col>
          {item?.isComplete ? (
            <p className="row-bottom-detail">
              {t("mytrainingCard.isComplete.part1")}
            </p>
          ) : (
            <p className="row-bottom-detail">
              {t("mytrainingCard.isComplete.part2")}
            </p>
          )}
        </Col>
        <Col>
          {item?.isComplete ? (
            <Button
              type="primary"
              size="small"
              style={{ fontSize: 12 }}
              onClick={showModal}
              data-testid="btn-feedback"
            >
              {t("mytrainingCard.button.part1")}
            </Button>
          ) : (
            <Button
              type="primary"
              size="small"
              style={{ fontSize: 12 }}
              onClick={openLocation}
              icon={<EnvironmentOutlined />}
              data-testid="btn-location"
            >
              {t("mytrainingCard.button.part2")}
            </Button>
          )}
          <Modal
            title={t("mytrainingCard.modal")}
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            className="modal"
            data-testid="modal"
          >
            <Space
              direction="vertical"
              size={3}
              style={{ display: "flex" }}
            >
              <Text strong>{item?.eventName}</Text>
              <Text type="secondary">{item?.trainer}</Text>
              <Text type="secondary" style={{ fontSize: "11px" }}>
                <UserOutlined /> {item?.trainer}
              </Text>
              <div className="rating">
                <Rate
                  defaultValue={item?.ratings}
                  value={rate}
                  onChange={(value) => onChangeRatings(value)}
                ></Rate>
              </div>
            </Space>
          </Modal>
        </Col>
      </Row>
    </Card>
  );
};

export default SingleMyTrainingEvent;

SingleMyTrainingEvent.propTypes = {
  url: PropTypes.string,
  item: PropTypes.object,
  id: PropTypes.string,
  location: PropTypes.object.isRequired,
};

SingleMyTrainingEvent.defaultProps = {
  dataBadge: 10,
  style: "",
  location: {
    lat: "28.6139",
    lng: "77.2090",
  },
};
