import React, { useState } from "react";
import config from "../lib/config";
import FacebookLink from "./FacebookLink";

export function SocialList({}) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div>
      <a
        title="Facebook"
        href={`https://www.facebook.com/groups/${config.facebook_group}`}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => {
          setIsHovering(true);
        }}
        onMouseLeave={() => {
          setIsHovering(false);
        }}
      >
        <FacebookLink active={isHovering} width={32} height={32} />
      </a>
      <style jsx>{`
        a {
          display: inline-block;
        }
        a:not(:last-child) {
          margin-right: 2em;
        }
      `}</style>
    </div>
  );
}
