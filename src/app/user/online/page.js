"use client";
import { useState } from "react";
import VideoCall from "@/components/User/VideoCall";
import Sidebar from "@/components/User/Sidebar";

export default function Online() {
  const [meetingLink, setMeetingLink] = useState("");

  const handleJoinMeeting = () => {
    console.log(`Joining meeting with link: ${meetingLink}`);
  };

  return (
    <div className="flex min-h-screen mt-12 mx-32">
      <Sidebar />
      <div className="join-meeting-container">
        <h1>Join Meeting</h1>
        <input
          type="text"
          placeholder="Enter meeting link"
          value={meetingLink}
          onChange={(e) => setMeetingLink(e.target.value)}
        />
        <button onClick={handleJoinMeeting}>Join</button>
        <VideoCall meetingLink={meetingLink} />
      </div>
    </div>
  );
}
