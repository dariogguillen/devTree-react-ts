import type { SocialNetwork, UserResponse } from "../types";

type UserDataProps = {
  data: UserResponse;
};
export const UserData = ({ data }: UserDataProps) => {
  const links: SocialNetwork[] = JSON.parse(data.links).filter(
    (link: SocialNetwork) => link.enabled,
  );

  return (
    <div className="space-y-6 text-white">
      <p className="text-white text-5xl text-center font-black">
        {data.username}
      </p>
      {data.image && (
        <img src={data.image} className="max-w-[250] mx-auto" alt="profile" />
      )}
      <p className="text-white text-lg text-center font-bold">
        {data.description}
      </p>
      <div className="mt-20 flex flex-col gap-6">
        {links.length ? (
          links.map((link: SocialNetwork) => (
            <a
              className="bg-white text-slate-800 px-5 py-2 flex items-center gap-5 rounded-lg "
              href={link.url}
              target="_blank"
              rel="noreferrer noopener"
              key={link.name}
            >
              <img
                src={`/social/icon_${link.name}.svg`}
                alt="social network"
                className="w-12"
              />
              <p className="capitalize font-bold text-lg">
                Visit my: {link.name}
              </p>
            </a>
          ))
        ) : (
          <p className="text-center ">No links available</p>
        )}
      </div>
    </div>
  );
};
