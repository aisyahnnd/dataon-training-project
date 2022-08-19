import React from "react";
import { SmileOutlined, WarningOutlined } from "@ant-design/icons";
import { notification } from "antd";

function Notification(messages, type) {
  {
    type === "success"
      ? notification.open({
          message: "Success",
          description: messages,
          icon: (
            <SmileOutlined
              style={{
                color: "#108ee9",
              }}
            />
          ),
        })
      : notification.warn({
          message: "Warning",
          description: messages,
          icon: (
            <WarningOutlined
              style={{
                color: "#108ee9",
              }}
            />
          ),
        });
  }
}

export default Notification;
