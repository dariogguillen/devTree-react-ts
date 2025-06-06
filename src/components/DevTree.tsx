import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import type { SocialNetwork, User } from "../types";
import DevTreeLink from "./DevTreeLink";
import NavigationTabs from "./NavigationTabs";
import { useQueryClient } from "@tanstack/react-query";
import Header from "./Header";

const DevTree = ({ data }: { data: User }) => {
  const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(
    JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled),
  );

  useEffect(() => {
    setEnabledLinks(
      JSON.parse(data.links).filter((link: SocialNetwork) => link.enabled),
    );
  }, [data]);

  const queryClient = useQueryClient();

  const handleDragEnd = (e: DragEndEvent) => {
    if (e.over && e.over.id) {
      const prevIndex = enabledLinks.findIndex(
        (link) => link.id === e.active.id,
      );
      const newIndex = enabledLinks.findIndex((link) => link.id === e.over?.id);

      const order = arrayMove(enabledLinks, prevIndex, newIndex);
      setEnabledLinks(order);
      const disabledLinks = JSON.parse(data.links).filter(
        (link: SocialNetwork) => !link.enabled,
      );
      queryClient.setQueryData(["user"], (prev: User) => {
        return {
          ...prev,
          links: JSON.stringify([...order, ...disabledLinks]),
        };
      });
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100  min-h-screen min-w-[455px] py-10">
        <main className="mx-auto max-w-5xl p-10 md:p-0">
          <NavigationTabs />
          <div className="flex justify-end">
            <Link
              className="font-bold text-right text-slate-800 text-2xl"
              to={`/${data.username}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              Visit Profile: / {data.username}
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-10 mt-10">
            <div className="flex-1 ">
              <Outlet />
            </div>
            <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
              <p className="text-4xl text-center text-white">{data.username}</p>
              {data.image && (
                <img
                  src={data.image}
                  alt="Profile image"
                  className="mx-auto max-w-[250px]"
                />
              )}
              <p className="text-white text-center text-lg font-black">
                {data.description}
              </p>
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <ul className="mt-20 flex flex-col gap-5">
                  <SortableContext
                    items={enabledLinks}
                    strategy={verticalListSortingStrategy}
                  >
                    {enabledLinks.map((link) => (
                      <DevTreeLink key={link.name} link={link} />
                    ))}
                  </SortableContext>
                </ul>
              </DndContext>
            </div>
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </>
  );
};

export default DevTree;
