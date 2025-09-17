import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Mic, Smile, StopCircle, X } from "lucide-react";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";

import Kunaiicon from "./Kunaiicon"; 

// Sub-component for a cleaner structure
const ImagePreview = ({ image, onRemove }) => (
  <div className="mb-4 relative w-24 h-24">
    <img
      src={image}
      alt="Selected preview"
      className="w-full h-full object-cover rounded-lg border-2 border-neutral"
    />
    <button
      onClick={onRemove}
      className="btn btn-circle btn-xs btn-error absolute -top-2 -right-2"
      type="button"
    >
      <X size={12} />
    </button>
  </div>
);

const MessageInput = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const { sendMessage, sendVoiceMessage } = useChatStore(); // Assuming sendVoiceMessage exists in your store

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed, shinobi!");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText && !image) return;

    try {
      await sendMessage({ text: trimmedText, image });
      setText("");
      removeImage();
    } catch (error) {
      toast.error("Failed to send message scroll.");
    }
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const audioChunks = [];

      mediaRecorder.ondataavailable = (event) => audioChunks.push(event.data);
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        sendVoiceMessage(audioBlob); // Send blob to your store
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      toast.error("Microphone access denied.");
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const onEmojiClick = (emojiObject) => {
    setText((prevText) => prevText + emojiObject.emoji);
  };

  return (
    <div className="p-4 bg-base-100 border-t-2 border-neutral relative">
      {showPicker && (
        <div className="absolute bottom-full mb-2 right-4">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}

      {image && <ImagePreview image={image} onRemove={removeImage} />}

      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        {/* Hidden File Input */}
        <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageChange} />

        {/* Emoji Button */}
        <button type="button" className="btn btn-circle btn-ghost" onClick={() => setShowPicker(!showPicker)}>
          <Smile />
        </button>
        
        {/* Image Upload Button */}
        <button type="button" className="btn btn-circle btn-ghost" onClick={() => fileInputRef.current?.click()}>
          <Image />
        </button>

        {/* Text Input / Recording Indicator */}
        <div className="w-full">
            {isRecording ? (
                <div className="input input-bordered rounded-full flex items-center justify-center gap-2">
                    <div className="size-2 rounded-full bg-error animate-pulse" />
                    <span className="text-sm font-ninja">Recording audio mission...</span>
                </div>
            ) : (
                <input
                    type="text"
                    className="input input-bordered w-full rounded-full font-ninja"
                    placeholder="Compose your mission report..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            )}
        </div>

        {/* Send / Voice Message Button */}
        {text.trim() || image ? (
          <button type="submit" className="btn btn-circle btn-primary" disabled={!text.trim() && !image}>
            <Kunaiicon />
          </button>
        ) : (
          <button
            type="button"
            className={`btn btn-circle ${isRecording ? "btn-error" : "btn-primary"}`}
            onMouseDown={handleStartRecording}
            onMouseUp={handleStopRecording}
            onTouchStart={handleStartRecording} // For mobile
            onTouchEnd={handleStopRecording}   // For mobile
          >
            {isRecording ? <StopCircle /> : <Mic />}
          </button>
        )}
      </form>
    </div>
  );
};

export default MessageInput;