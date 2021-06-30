import React, { useState } from "react";
import Image from "next/image";
import Facebook from "../assets/svg/facebook-alt-bw.svg";
import FacebookColor from "../assets/svg/facebook-alt-color.svg";
import config from "../lib/config";

export function SocialList({}) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div>
      <a
        title="Facebook"
        href={`https://www.facebook.com/groups/${config.facebook_group}`}
        target="_blank"
        rel="noopener"
        onMouseEnter={() => {
          setIsHovering(true);
        }}
        onMouseLeave={() => {
          setIsHovering(false);
        }}
      >
        {
          isHovering
            ? <FacebookColor width={32} height={32} />
            : <Facebook width={32} height={32} />
        }
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
