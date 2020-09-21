import CreateNote from "../../components/create-note/CreateNote";
import { Todo } from "../../interfaces";
import { observer } from "mobx-react-lite";
import { NotesStore } from "../../mobx/NotesStore";
import { Result } from "antd";
import { WarningOutlined, SmileOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Button, Alert } from "../../styled-components";
import { useState } from "react";

const NewNote = observer(({ notesStore }: { notesStore: NotesStore }) => {
  const isAddAvailable = notesStore.isAddAvailable;
  const [alert, setAlert] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleSave = async ({
    title,
    todos,
  }: {
    title: string;
    todos: Todo[];
  }): Promise<void> => {
    try {
      setAlert("");
      const isSaveSuccess = await notesStore.addNote(title, todos);
      setSuccess(isSaveSuccess);
      if (!isSaveSuccess) {
        setAlert("something went wrong, note wasnt added...");
      } else {
        setAlert("Note Created Successfully !");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isAddAvailable && (
        <>
          {success ? (
            <>
              <Result
                icon={<SmileOutlined />}
                title="Well... seems like you got work to do !"
                extra={
                  <Button isRedirect>
                    <Link href="/">
                      <a>Back To Home Page</a>
                    </Link>
                  </Button>
                }
              />
              <Alert message={alert} type={"success"} />
            </>
          ) : (
            <CreateNote handleSave={handleSave}></CreateNote>
          )}
        </>
      )}{" "}
      {!isAddAvailable && (
        <>
          <Result
            icon={success ? <SmileOutlined /> : <WarningOutlined />}
            title={`${
              success ? "Note was created successfully, and " : ""
            }you have reached the maximum amounts of notes. total amount of notes alowed is 10.`}
            extra={
              <Button isRedirect>
                <Link href="/">
                  <a>Back To Home Page</a>
                </Link>
              </Button>
            }
          />
          {
            <Alert
              message={success ? alert : "Please delete a note "}
              type={success ? "success" : "error"}
            />
          }
        </>
      )}
    </>
  );
});

export default NewNote;
