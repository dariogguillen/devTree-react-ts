import Header from "../components/Header";
import SearchForm from "../components/SearchForm";

const HomeView = () => {
  return (
    <>
      <Header />
      <main className="bg-gray-100 py-10 min-h-screen lg:bg-[url('/bg.svg')] bg-no-repeat bg-top-right lg:bg-size-[50%]">
        <div className="max-w-5xl mx-auto mt-10">
          <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">
            <h1 className="text-6xl font-black">
              All your <span className="text-cyan-400">Social Networks </span>in
              one place
            </h1>
            <p className="text-slate-800 text-xl">
              Join with other developers and share your Social Networks
            </p>
            <SearchForm />
          </div>
        </div>
      </main>
    </>
  );
};

export default HomeView;
