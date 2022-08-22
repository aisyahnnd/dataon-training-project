import React, { useState, useEffect, useContext } from "react";
import { Badge, Col, Row, List } from "antd";
import { AppContext } from "@/Context/";
import { useTranslation } from "react-i18next";
import SingleAllTrainingEvent from "@/Components/AllTrainingEvent/SingleAllTrainingEvent";
import InfiniteScroll from "react-infinite-scroll-component";
import "./AllTrainingEvent.css";

const AllTrainingEvent = () => {
  const { t } = useTranslation(["dashboard"]);
  let x = window.matchMedia("(max-width: 1024px)");
  const { DataAllTrainings } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [item, setItem] = useState(
    Array.from({ length: x.matches ? 4 : 5 })
  );

  const getData = async () => {
    try {
      setData(DataAllTrainings.data);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, [DataAllTrainings]);

  const AllTraining = () => {
    setTimeout(() => {
      setItem(item.concat(Array.from({ length: x.matches ? 4 : 5 })));
    }, 1500);
  };

  return (
    <>
      <div className="site-card-wrapper">
        <div className="title-event">
          <p>
            {t("allTrainingEvent")}
            <Badge
              style={{
                marginLeft: 5,
                backgroundColor: "#e7e7e7",
                color: "#2db7f5",
                fontWeight: "bold",
              }}
              count={data.length}
            />
          </p>
        </div>

        <InfiniteScroll
          dataLength={item.length}
          next={AllTraining}
          hasMore={item.length >= data.length ? false : true}
          loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
        >
          <List
            grid={{
              gutter: 16,
              column: 5,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 5,
              xxl: 3,
            }}
            dataSource={data.slice(0, item.length)} //
            renderItem={(item, id) => (
              <List.Item>
                <Row justify="center">
                  <Col>
                    <SingleAllTrainingEvent
                      id={item.id}
                      item={item}
                    />
                  </Col>
                </Row>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default AllTrainingEvent;
