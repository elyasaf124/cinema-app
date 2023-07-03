import React from "react";
import { useDispatch } from "react-redux";
import { setDisplayYouTube } from "../../features/showTimeSlice";
import YoutubeEmbed from "../../youtube/Youtube";
import "./ytModel.css";

interface YoutubeEmbedProps {
  embedId: string;
}

const YtModel = ({ embedId }: YoutubeEmbedProps) => {
  const dispatch = useDispatch();

  return (
    <div className="ytModel" onClick={() => dispatch(setDisplayYouTube(""))}>
      <div className="ytModel-container">
        <div className="content">
          <YoutubeEmbed embedId={embedId} />
        </div>
      </div>
    </div>
  );
};

export default YtModel;
