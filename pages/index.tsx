import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("notesStore")
@observer
class SampleComponent extends Component {
  static async getInitialProps({ mobxStore, query }) {
    await mobxStore.notesStore.fetch();
    const value = mobxStore.notesStore.getUncompletedTasks(
      mobxStore.notesStore.notes[2]
    );
    return { notesStore: mobxStore.notesStore, value };
  }

  render() {
    const { notesStore, value }: any = this.props;
    debugger;
    return (
      <div>
        {/* <h1>{notesStore.getUncompletedTasks(notesStore.notes[0])}</h1> */}
        {/* <h1>{notesStore.testArrayLength}</h1> */}
      </div>
    );
  }
}

export default SampleComponent;

// import Link from "next/link";
import { Button, Skeleton, Card, Col, Row } from "antd";
import styled from "styled-components";
// import { fetchNotes } from "../api";
// import moment from "moment";
// import "moment-timezone";
// import { useObserver, observer } from "mobx-react-lite";
// import { useEffect } from "react";
// import { INotes, NotesStore } from "../mobx/NotesStore";
// import { inject } from "mobx-react";

const CardStyled = styled(Card)`
  margin-top: 5rem;
  width: 80%;
`;

export const ButtonStyled = styled(Button)`
  width: 30%;
`;

// const Test = inject("notesStore")(
//   observer((props: Props) => {
//     const { notesStore } = props;
//     const number = notesStore.test;
//     return <div>{notesStore.test}</div>;
//   })
// );

// type Props = {
//   processedResponse: any;
//   notesStore: any;
// };

// const HomePage = inject("notesStore")(
//   observer((props: Props) => {
//     const getRecentUpdateDate = (note) => {
//       return Math.max.apply(
//         Math,
//         note.todos.map((note) => {
//           return note.updatedAt;
//         })
//       );
//     };

//     const { notesStore } = props;
//     return (
//       <div className="site-card-wrapper">
//         {notesStore.notes && notesStore.notes.length > 0 ? (
//           <Row gutter={16}>
//             {notesStore.notes.map((note) => {
//               const createdAt = notesStore.test;
//               const updatedAt = moment
//                 .unix(getRecentUpdateDate(note))
//                 .format("MM/DD/YYYY hh:mm A");
//               return (
//                 <Col key={note.title} span={8}>
//                   <CardStyled title={note.title} bordered={false}>
//                     {console.log("nodeStore===", notesStore)}
//                     <span>test :{notesStore.test}</span> <br />
//                     <span>updated : {updatedAt}</span>
//                     <br />
//                     <br />
//                     <ButtonStyled type="primary">
//                       <Link href={`/note/${note._id}`}>
//                         <a>View</a>
//                       </Link>
//                     </ButtonStyled>
//                     <br />
//                     <br />
//                     <ButtonStyled type="primary">
//                       <Link href={`/${note._id}/edit`}>
//                         <a>Edit</a>
//                       </Link>
//                     </ButtonStyled>
//                   </CardStyled>
//                 </Col>
//               );
//             })}
//           </Row>
//         ) : (
//           <div>
//             You have no notes to display. <br />
//             to create a new note <br />
//             <Button type="primary">
//               <Link href="/note/create-note">
//                 <a>click here !</a>
//               </Link>
//             </Button>
//           </div>
//         )}
//       </div>
//     );
//   })
// );

// // ({ processedResponse, notesStore }) => {
// //   const getRecentUpdateDate = (note) => {
// //     return Math.max.apply(
// //       Math,
// //       note.todos.map((note) => {
// //         return note.updatedAt;
// //       })
// //     );
// //   };

// // return useObserver(() => {

// // });
// // };

// // Index.getInitialProps = async () => {
// //   const processedResponse = await fetchNotes();
// //   console.log(JSON.stringify(processedResponse));
// //   return { processedResponse };
// // };

// export default HomePage;
