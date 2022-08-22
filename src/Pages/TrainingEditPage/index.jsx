import React, { useEffect, useState, useContext } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  DatePicker,
  Row,
  Col,
  InputNumber,
} from "antd";
import {
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { AppContext } from "@/Context";
import { useTranslation } from "react-i18next";
import SectionHeader from "@/Components";
import dayjs from "dayjs";
import moment from "moment";

const { RangePicker } = DatePicker;

const TrainingEditPage = () => {
  const { t } = useTranslation(["content"]);
  const { EditDataTraining } = useContext(AppContext);
  const [componentSize, setComponentSize] = useState("default");
  const [data, setData] = useState({
    eventName: "",
    startDate: "",
    endDate: "",
    image: "",
    trainer: "",
    location: "",
    ratings: "",
    isOnlineClass: "",
    additionalInfo: "",
    isComplete: "",
    date: "",
  });
  const [value, setValue] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const getData = async () => {
    try {
      setData({
        eventName: location.state.eventName,
        startDate: dayjs(location.state.startDate).format(
          "YYYY-MM-DD HH:mm"
        ),
        endDate: dayjs(location.state.endDate).format(
          "YYYY-MM-DD HH:mm"
        ),
        image: location.state.thumbnail,
        isOnlineClass:
          location.isOnlineClass === true
            ? t("trainingCreateEditDetail.eventType.option1")
            : t("trainingCreateEditDetail.eventType.option2"),
        location: location.state.trainer,
        trainer: location.state.trainer,
        ratings: location.state.ratings,
        additionalInfo: location.state.additionalInfo,
      });
    } catch (error) {
      navigate("/missing");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  form.setFieldsValue({
    eventName: data.eventName,
    date: [moment(data.startDate), moment(data.endDate)],
    image: data.image,
    isOnlineClass: data.isOnlineClass,
    location: data.location,
    trainer: data.trainer,
    ratings: data.ratings,
    additionalInfo: data.additionalInfo,
  });

  //update data to database
  const params = useParams();
  const onFinish = (values) => {
    var user = JSON.parse(localStorage.getItem("user-info"));
    const starDate = values.date[0].format("YYYY-MM-DD");
    const endDate = values.date[1].format("YYYY-MM-DD");
    const dataEdit = {
      eventName: values.eventName,
      isOnlineClass:
        values.isOnlineClass ===
        t("trainingCreateEditDetail.eventType.option1")
          ? true
          : false,
      startDate: starDate,
      endDate: endDate,
      location: { lat: values.latitude, long: values.longitude },
      isComplete: values.isComplete,
      trainer: values.trainer,
      additionalInfo: values.additionalInfo,
      ratings: values.ratings,
    };
    EditDataTraining(dataEdit, params.id, user.id);
  };

  const onChangeRatings = (value) => {
    form.setFieldsValue({
      ratings: value,
    });
  };

  return (
    <>
      <SectionHeader></SectionHeader>
      <div className="site-card-wrapper">
        <Form
          data-testid="form"
          onFinish={onFinish}
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 13,
          }}
          layout="horizontal"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          form={form}
          style={{ paddingTop: 50 }}
        >
          <Form.Item
            name="isOnlineClass"
            label={t("trainingCreateEditDetail.eventType.label")}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder={t(
                "trainingCreateEditDetail.eventType.placeholder"
              )}
              value={data.isOnlineClass}
            >
              <Select.Option name="true" value="Online Class">
                {t("trainingCreateEditDetail.eventType.option1")}
              </Select.Option>
              <Select.Option name="false" value="Offline Class">
                {t("trainingCreateEditDetail.eventType.option2")}
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="eventName"
            label={t("trainingCreateEditDetail.eventName.label")}
            value={data.eventName}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="trainer"
            label={t("trainingCreateEditDetail.trainer.label")}
            value={data.trainer}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="location"
            label={t("trainingCreateEditDetail.location")}
            value={data.location}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            label={t("trainingCreateEditDetail.date")}
            value={data.date}
            rules={[
              {
                required: true,
                message: t("trainingCreateEditDetail.messageDate"),
              },
            ]}
          >
            <RangePicker
              format="YYYY-MM-DD HH:mm"
              defaultPickerValue={[
                moment(data.startDate),
                moment(data.endDate),
              ]}
              showTime
            />
          </Form.Item>
          <Form.Item
            name="isComplete"
            label={t("trainingCreateEditDetail.status.label")}
            rules={[
              {
                required: true,
                message: t("trainingCreateEditDetail.status.message"),
              },
            ]}
          >
            <Radio.Group value={value}>
              <Radio.Button value={false}>
                {t("trainingCreateEditDetail.status.radio1")}
              </Radio.Button>
              <Radio.Button value={true}>
                {t("trainingCreateEditDetail.status.radio2")}
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="ratings"
            label={t("trainingTable.title5")}
            value={data.ratings}
          >
            <InputNumber
              min={1}
              onChange={(value) => onChangeRatings(value)}
              max={100}
              type="number"
            />
          </Form.Item>
          <Form.Item label={t("trainingCreateEditDetail.location")}>
            <Form.Item
              name="latitude"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input name="latitude" placeholder="latitude" />
            </Form.Item>
            <Form.Item
              name="longitude"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="longitude" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            name="additionalInfo"
            label={t("trainingCreateEditDetail.information.label")}
            value={data.additionalInfo}
          >
            <Input />
          </Form.Item>
          <Row style={{ paddingTop: 100 }}>
            <Col
              span={24}
              style={{
                textAlign: "right",
                padding: 20,
                borderTop: "1px #dddddd solid",
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ borderRadius: 5, width: 100 }}
              >
                {t("trainingCreateEditDetail.button.submit")}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default TrainingEditPage;
