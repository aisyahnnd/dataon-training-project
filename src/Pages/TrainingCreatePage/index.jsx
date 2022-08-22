import React, { useState, useContext } from "react";
import { UploadOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  DatePicker,
  Upload,
  Row,
  Col,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppContext } from "@/Context";
import { SectionHeader } from "@/Components";

const { RangePicker } = DatePicker;
const { Option, OptGroup } = Select;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }

  return e?.fileList;
};

const TrainingCreatePage = () => {
  const { t } = useTranslation(["content"]);
  const [form] = Form.useForm();
  const { CreateDataTraining } = useContext(AppContext);
  const [componentSize, setComponentSize] = useState("default");
  const navigate = useNavigate();

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleBack = () => {
    navigate("/");
  };

  //format date
  const rangeConfig = {
    rules: [
      {
        type: "array",
        required: true,
        message: t("trainingCreateEditDetail.messageDate"),
      },
    ],
  };

  //post data
  const onFinish = (values) => {
    const starDate = values.date[0].format("YYYY-MM-DD");
    const endDate = values.date[1].format("YYYY-MM-DD");
    const data = {
      eventName: values.eventName,
      isOnlineClass: values.isOnlineClass,
      startDate: starDate,
      endDate: endDate,
      location: { lat: values.latitude, long: values.longitude },
      isComplete: values.status,
      trainer: values.trainer,
      additionalInfo: values.additionalInfo,
    };
    CreateDataTraining(data);
    form.resetFields();
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
        >
          <Form.Item
            name="isOnlineClass"
            label={t("trainingCreateEditDetail.eventType.label")}
            rules={[
              {
                required: true,
              },
            ]}
            data-testid="isOnlineClass"
          >
            <Select
              placeholder={t(
                "trainingCreateEditDetail.eventType.placeholder"
              )}
              optionFilterProp="children"
              allowClear
              data-testid="eventType"
            >
              <OptGroup
                label={t("trainingCreateEditDetail.eventType.label")}
              >
                <Option value={true}>
                  {t("trainingCreateEditDetail.eventType.option1")}
                </Option>
                <Option value={false}>
                  {t("trainingCreateEditDetail.eventType.option2")}
                </Option>
              </OptGroup>
            </Select>
          </Form.Item>
          <Form.Item
            name="eventName"
            label={t("trainingCreateEditDetail.eventName.label")}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              data-testid="eventName"
              placeholder={t(
                "trainingCreateEditDetail.eventName.placeholder"
              )}
            />
          </Form.Item>

          <Form.Item
            name="event-thumbnail"
            label={t("trainingCreateEditDetail.eventThumbnail.label")}
            valuePropName="fileList"
            getValueFromEvent={normFile}
            extra={t("trainingCreateEditDetail.eventThumbnail.extra")}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Upload
              name="logo"
              action="/upload.do"
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>
                {t("trainingCreateEditDetail.eventThumbnail.button")}
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="date"
            label={t("trainingCreateEditDetail.date")}
            {...rangeConfig}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <RangePicker data-testid="date" />
          </Form.Item>
          <Form.Item
            name="status"
            label={t("trainingCreateEditDetail.status.label")}
            data-testid="status"
            rules={[
              {
                required: true,
                message: t("trainingCreateEditDetail.status.message"),
              },
            ]}
          >
            <Radio.Group>
              <Radio.Button value={true}>
                {t("trainingCreateEditDetail.status.radio1")}
              </Radio.Button>
              <Radio.Button value={false}>
                {t("trainingCreateEditDetail.status.radio2")}
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="trainer"
            label={t("trainingCreateEditDetail.trainer.label")}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              data-testid="trainer"
              placeholder={t(
                "trainingCreateEditDetail.trainer.placeholder"
              )}
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
            data-testid="additionalInfo"
            rules={[
              {
                required: true,
              },
            ]}
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
                data-testid="submitButton"
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

export default TrainingCreatePage;
