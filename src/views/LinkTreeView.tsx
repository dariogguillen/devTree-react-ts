import { useState } from "react";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { isValidUr } from "../utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/DevTreeAPI";
import type { User } from "../types";

const LinkTreeView = () => {
  const [devTreeLinks, setDevTreeLinks] = useState(social);

  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(["user"])!;

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
  });

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTreeLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link,
    );
    setDevTreeLinks(updatedLinks);
  };

  const handleEnableLink = (socialNetwork: string) => {
    const updatedLinks = devTreeLinks.map((link) => {
      if (link.name === socialNetwork) {
        if (isValidUr(link.url)) {
          return { ...link, enabled: !link.enabled };
        } else {
          toast.error("Please enter a valid URL");
          return link;
        }
      } else {
        return link;
      }
    });

    setDevTreeLinks(updatedLinks);

    queryClient.setQueryData(["user"], (oldUser: User) => {
      return {
        ...oldUser,
        links: JSON.stringify(updatedLinks),
      };
    });
  };

  return (
    <>
      <div className="space-y-5">
        {devTreeLinks.map((link) => (
          <DevTreeInput
            key={link.name}
            item={link}
            handleUrlChange={handleUrlChange}
            handleEnableLink={handleEnableLink}
          />
        ))}
        <button
          className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold"
          onClick={() => mutate(user)}
        >
          Save changes
        </button>
      </div>
    </>
  );
};

export default LinkTreeView;
