import { useObserver } from "mobx-react-lite";
import { useStore } from "../../context/StoreContext";
import EditNote, { Todos } from "../../components/create-note/CreateNote";
import { createNewNote } from "../../api";

const NewNote = () => {
  const notesStore = useStore();

  return useObserver(() => {
    const handleSave = async ({
      title,
      todos,
    }: {
      title: string;
      todos: Todos[];
    }) => {
      debugger;
      const newNote = { title, todos };
      try {
        await createNewNote(title, todos);
      } catch (error) {
        console.log(error);
        // setError(error.data.msg);
      }
    };

    return <EditNote handleSave={handleSave} type="create"></EditNote>;
  });
};

export default NewNote;
