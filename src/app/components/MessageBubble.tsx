"use client";

import React from "react";
import { auth } from "@/config/firebase";

export default function MessageBubble({ message }: { message: any }) {
  const me = auth.currentUser?.uid === message.sender;
  return (
    <div className={`flex ${me ? "justify-end" : "justify-start"} w-full`}>
      <div
        className={`
          max-w-[78%] px-4 py-2 rounded-2xl my-1 text-sm break-words
          ${me ? "bg-[#E1306C] text-white rounded-br-sm" : "bg-[#222226] text-gray-200 rounded-bl-sm"}
        `}
      >
        <div className="whitespace-pre-wrap">{message.text}</div>
        <div className={`text-[10px] mt-1 opacity-60 ${me ? "text-right" : "text-left"}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </div>
  );
}
