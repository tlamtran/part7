import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector(state => state.notification)

  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const successStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (message === null) {
    return null;
  } else {
    return (
      <p style={message.includes('success') ? successStyle : errorStyle}>{message}</p>
    );
  }
};

export default Notification;
