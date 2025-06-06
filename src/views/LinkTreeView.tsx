import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { updateProfile } from "../api/DevTreeAPI";
import DevTreeInput from "../components/DevTreeInput";
import { social } from "../data/social";
import type { DevTreeLink, SocialNetwork, User } from "../types";
import { isValidUr } from "../utils";

const LinkTreeView = () => {
  const [devTreeLinks, setDevTreeLinks] =
    useState<(DevTreeLink | SocialNetwork)[]>(social);

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
      const updatedData = prev.map((item) => {
        const userLink: SocialNetwork = JSON.parse(user.links).find(
          (link: SocialNetwork) => link.name === item.name,
        );
        if (userLink) {
          const id = userLink.id ? { id: userLink.id } : {};
          return {
            ...item,
            ...id,
            url: userLink.url,
            enabled: userLink.enabled,
          };
        } else {
          return item;
        }
      });
      return updatedData;
    });
  }, [user.links]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const validUrl = isValidUr(value);
    const updatedLinks = devTreeLinks.map((link) =>
      link.name === e.target.name
        ? {
            ...link,
            url: value,
            enabled: value && validUrl ? link.enabled : false,
          }
        : link,
    );

    setDevTreeLinks(updatedLinks);

    queryClient.setQueryData(["user"], (oldUser: User) => ({
      ...oldUser,
      links: JSON.stringify(updatedLinks),
    }));
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
        } else if (
          link.id > indexToUpdate &&
          indexToUpdate !== 0 &&
          link.id === 1
        ) {
          return {
            ...link,
            id: link.id - 1,
          };
        } else {
          return link;
        }
      });
    }

    setDevTreeLinks(updatedItems.sort((a, b) => a.order - b.order));
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
          className="bg-cyan-400 hover:bg-cyan-500 active:bg-cyan-600 p-2 text-lg w-full uppercase text-slate-600 hover:text-slate-700 rounded-lg font-bold cursor-pointer"
          onClick={() => mutate(queryClient.getQueryData(["user"])!)}
        >
          Save changes
        </button>
      </div>
    </>
  );
};

export default LinkTreeView;
