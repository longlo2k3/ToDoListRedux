import { nanoid } from "@reduxjs/toolkit";
import { ToDo } from "../types/Todo.type";

export const initialToDoList: ToDo[] = [
  {
    id: nanoid(),
    title: "Hoàn thành báo cáo dự án",
    checked: false,
  },
  {
    id: nanoid(),
    title: "Họp team 9:00 AM",
    checked: false,
  },
  {
    id: nanoid(),
    title: "Đi mua sắm cuối tuần",
    checked: false,
  },
  {
    id: nanoid(),
    title: "Đọc sách 1 tiếng",
    checked: false,
  },
  {
    id: nanoid(),
    title: "Tập thể dục buổi sáng",
    checked: false,
  },
  {
    id: nanoid(),
    title: "Gọi điện cho gia đình",
    checked: false,
  },
  {
    id: nanoid(),
    title: "Chuẩn bị tài liệu cho meeting",
    checked: false,
  },
  {
    id: nanoid(),
    title: "Học React 2 tiếng",
    checked: false,
  },
  {
    id: nanoid(),
    title: "Nộp báo cáo thuế",
    checked: false,
  },
  {
    id: nanoid(),
    title: "Lên kế hoạch cho tuần tới",
    checked: false,
  },
];
