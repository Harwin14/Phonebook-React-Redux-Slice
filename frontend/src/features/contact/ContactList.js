import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ContactItem from "../../components/ContactItem";
import {
  readContactAsync,
  selectContact,
  deleteContactAsync,
  createContactAsync,
  updateContactAsync,
  pagination,
} from "./contactSlice";

export default function ContactList(props) {
  // const [showBox, setShowBox] = useState(true);

  // const showConfirmDialog = () => {
  //   return Alert.alert(
  //     "Are your sure?",
  //     "Are you sure you want to remove this beautiful box?",
  //     [
  //       // The "Yes" button
  //       {
  //         text: "Yes",
  //         onPress: () => {
  //           setShowBox(false);
  //         },
  //       },
  //       // The "No" button
  //       // Does nothing but dismiss the dialog when tapped
  //       {
  //         text: "No",
  //       },
  //     ]
  //   );
  // };
  const contacts = useSelector(selectContact);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readContactAsync());
  }, [dispatch]);

  const scrolling = (event) => {
    var element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
console.log('sampe');
      dispatch(pagination());
    }
  };

  return (
    <div
      onScroll={scrolling}
      style={{ overflowY: "scroll", height: 450 }}
      className="card-b shadow mt-5 mx-auto row row-cols "
    >
      {contacts.map((user) => (
        <ContactItem
          key={user.id}
          cols
          contact={user}
          sent={user.sent}
          remove={() => dispatch(deleteContactAsync(user.id))}
          resend={() =>
            dispatch(
              createContactAsync({
                id: user.id,
                name: user.name,
                phone: user.phone,
              })
            )
          }
          update={(name, phone) =>
            dispatch(updateContactAsync({ id: user.id, name, phone }))
          }
        />
      ))}
    </div>
  );
}
