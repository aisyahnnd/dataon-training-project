import {
  Card,
  Col,
  Row,
  Space,
  Typography,
  Button,
  Checkbox,
  Form,
  Carousel,
  Alert,
  Select,
  Input,
} from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Notification } from "@/Components";
import { useTranslation } from "react-i18next";
import Image1 from "@/assets/Images/example-3.svg";
import Image2 from "@/assets/Images/example-25.svg";
import Image3 from "@/assets/Images/example-29.svg";
import Image4 from "@/assets/Images/example-30.svg";
import Logo from "@/assets/Images/logo.png";
import PropTypes from "prop-types";
import i18next from "i18next";
import "./LoginPage.css";

const { Text } = Typography;

const LoginPage = ({ setToken }) => {
  const { t, i18n } = useTranslation(["login"]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [flag, setFlag] = useState(false);
  let navigate = useNavigate();

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleSubmit = async () => {
    console.warn(username, password);
    let item = {
      username: username,
      password: password,
    };

    if (username && password) {
      try {
        let result = await fetch(
          "https://gist.githubusercontent.com/aisyahnnd/c168969ed7dca3cd92f0e54298078e00/raw/d918a4df3f1c5d87dc057ee299d1e460e9d834b5/login-api",
          {
            method: "GET",
          }
        );
        result = await result.json();
        let data = result.find((item) => {
          if (
            username === item.data.username &&
            password === item.data.password
          ) {
            return item;
          } else {
            console.log("User not found!");
          }
        });
        localStorage.setItem("user-info", JSON.stringify(data.data));
        localStorage.setItem("role", JSON.stringify(data.data.role));
        localStorage.setItem("token", JSON.stringify(data.token));
        setToken(JSON.stringify(data.token));
        var messages = t("notification");
        Notification(messages, "success");
        navigate("/");
      } catch (error) {
        Notification(error.message, "warn");
      }
    } else {
      setFlag(true);
      return false;
    }
  };

  useEffect(() => {
    if (localStorage.getItem("i18nextLng"?.length > 2)) {
      i18next.changeLanguage("en");
    }
  }, []);

  const onChangeLanguages = (event) => {
    i18n.changeLanguage(event);
    console.log({ event });
  };

  return (
    <Card bodyStyle={{ backgroundColor: "#bac6f2" }}>
      <Card
        bodyStyle={{
          padding: "0px",
        }}
        style={{ borderRadius: 10 }}
        data-testid="card-login"
      >
        <Row
          className="header"
          style={{ borderBottom: "1px #dddddd solid" }}
          data-testid="header"
        >
          <Col span={3}>
            <img alt="logo" src={Logo} width={150} />
          </Col>
          <Col
            span={17}
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
            }}
          >
            <Space size={-5} direction="vertical">
              <Text style={{ fontSize: "16px", fontWeight: 500 }}>
                {t("header")}
              </Text>
              <Text style={{ fontSize: "24px", fontWeight: 900 }}>
                SunFish 7
              </Text>
            </Space>
          </Col>
          <Col
            span={4}
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 25,
            }}
          >
            <Select
              defaultValue="English (EN)"
              // value={localStorage.getItem("i18nextLng")}
              style={{
                width: 150,
              }}
              bordered={false}
              name="language"
              onChange={onChangeLanguages}
            >
              <Select.Option value="en">English (EN)</Select.Option>
              <Select.Option value="id">
                Indonesia (IDN)
              </Select.Option>
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={14}>
            <Carousel
              style={{
                justifyContent: "center",
                paddingTop: 100,
                paddingLeft: 100,
              }}
              autoplay
              data-testid="carousel-login"
            >
              <div>
                <img
                  style={{
                    width: "500px",
                    justifyContent: "center",
                  }}
                  alt="side-1"
                  src={Image1}
                />
              </div>
              <div>
                <img
                  style={{ width: "500px", justifyContent: "center" }}
                  alt="side-1"
                  src={Image2}
                />
              </div>
              <div>
                <img
                  style={{ width: "500px", justifyContent: "center" }}
                  alt="side-1"
                  src={Image3}
                />
              </div>
              <div>
                <img
                  style={{ width: "500px", justifyContent: "center" }}
                  alt="side-1"
                  src={Image4}
                />
              </div>
            </Carousel>
          </Col>

          <Col span={10} style={{ padding: 20 }}>
            <Space
              size={3}
              style={{ paddingRight: 30, paddingBottom: 30 }}
            >
              <Text
                style={{
                  fontSize: "36px",
                  fontWeight: 900,
                  color: "#1890ff",
                }}
              >
                {t("content")}
              </Text>
            </Space>
            <Form
              name="basic"
              wrapperCol={{
                span: 24,
              }}
              initialValues={{
                remember: true,
              }}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
              data-testid="form-login"
            >
              <Form.Item
                style={{ fontWeight: "bold" }}
                label={t("username.label")}
                name="username"
                rules={[
                  {
                    required: true,
                    message: `${t("username.messages.part1")}`,
                  },
                  {
                    max: 20,
                    message: `${t("username.messages.part2")}`,
                  },
                  {
                    pattern: new RegExp(/^[a-zA-Z 0-9]+$/i),
                    message: `${t("username.messages.part3")}`,
                  },
                ]}
              >
                <Input
                  style={{ width: 400 }}
                  placeholder={t("username.placeholder")}
                  onChange={(event) =>
                    setUsername(event.target.value)
                  }
                  data-testid="username"
                />
              </Form.Item>
              <Form.Item
                style={{ fontWeight: "bold" }}
                label={t("password.label")}
                name="password"
                rules={[
                  {
                    required: true,
                    message: `${t("password.messages.part1")}`,
                  },
                  {
                    min: 8,
                    message: `${t("password.messages.part2")}`,
                  },
                ]}
              >
                <Input.Password
                  style={{ width: 400 }}
                  placeholder={t("password.placeholder")}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  data-testid="password"
                />
              </Form.Item>
              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 0,
                  span: 24,
                }}
              >
                <Row>
                  <Col span={12}>
                    <Checkbox>{t("checkbox")}</Checkbox>
                  </Col>
                  <Col span={12}>
                    <p>
                      <a href="#">{t("password.forgotPassword")}</a>
                    </p>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 0,
                  span: 24,
                }}
              >
                <Row>
                  <Col span={24}>
                    <p>
                      {t("account.part1")}{" "}
                      <Link to="/register">{t("account.part2")}</Link>
                    </p>
                  </Col>
                </Row>
                <Button
                  style={{ width: 100 }}
                  type="primary"
                  htmlType="submit"
                  onClick={handleSubmit}
                  data-testid="login-button"
                >
                  {t("button")}
                </Button>
              </Form.Item>
              {flag && <Alert message={t("alert")} type="warning" />}
            </Form>
          </Col>
        </Row>
        <Row className="footer" data-testid="footer">
          <Col
            span={24}
            style={{ textAlign: "center", paddingTop: 20 }}
          >
            <Text style={{ fontSize: "16px", color: "#888888" }}>
              {t("footer.line1")}
            </Text>
          </Col>
          <Col
            span={24}
            style={{ textAlign: "center", paddingBottom: 20 }}
          >
            <Text style={{ fontSize: "16px", color: "#888888" }}>
              {t("footer.line2")}
            </Text>
          </Col>
        </Row>
      </Card>
    </Card>
  );
};

export default LoginPage;

LoginPage.propTypes = {
  setToken: PropTypes.string.isRequired,
};
