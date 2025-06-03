import { useState } from "react";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";

const LinkTreeView = () => {
  const [devTreeLinks, setDevTreeLinks] = useState(social);

  return (
    <>
      <div className="space-y-5">
        {devTreeLinks.map((link) => (
          <DevTreeInput
            key={link.name}
            item={link}
          />
        ))}
      </div>
    </>
  );
};

export default LinkTreeView;
