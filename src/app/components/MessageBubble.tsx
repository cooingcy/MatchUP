import { auth } from "@/config/firebase";

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: any;
}

export default function MessageBubble({ message }: { message: Message }) {
  const isOwn = message.sender === auth.currentUser?.uid;

  const getTimestamp = () => {
    if (message.timestamp?.toDate) {
      return message.timestamp.toDate();
    }
    return new Date(message.timestamp);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4 group`}
    >
      <div
        className={`
          max-w-xs lg:max-w-md px-4 py-3 rounded-2xl relative
          transition-all duration-300 transform group-hover:scale-[1.02]
          ${
            isOwn
              ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-br-none shadow-lg"
              : "bg-[#2a2a2d] text-white rounded-bl-none border border-white/10 shadow-lg"
          }
        `}
      >
        <p className="text-sm leading-relaxed break-words">{message.text}</p>

        <p
          className={`text-xs mt-2 flex items-center gap-1 ${
            isOwn ? "text-pink-200" : "text-gray-400"
          }`}
        >
          <span>{formatTime(getTimestamp())}</span>

          {isOwn && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
          )}
        </p>

        <div
          className={`
          absolute top-0 w-3 h-3
          ${
            isOwn
              ? "right-0 transform translate-x-1 -rotate-45 bg-purple-600"
              : "left-0 transform -translate-x-1 -rotate-45 bg-[#2a2a2d] border-l border-b border-white/10"
          }
        `}
        />
      </div>
    </div>
  );
}
