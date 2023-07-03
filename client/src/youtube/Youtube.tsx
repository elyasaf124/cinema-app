import React from "react";
import PropTypes from "prop-types";
import "./youtube.css";

interface YoutubeEmbedProps {
  embedId: string;
}
const YoutubeEmbed = ({ embedId }: YoutubeEmbedProps) => {
  console.log(embedId);
  return (
    <div className="video-responsive">
      <iframe
        width="1100"
        height="700"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
