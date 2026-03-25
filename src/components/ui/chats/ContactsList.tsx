import defaultImage from "@/public/assets/jpg/avatar.jpg";
import { useGetUsersContactsServiceQuery } from "@/src/services/react-query/chat/query/useUserContactsServiceQuery";
import type { checkUserTypes } from "@/src/utils/types/checkUserTypes";
import ChatSkeletons from "@/src/components/ui/skeletons/ChatSkeleton";
import { Link } from "react-router-dom";

const ContactsList = () => {
  const { data: contacts, isLoading } = useGetUsersContactsServiceQuery();

  if (isLoading) {
    return <ChatSkeletons />;
  }

  const lastItem = contacts.length - 1;

  return (
    <>
      {contacts.map((contact: checkUserTypes, index: number) => (
        <Link
          to={`/messages/${contact._id}`}
          key={contact._id}
          className={`py-2 px-6 flex gap-2 items-center border-b ${
            index === lastItem ? "border-b-0" : ""
          } border-zinc-800 hover:bg-zinc-800 cursor-pointer transition-colors duration-200`}
        >
          <img
            src={contact.profilePic || defaultImage}
            alt="avatar"
            className="w-12 h-12 rounded-full"
          />
          <h3>{contact.username}</h3>
        </Link>
      ))}
      {contacts.length === 0 && (
        <div className="py-4 px-6 text-center text-zinc-500">
          <h3>No contacts yet.</h3>
        </div>
      )}
    </>
  );
};

export default ContactsList;
