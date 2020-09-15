import CreateTodo from "../../components/CreateTodo";
import TodoList from "../../components/TodoList";
import CreateNoteTitle from "../../components/CreateNoteTitle";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { CreateNewNote } from "../../api";
import { useRouter } from "next/router";
import { useRootStore } from "../../context/RootStateContext";
import { useObserver } from "mobx-react-lite";
import { NotesStore } from "../../mobx/NotesStore";
import { toJS } from "mobx";

const Box = styled.div`
  background: #f0f2f5;
  color: black;
  width: 100%;
  height: 170px;

  h2,
  h4 {
    color: black;
    margin: 0;
    padding: 10px 10px 10px 0px;
  }
`;

const Button = styled.button`
  color: white;
  background: dodgerblue;
  font-size: 14px;
  font-weight: 600;
  border: none;
  padding: 5px;
  border-radius: 6px;
  margin-left: 15px;
  cursor: pointer;
`;

export interface INotes {
  title: string;
  todos: {
    description: string;
    checked: boolean;
  }[];
}

const NewNote = ({ notesStore }) => {
  return useObserver(() => {
    const [error, setError] = useState("");
    const [title, setTitle] = useState<string>("");
    const [todos, setTodos] = useState<INotes["todos"]>([]);
    const router = useRouter();

    const handleRemoveTodo = (index: number) => {
      setTodos((prev) => {
        const newTodos = [...prev];
        newTodos.splice(index, 1);
        return newTodos;
      });
    };

    const handleSave = async () => {
      debugger;
      const newNote = { title, todos };
      try {
        await CreateNewNote(title, todos);
        debugger;
        router.push("/");
      } catch (error) {
        debugger;
        console.log(error);
        // setError(error.data.msg);
      }
    };

    return (
      <Box>
        {error && <div>{error}</div>}
        <h2>Set a title for your note</h2>

        <CreateNoteTitle
          setTitle={setTitle}
          notesStore={notesStore}
        ></CreateNoteTitle>
        {title && (
          <>
            <h1>{title}</h1>
            <CreateTodo setTodos={setTodos} />
          </>
        )}
        <TodoList handleRemoveTodo={handleRemoveTodo} todos={todos} />
        {todos.length > 0 && <Button onClick={handleSave}>Save</Button>}
      </Box>
    );
  });
};

export default NewNote;

//   const [items, setItems] = useState([]);
//   const [form, setForm] = useState({ title: ``, description: [] });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [errors, setErrors] = useState({});
//   const router = useRouter();

//   useEffect(()=>{
//       console.log('printing items')
//       console.log(items);
//   },[items])

//   const onFinish = (values) => {
//     console.log("Success:", values);
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//       <h1>Create Note</h1>

//       <Form
//         {...layout}
//         name="basic"
//         initialValues={{
//           remember: true,
//         }}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//       >
//         <Form.Item
//           label="Title"
//           name="username"
//           rules={[
//             {
//               required: true,
//               message: "Please input a note title!",
//             },
//           ]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item {...tailLayout}>{DynamicFieldSet({ setItems })}</Form.Item>
//       </Form>

// const layout = {
//     labelCol: {
//       span: 8,
//     },
//     wrapperCol: {
//       span: 16,
//     },
//   };
//   const tailLayout = {
//     wrapperCol: {
//       offset: 8,
//       span: 16,
//     },
//   };

//   const formItemLayout = {
//     labelCol: {
//       xs: { span: 24 },
//       sm: { span: 4 },
//     },
//     wrapperCol: {
//       xs: { span: 24 },
//       sm: { span: 20 },
//     },
//   };

//   const formItemLayoutWithOutLabel = {
//     wrapperCol: {
//       xs: { span: 24, offset: 0 },
//       sm: { span: 20, offset: 4 },
//     },
//   };
//   const DynamicFieldSet = ({ setItems }) => {
//     return (
//       <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel}>
//         <Form.List name="names">
//           {(fields, { add, remove }) => {
//             const onSubmit = () => {
//               setItems(fields);
//             };
//             return (
//               <div>
//                 {
//                 fields.map((field, index) => (
//                   <Form.Item
//                     {...(index === 0
//                       ? formItemLayout
//                       : formItemLayoutWithOutLabel)}
//                     label={index === 0 ? "todo" : ""}
//                     required={false}
//                     key={field.key}
//                   >
//                     <Form.Item
//                       {...field}
//                       validateTrigger={["onChange", "onBlur"]}
//                       rules={[
//                         {
//                           required: true,
//                           whitespace: true,
//                           message: "Please input a todo or delete this field.",
//                         },
//                       ]}
//                       noStyle
//                     >
//                       <Input style={{ width: "60%" }} on />
//                     </Form.Item>
//                     {fields.length > 1 ? (
//                       <MinusCircleOutlined
//                         className="dynamic-delete-button"
//                         style={{ margin: "0 8px" }}
//                         onClick={() => {
//                           remove(field.name);
//                         }}
//                       />
//                     ) : null}
//                   </Form.Item>
//                 ))}
//                 <Form.Item>
//                   <Button
//                     type="dashed"
//                     onClick={() => {
//                       add();
//                     }}
//                     style={{ width: "60%" }}
//                   >
//                     <PlusOutlined /> Add a todo
//                   </Button>
//                   <Button
//                     type="dashed"
//                     onClick={() => {
//                       add("", 0);
//                     }}
//                     style={{ width: "60%", marginTop: "20px" }}
//                   >
//                     <PlusOutlined /> Add a todo at head
//                   </Button>
//                 </Form.Item>
//                 <Button onClick={onSubmit} type="primary" htmlType="submit">
//                   Submit
//                 </Button>
//               </div>
//             );
//           }}
//         </Form.List>
//       </Form>
//     );
//   };
