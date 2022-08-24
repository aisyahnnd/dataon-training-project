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
import { SectionHeader } from "@/Components";
import moment from "moment";

const { RangePicker } = DatePicker;

const TrainingCreateEditPage = () => {
  const params = useParams();
  const { t } = useTranslation(["content"]);
  const {
    EditDataTraining,
    dataEdit,
    GetDataEdit,
    CreateDataTraining,
  } = useContext(AppContext);
  const [componentSize, setComponentSize] = useState("default");
  const [value, setValue] = useState("");
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const path = pathSnippets[0];

  const handleBack = () => {
    if (location.pathname === `/mytraining/edit/${params.id}`) {
      navigate(`/mytraining/${params.id}`);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (params.id) {
      GetDataEdit(params.id);
    }
  }, [params, location]);

  form.setFieldsValue({
    eventName: dataEdit.eventName,
    date: [moment(dataEdit.startDate), moment(dataEdit.endDate)],
    image: dataEdit.image,
    isOnlineClass: dataEdit.isOnlineClass,
    location: dataEdit.location,
    trainer: dataEdit.trainer,
    ratings: dataEdit.ratings,
    additionalInfo: dataEdit.additionalInfo,
    isComplete: dataEdit.isComplete,
  });

  const onFinish = (values) => {
    const starDate = values.date[0].format("YYYY-MM-DD");
    const endDate = values.date[1].format("YYYY-MM-DD");
    const data = {
      eventName: values.eventName,
      isOnlineClass:
        values.isOnlineClass ===
        t("trainingCreateEditDetail.eventType.option1")
          ? "true"
          : "false",
      startDate: starDate,
      endDate: endDate,
      location: { lat: values.latitude, long: values.longitude },
      isComplete:
        values.isComplete ===
        t("trainingCreateEditDetail.status.radio1")
          ? "true"
          : "false",
      trainer: values.trainer,
      additionalInfo: values.additionalInfo,
      ratings: values.ratings,
    };
    if (location.pathname === `/mytraining/edit/${params.id}`) {
      EditDataTraining(data, params.id);
      navigate(`/mytraining/${params.id}`);
    }
    if (location.pathname === "/training/create") {
      CreateDataTraining(data);
      form.resetFields();
      navigate("/");
    }
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
          form={params.id ? form : form.resetFields()}
          style={{ paddingTop: 50 }}
        >
          <Form.Item
            name="isOnlineClass"
            label={t("trainingCreateEditDetail.eventType.label")}
            value={
              dataEdit.isOnlineClass === "true"
                ? t("trainingCreateEditDetail.eventType.option1")
                : t("trainingCreateEditDetail.eventType.option2")
            }
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
            >
              <Select.Option
                name="isOnlineClass"
                value={t(
                  "trainingCreateEditDetail.eventType.option1"
                )}
              >
                {t("trainingCreateEditDetail.eventType.option1")}
              </Select.Option>
              <Select.Option
                name="isOnlineClass"
                value={t(
                  "trainingCreateEditDetail.eventType.option2"
                )}
              >
                {t("trainingCreateEditDetail.eventType.option2")}
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="eventName"
            label={t("trainingCreateEditDetail.eventName.label")}
            value={dataEdit.eventName}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              placeholder={t(
                "trainingCreateEditDetail.eventName.placeholder"
              )}
            />
          </Form.Item>
          <Form.Item
            name="trainer"
            label={t("trainingCreateEditDetail.trainer.label")}
            value={dataEdit.trainer}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              placeholder={t(
                "trainingCreateEditDetail.trainer.placeholder"
              )}
            />
          </Form.Item>
          <Form.Item
            name="date"
            label={t("trainingCreateEditDetail.date")}
            value={dataEdit.date}
            rules={[
              {
                required: true,
                message: t("trainingCreateEditDetail.messageDate"),
              },
            ]}
          >
            <RangePicker format="YYYY-MM-DD HH:mm" showTime />
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
            <Radio.Group
              defaultValue={
                dataEdit.isComplete === "true"
                  ? t("trainingCreateEditDetail.status.radio1")
                  : t("trainingCreateEditDetail.status.radio2")
              }
            >
              <Radio.Button
                name="isComplete"
                value={t("trainingCreateEditDetail.status.radio1")}
              >
                {t("trainingCreateEditDetail.status.radio1")}
              </Radio.Button>
              <Radio.Button
                name="isComplete"
                value={t("trainingCreateEditDetail.status.radio2")}
              >
                {t("trainingCreateEditDetail.status.radio2")}
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="ratings"
            label={t("trainingTable.title5")}
            value={dataEdit.ratings}
          >
            <InputNumber
              min={1}
              onChange={(value) => onChangeRatings(value)}
              max={100}
              type="number"
              placeholder={t("trainingTable.title5")}
            />
          </Form.Item>
          <Form.Item
            name="location"
            label={t("trainingCreateEditDetail.location")}
          >
            <Form.Item
              name="latitude"
              value={dataEdit.location.lat}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Latitude" />
            </Form.Item>
            <Form.Item
              name="longitude"
              value={dataEdit.location.long}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Longitude" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            name="additionalInfo"
            label={t("trainingCreateEditDetail.information.label")}
            value={dataEdit.additionalInfo}
          >
            <Input
              placeholder={t(
                "trainingCreateEditDetail.information.placeholder"
              )}
            />
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

export default TrainingCreateEditPage;
