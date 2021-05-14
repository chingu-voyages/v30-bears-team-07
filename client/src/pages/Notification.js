const Notification = ({ message }) => {
  let green = {
    color: "green",
    background: "lightgray",
    fontSize: 18,
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
    borderStyle: "solid",
  };

  let red = { ...green, color: "red" };

  if (message === null) {
    return null;
  }

  if (message === "Wrong username or password") {
    return <div style={red}>{message}</div>;
  }

  return <div style={green}>{message}</div>;
};

export default Notification;
