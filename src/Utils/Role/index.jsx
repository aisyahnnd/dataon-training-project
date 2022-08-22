const Role = () => {
  const roleString = localStorage.getItem("role");
  const role = JSON.parse(roleString);
  return role;
};

export default Role;
