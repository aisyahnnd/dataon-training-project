import { Transfer } from "antd";
import React, { useEffect, useState } from "react";
import dataTransfer from "./data.json";

const SwitchTransfer = () => {
  const [mockData, setMockData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);

  const getMock = () => {
    const newTargetKeys = [];
    const newMockData = [];

    dataTransfer.map((item) => {
      const data = {
        key: item.id.toString(),
        name: item.name,
        description: `description of content${item.id}`,
        chosen: Math.random() * 2 > 1,
      };

      if (data.chosen) {
        newTargetKeys.push(data.key);
      }

      newMockData.push(data);
    });

    setTargetKeys(newTargetKeys);
    setMockData(newMockData);
  };

  useEffect(() => {
    getMock();
  }, []);

  const filterOption = (inputValue, option) =>
    option.description.indexOf(inputValue) > -1;

  const onChange = (newTargetKeys, direction, moveKeys) => {
    console.log(newTargetKeys, direction, moveKeys);
    setTargetKeys(newTargetKeys);
  };

  const handleSearch = (dir, value) => {
    console.log("search:", dir, value);
  };

  const renderItem = (item) => {
    const customLabel = <span className="name">{item.name}</span>;

    return {
      label: customLabel,
      value: item.name,
    };
  };

  return (
    <>
      <Transfer
        titles={["Source", "Target"]}
        dataSource={mockData}
        showSearch
        targetKeys={targetKeys}
        filterOption={filterOption}
        onChange={onChange}
        onSearch={handleSearch}
        render={renderItem}
        pagination={{
          pageSize: 5,
        }}
      />
    </>
  );
};

export default SwitchTransfer;
