import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Flex, Input } from "antd";
import { addTodo, selectTodos } from "../ToDo.slice";
import { ToDo } from "../../types/Todo.type";

const initialState: ToDo = {
  id: "",
  title: "",
  checked: false,
};

export function CreateTodo() {
  const [formData, setFormData] = useState(initialState);
  const [alert, setAlert] = useState(false);

  const dispatch = useDispatch();

  const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && formData.title !== "") {
      setAlert(false);
      e.preventDefault();
      dispatch(addTodo(formData));
      setFormData(initialState);
    } else {
      setAlert(true);
    }
  };

  const handleButtonClick = () => {
    if (formData.title !== "") {
      setAlert(false);
      dispatch(addTodo(formData));
      setFormData(initialState);
    } else {
      setAlert(true);
    }
  };

  return (
    <Flex gap="middle" style={{ width: "50%" }}>
      <Flex gap="middle" vertical style={{ width: "100%" }}>
        <Input
          placeholder="Nhập nhiệm vụ"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          onPressEnter={handleAddTodo}
          autoFocus
          required
        />
        {alert && <span className="text-red-500">Vui lòng nhập nhiệm vụ</span>}
      </Flex>
      <Button type="primary" className="!w-fit" onClick={handleButtonClick}>
        Thêm nhiệm vụ
      </Button>
    </Flex>
  );
}
