import { Table } from "antd";
import PropTypes from "prop-types";
import "./TableData.css";

const TableData = ({ pagination, columns, dataTable }) => {
  return (
    <Table
      dataSource={dataTable}
      columns={columns}
      pagination={pagination}
    />
  );
};

export default TableData;

TableData.propTypes = {
  pagination: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  dataTable: PropTypes.array,
};

TableData.defaultProps = {
  pagination: { defaultPageSize: 2 },
};
