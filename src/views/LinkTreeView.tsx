import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { updateProfile } from "../api/DevTreeAPI";
import DevTreeInput from "../components/DevTreeInput";
import { social } from "../data/social";
import type { SocialNetwork, User } from "../types";
import { isValidUr } from "../utils";

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

  useEffect(() => {
    setDevTreeLinks((prev) => {
      const updatedDate = prev.map((item) => {
        const userLink = JSON.parse(user.links).find(
          (link: SocialNetwork) => link.name === item.name,
        );
        if (userLink) {
          return { ...item, url: userLink.url, enabled: userLink.enabled };
        } else {
          return item;
        }
      });
      return updatedDate;
    });
  }, [user.links]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTreeLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link,
    );

    setDevTreeLinks(updatedLinks);
  };

  const links: SocialNetwork[] = JSON.parse(user.links);

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

    let updatedItems: SocialNetwork[] = [];

    const selectedSocialNetwork = updatedLinks.find(
      (link) => link.name === socialNetwork,
    );

    if (selectedSocialNetwork?.enabled) {
      const id = links.filter((link) => link.id).length + 1;
      if (links.some((link) => link.name === socialNetwork)) {
        updatedItems = links.map((link) => {
          if (link.name === socialNetwork) {
            return {
              ...link,
              enabled: true,
              id,
            };
          } else {
            return link;
          }
        });
      } else {
        const newItem = {
          ...selectedSocialNetwork,
          id,
        };
        updatedItems = [...links, newItem];
      }
    } else {
      const indexToUpdate = links.findIndex(
        (link) => link.name === socialNetwork,
      );

      updatedItems = links.map((link) => {
        if (link.name === socialNetwork) {
          return {
            ...link,
            id: 0,
            enabled: false,
          };
        } else if (link.id > indexToUpdate) {
          return {
            ...link,
            id: link.id - 1,
          };
        } else {
          return link;
        }
      });
    }

    queryClient.setQueryData(["user"], (oldUser: User) => {
      return {
        ...oldUser,
        links: JSON.stringify(updatedItems),
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
