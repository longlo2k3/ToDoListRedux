import { useDispatch, useSelector } from "react-redux";
import {
  deleteMultiple,
  deleteTodo,
  finishEditToDo,
  selectTodos,
} from "../ToDo.slice";
import { ToDo } from "../../types/Todo.type";
import React, { useState } from "react";
import { Table, Space, Input, Form, Button, Flex } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import CreateTodo from "../createTodo";

export function TodoList() {
  const todoList = useSelector(selectTodos);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: ToDo) => record.id === editingKey;

  const edit = (record: ToDo) => {
    form.setFieldsValue({ title: record.title });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (id: string) => {
    try {
      const row = await form.validateFields();
      dispatch(
        finishEditToDo({
          id,
          title: row.title,
          checked: todoList.find((todo) => todo.id === id)?.checked || false,
        })
      );
      setEditingKey("");
    } catch (err) {
      console.log("Lỗi:", err);
    }
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<ToDo> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const handleDeleteSelected = () => {
    dispatch(deleteMultiple(selectedRowKeys as string[]));
    setSelectedRowKeys([]);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      editable: true,
      render: (_, record: ToDo) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name="title"
            style={{ margin: 0 }}
            rules={[{ required: true, message: "Hãy nhập tiêu đề!" }]}
          >
            <Input
              onPressEnter={() => save(record.id)}
              onBlur={() => save(record.id)}
              autoFocus
            />
          </Form.Item>
        ) : (
          <span className="!hover:cursor-point" onClick={() => edit(record)}>
            {record.title}
          </span>
        );
      },
    },
    {
      title: "Actions",
      render: (_, record: ToDo) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button type="link" onClick={() => save(record.id)}>
              Lưu
            </Button>
            <Button type="link" onClick={cancel}>
              Hủy
            </Button>
          </Space>
        ) : (
          <Space>
            <Button type="link" onClick={() => edit(record)}>
              Chỉnh sửa
            </Button>
            <Button
              type="link"
              danger
              onClick={() => dispatch(deleteTodo(record.id))}
            >
              Xóa
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <Flex gap="middle" vertical>
      <Flex justify="space-between" align="center" wrap gap="small">
        <Button
          type="primary"
          className="!w-fit"
          danger
          onClick={() => handleDeleteSelected()}
          disabled={!hasSelected}
        >
          Xóa
        </Button>
        <CreateTodo />
      </Flex>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: ({ children, record, dataIndex, ...restProps }) => {
                const editable = columns.find(
                  (col) => col.dataIndex === dataIndex
                )?.editable;
                return editable ? (
                  <td {...restProps}>
                    {isEditing(record) ? (
                      children
                    ) : (
                      <span onClick={() => edit(record)}>{children}</span>
                    )}
                  </td>
                ) : (
                  <td {...restProps}>{children}</td>
                );
              },
            },
          }}
          bordered
          dataSource={todoList}
          rowSelection={rowSelection}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 8 }}
          scroll={{ x: 400, y: 300 }}
        />
      </Form>
    </Flex>
  );
}
