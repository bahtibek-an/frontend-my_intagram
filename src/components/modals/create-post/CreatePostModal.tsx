import Modal from "@/components/ui/Modal";
import React, { useEffect, useState } from "react";
import Drag from "@/assets/icons/DragPost.svg";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Image from "next/image";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { useMutation } from "@tanstack/react-query";
import { sharePost } from "@/firebase/sharePost";
import Emoji from "@/assets/icons/Emoji.svg";
import { ClickAwayListener } from "@mui/material";
import { useAuthContext } from "@/contexts/AuthContext";
const CreatePostModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (arg: boolean) => void;
}) => {
  const { userData } = useAuthContext();
  const [files, setFiles] = useState<File[] | []>([]);
  const [previewFiles, setPreviewFiles] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [isDragOver, setIsDragOver] = useState(false);
  const [caption, setCaption] = useState("");
  const [isEmojiPicker, setIsEmojiPicker] = useState(false);
  const acceptedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "video/mp4",
    "video/mov",
    "video/avi",
    "video/mkv",
  ];
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const fileList = e.dataTransfer.files;
    if (fileList.length) {
      for (let i = 0; i < fileList.length; i++) {
        if (fileList[i] && acceptedTypes.includes(fileList[i].type)) {
          setFiles((prevFiles) => [...prevFiles, fileList[i]]);
        }
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDragOver(false);
    const fileList = e.target.files;
    if (fileList?.length) {
      for (let i = 0; i < fileList.length; i++) {
        if (fileList[i] && acceptedTypes.includes(fileList[i].type)) {
          setFiles((prevFiles) => [...prevFiles, fileList[i]]);
        }
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };
  useEffect(() => {
    if (files.length) {
      files.map((file) => {
        setPreviewFiles((prevFiles) => [
          ...prevFiles,
          URL.createObjectURL(file),
        ]);
      });
      setStep(2);
    }
    if (!files.length) {
      setStep(1);
    }
  }, [files]);
  const { mutate, isLoading } = useMutation({
    mutationKey: ["publish-post"],
    mutationFn: () =>
      sharePost({
        files: files,
        caption: caption,
        userId: userData?.userId || "",
      }),
    onSuccess: () => setOpen(false),
  });
  return (
    <Modal
      open={open}
      setOpen={setOpen}
      className="w-full sm:w-[430px] lg:w-[600px] xl:w-[720px] 2xl:w-[850px]"
      loading={isLoading}
    >
      <div className="border-b p-2 flex">
        <h1 className="font-semibold mx-auto text-xl text-center">
          Create new post
        </h1>
        {step == 2 && (
          <button
            className="text-blue font-semibold hover:text-sky-800 active:opacity-60"
            onClick={() => mutate()}
            disabled={isLoading}
          >
            Share
          </button>
        )}
      </div>
      {step == 1 && (
        <div
          className={`h-[72vh] aspect-square w-full flex items-center justify-center ${
            isDragOver ? "bg-gray-400" : ""
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="flex flex-col gap-4 items-center">
            <Drag />
            <span className="text-center text-2xl">
              Drag photos and videos here
            </span>
            <label
              htmlFor="files"
              className="bg-blue cursor-pointer text-white py-2 px-3 hover:bg-sky-600 font-semibold rounded-md"
            >
              Select from computer
            </label>
            <input
              accept="image/jpeg, image/png, image/gif, video/*"
              type="file"
              name="files"
              id="files"
              hidden
              onChange={handleFileInputChange}
              multiple={true}
            />
          </div>
        </div>
      )}
      {step == 2 && (
        <div className="flex items-center justify-center">
          <div className=" w-full flex flex-col lg:flex-row gap-2">
            <Splide className="w-full h-full lg:w-2/3">
              {previewFiles.map((file, i) => (
                <SplideSlide
                  key={i}
                  className="aspect-square relative bg-gray-100 "
                >
                  <Image
                    src={file}
                    alt={`Image ${i + 1}`}
                    fill={true}
                    priority={true}
                    className="object-contain"
                    sizes="100%"
                  />
                </SplideSlide>
              ))}
            </Splide>
            <div className="w-full relative flex flex-col lg:w-1/3 lg:pb-2 max-h-64 lg:border-b p-1 py-2">
              <textarea
                className="w-full h-60 resize-none outline-none"
                value={caption}
                placeholder="Write a caption..."
                onChange={(e) => setCaption(e.target.value)}
              ></textarea>
              <div className="ml-auto" onClick={() => setIsEmojiPicker(true)}>
                <Emoji className="cursor-pointer hover:opacity-80 active:opacity-60" />
              </div>
              {isEmojiPicker && (
                <ClickAwayListener
                  onClickAway={() => {
                    setIsEmojiPicker(false);
                  }}
                >
                  <div className="absolute left-11">
                    <EmojiPicker
                      emojiStyle={EmojiStyle.FACEBOOK}
                      onEmojiClick={(emoji) =>
                        setCaption(`${caption}${emoji.emoji}`)
                      }
                    />
                  </div>
                </ClickAwayListener>
              )}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CreatePostModal;
