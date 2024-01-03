import React, { useState } from "react";
import Modal from "../ui/Modal";
import Exit from "@/assets/icons/Exit.svg";
import SearchInput from "../ui/SearchInput";
import { UserData } from "@/types";
import SearchResultSkeleton from "../ui/SearchResultSkeleton";
import { Avatar } from "@mui/material";
import { useAuthContext } from "@/contexts/AuthContext";
import startConversation from "@/firebase/startConversation";
import { useRouter } from "next/navigation";

const SendMessageModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}) => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([{} as UserData]);
  const [isStarting, setIsStarting] = useState(false);
  const { userData } = useAuthContext();
  const router = useRouter();
  const startConv = async (userId: string) => {
    setIsStarting(true);
    const conversationLink = await startConversation([
      userId,
      userData?.userId || "",
    ]);
    if (conversationLink) {
      router.push(`/messages/${conversationLink}`);
      setSearch("");
      setIsOpen(false);
    }
    setIsStarting(false);
  };
  return (
    <Modal
      open={isOpen}
      setOpen={setIsOpen}
      className="w-full mx-2 md:w-[548px] h-[60%] "
    >
      <div className="flex items-center border-b border-[#373737] p-4">
        <span className="w-full text-center text-lg font-semibold">
          New message
        </span>
        <Exit className="cursor-pointer" onClick={() => setIsOpen(false)} />
      </div>
      <div className="flex items-center px-3 border-b border-[#373737]">
        <span className="text-lg font-semibold">To: </span>
        <SearchInput
          searchValue={search}
          setSearch={setSearch}
          setIsLoading={setIsLoading}
          setResults={setResults}
        />
      </div>
      <div className="p-4">
        {results &&
          results.map((result) => (
            <button
              key={result.userId}
              className="flex w-full gap-4 items-center hover:bg-[#F2F2F2] dark:hover:bg-[#1A1A1A] p-2 rounded-md"
              onClick={() => startConv(result.userId)}
            >
              <Avatar src={result.profileImage} className="w-12 h-12" />
              <div className="flex flex-col">
                <span>{result.userName}</span>
                <span className="text-[#A8A8A8]">{result.fullName}</span>
              </div>
            </button>
          ))}
        {isLoading && (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <SearchResultSkeleton key={i} />
            ))}
          </div>
        )}
        {!isLoading && !results.length && (
          <span className="text-[#737373] dark:text-[#A8A8A8]">
            No account found.
          </span>
        )}
      </div>
    </Modal>
  );
};

export default SendMessageModal;
